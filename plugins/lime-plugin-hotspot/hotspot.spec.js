import { h } from 'preact';
import { screen, cleanup, act, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';
import waitForExpect from 'wait-for-expect';
import Hotspot from './src/hotspotPage';
import { enable, disable, getStatus } from './src/hotspotApi';
jest.mock('./src/hotspotApi');
jest.mock('utils/api');

const findConnectCheckbox = async () =>
    screen.findByLabelText('Connect to a Mobile Hotspot');

const findSubmitButton = async () =>
    screen.findByRole('button', { name: /save/i });

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
        getStatus.mockImplementation(async () => ({ enabled: false, connected: false }));
    });

    afterEach(() => {
        disable.mockClear();
        enable.mockClear();
        getStatus.mockClear();
        cleanup();
        act(() => queryCache.clear());
    });

    it('shows config description', async () => {
        render(<Hotspot />);
        expect(await screen.findByText('Share your mobile connection by connecting the node to a mobile hotspost')).toBeInTheDocument();
    });

    it('shows expandable cellphone Instructions', async () => {
        render(<Hotspot />);
        const text = await screen.findByText('Cellphone Instructions');
        expect(text).toBeInTheDocument();
        fireEvent.click(text);
        expect(await screen.findByText('Get an additional cell phone to the one you are currently using that has a mobile data connection')).toBeInTheDocument();
        expect(await screen.findByText('With this second cell phone create an access point or hotspot with this data:')).toBeInTheDocument();
        expect(await screen.findByText('Network Name: internet')).toBeInTheDocument();
        expect(await screen.findByText('Password: internet')).toBeInTheDocument();
        fireEvent.click(text);
        expect(screen.queryByText('Password: internet')).toBeNull();
    });

    it('shows an unchecked checkbox to enable the hotspot client', async () => {
        render(<Hotspot />);
        expect(await findConnectCheckbox()).not.toBeChecked();
    });

    it('calls the endpoint to enable the hotspot client when checked', async () => {
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(enable).toHaveBeenCalled();
        });
    });

    it('show a checked checkbox when enabled', async () => {
        getStatus.mockImplementation(async () => ({ enabled: true, connected: false }));
        render(<Hotspot />);
        expect(await findConnectCheckbox()).toBeChecked();
    });

    it('calls disable endpoint when checkbox is disabled', async () => {
        getStatus.mockImplementation(async () => ({ enabled: true, connected: false }));
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(disable).toHaveBeenCalled();
        });
    });

    it('shows the test box for cellphone connectivity when enabled', async () => {
        getStatus.mockImplementation(async () => ({ enabled: true, connected: false }));
        render(<Hotspot />);
        expect(await screen.findByTestId('hotspot-phone-test')).toBeInTheDocument();
    });

    it('shows the test box for internet connectivity when enabled', async () => {
        getStatus.mockImplementation(async () => ({ enabled: true, connected: false }));
        render(<Hotspot />);
        expect(await screen.findByTestId('hotspot-internet-test')).toBeInTheDocument();
    });
});
