import { h } from 'preact';
import { screen, cleanup, act, fireEvent, findByLabelText } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render, flushPromises } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import Hotspot from './src/hotspotPage';
import { enable, isConnected, disable } from './src/hotspotApi';
import waitForExpect from 'wait-for-expect';
import { route } from 'preact-router';
jest.mock('./src/hotspotApi');

const findConnectButton = async () =>
    screen.findByRole('button', { name: /connect/i });

describe('hotspot', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        enable.mockImplementation(async () => null);
        disable.mockImplementation(async () => null);
        isConnected.mockImplementation(async () => ({ enabled: false, connected: false }));
    });

    afterEach(() => {
        disable.mockClear();
        enable.mockClear();
        isConnected.mockClear();
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows a guide with instructions to setup the hotspot', async () => {
        render(<Hotspot />);
        expect(await screen.findByText('Connect the node to a mobile hotspot')).toBeInTheDocument();
        expect(await screen.findByText('Get an additional cell phone to the one you are currently using that has a mobile data connection')).toBeInTheDocument();
        expect(await screen.findByText('With this second cell phone create an access point or hotspot with this data:')).toBeInTheDocument();
        expect(await screen.findByText('Network Name: internet')).toBeInTheDocument();
        expect(await screen.findByText('Password: internet')).toBeInTheDocument();
        expect(await screen.findByText('When ready click on "Connect" to connect the node to the mobile hotspot')).toBeInTheDocument();
    });

    it('shows a button to connect to the mobile hotspot', async () => {
        render(<Hotspot />);
        expect(await findConnectButton()).toBeInTheDocument();
    });

    it('calls enable hotspot endpoint on click', async () => {
        render(<Hotspot />);
        const button = await findConnectButton();
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(enable).toHaveBeenCalled();
        });
    });

    it('calls up to 3 times to isConnected to check if it worked otherwise\
        calls disable and shows a retry button', async () => {
        render(<Hotspot />);
        const button = await findConnectButton();
        fireEvent.click(button);
        await flushPromises();
        expect(await screen.findByLabelText('loading')).toBeInTheDocument();
        isConnected.mockClear();
        act(() => {
            jest.advanceTimersByTime(1.5 * 1000)
        });
        await flushPromises();
        expect(isConnected).toHaveBeenCalledTimes(0);
        expect(screen.getByLabelText('loading')).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(3 * 1000)
        })
        await flushPromises();
        expect(isConnected).toHaveBeenCalledTimes(1);
        expect(screen.getByLabelText('loading')).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(3 * 1000)
        })
        await flushPromises();
        expect(isConnected).toHaveBeenCalledTimes(2);
        act(() => {
            jest.advanceTimersByTime(3 * 1000)
        })
        await flushPromises();
        expect(isConnected).toHaveBeenCalledTimes(3);
        expect(disable).toHaveBeenCalled();
        expect(screen.getByText("Can't connect to the mobile hotspot")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
        expect(screen.queryByLabelText('loading')).toBeNull();
    });

    it('shows a connected message and continue button if the node gets connected to the mobile hotspot', async () => {
        render(<Hotspot />);
        const button = await findConnectButton();
        fireEvent.click(button);
        await flushPromises();
        expect(await screen.findByLabelText('loading')).toBeInTheDocument();
        isConnected
            .mockClear()
            .mockImplementationOnce(() => ({ connected: false }))
            .mockImplementationOnce(() => ({ connected: true }));
        act(() => {
            jest.advanceTimersByTime(3.5 * 1000);
        });
        await flushPromises();
        expect(isConnected).toHaveBeenCalledTimes(1);
        expect(screen.getByLabelText('loading')).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(3 * 1000);
        });
        await flushPromises();
        expect(isConnected).toHaveBeenCalledTimes(2);
        expect(screen.getByText('The node is connected to your hotspot')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continue/i })).toBeEnabled();
    });

    it('shows a connected message and continue button if it is \
        already connected', async () => {
        isConnected.mockImplementation(() => ({ connected: true }));
        render(<Hotspot />);
        expect(await screen.findByText('The node is connected to your hotspot')).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /continue/i })).toBeEnabled();
    });

    it('navigates to nextPage when clicking continue', async () => {
        isConnected.mockImplementation(() => ({ connected: true }));
        render(<Hotspot nextPage={'/remotesupport'} />);
        const button = await screen.findByRole('button', { name: /continue/i });
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith('/remotesupport');
        });
    });

    it('navigates to home page by default when clicking continue', async () => {
        isConnected.mockImplementation(() => ({ connected: true }));
        render(<Hotspot />);
        const button = await screen.findByRole('button', { name: /continue/i });
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith('/');
        });
    });
});
