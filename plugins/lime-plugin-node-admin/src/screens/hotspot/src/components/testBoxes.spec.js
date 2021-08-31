import { h } from 'preact';
import { screen, cleanup, act, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import { ConnectionToThePhone, ConnectionToTheInternet } from './testBoxes';
import { getStatus } from '../hotspotApi';
import { checkInternet } from 'utils/api';

jest.mock('../hotspotApi');
jest.mock('utils/api');

describe('ConnectionToThePhone TestBox', () => {
    beforeEach(() => {
        getStatus.mockImplementation(async () => ({ enabled: true, connected: false }));
    });
    
    afterEach(() => {
        getStatus.mockClear();
        cleanup();
        act(() => queryCache.clear());
    });

    it('has title id hotspot-phone-test', async () => {
        render(<ConnectionToThePhone />);
        expect(screen.getByTestId('hotspot-phone-test')).toBeInTheDocument();
    });

    it('shows title', async () => {
        render(<ConnectionToThePhone />);
        expect(await screen.findByText('Connection to the cellphone')).toBeInTheDocument();
    });
    
    it('shows connected and signal when the node is connected to the cellphone', async () => {
        getStatus.mockImplementation(async () => ({ enabled:true, connected: true, signal: -47 }));
        render(<ConnectionToThePhone />);
        expect(await screen.findByText('Connected')).toBeInTheDocument();
        expect(await screen.findByText('-47')).toBeInTheDocument();
        expect(await screen.findByText('dBm')).toBeInTheDocument();
    });

    it('shows not connected when the node is not connected to the cellphone', async () => {
        render(<ConnectionToThePhone />);
        expect(await screen.findByText('Not Connected')).toBeInTheDocument();
    });

    it('shows loading while fetching', async () => {
        render(<ConnectionToThePhone />);
        expect(await screen.getByLabelText('loading')).toBeInTheDocument();
    });

    it('refreshes on click', async () => {
        render(<ConnectionToThePhone />);
        expect(await screen.findByText('Not Connected')).toBeInTheDocument();
        getStatus.mockImplementation(async() => ({ enabled: true, connected: true}));
        const elem = screen.getByTestId('hotspot-phone-test');
        fireEvent.click(elem);
        expect(await screen.findByLabelText('loading')).toBeInTheDocument();
        expect(await screen.findByText('Connected')).toBeInTheDocument();
    });
});


describe('ConnectionToTheInternet TestBox', () => {
    beforeEach(() => {
        checkInternet.mockImplementation(async () => ({ connected: false }));
    });
    
    afterEach(() => {
        checkInternet.mockClear();
        cleanup();
        act(() => queryCache.clear());
    });

    it('has title id hotspot-internet-test', async () => {
        render(<ConnectionToTheInternet />);
        expect(screen.getByTestId('hotspot-internet-test')).toBeInTheDocument();
    });

    it('shows title', async () => {
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText('Connection to the internet')).toBeInTheDocument();
    });
    
    it('shows connected when the node is connected to the cellphone', async () => {
        checkInternet.mockImplementation(async () => ({ connected: true }));
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText('Connected')).toBeInTheDocument();
    });

    it('shows not connected when the node is not conencted to the cellphone', async () => {
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText('Not Connected')).toBeInTheDocument();
    });

    it('shows loading while fetching', async () => {
        render(<ConnectionToTheInternet />);
        expect(await screen.getByLabelText('loading')).toBeInTheDocument();
    });

    it('refreshes on click', async () => {
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText('Not Connected')).toBeInTheDocument();
        checkInternet.mockImplementation(async() => ({connected: true}));
        const elem = screen.getByTestId('hotspot-internet-test');
        fireEvent.click(elem);
        expect(await screen.findByLabelText('loading')).toBeInTheDocument();
        expect(await screen.findByText('Connected')).toBeInTheDocument();
    });
});
