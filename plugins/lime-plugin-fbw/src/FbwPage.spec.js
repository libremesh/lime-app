import { h } from "preact";
import FbwPage from './FbwPage';
import { fireEvent, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render, flushPromises } from 'utils/test_utils';
import { AppContextProvider } from 'utils/app.context';
import { createNetwork } from './FbwApi';
import { enableFetchMocks } from 'jest-fetch-mock';

jest.mock('./FbwApi');
enableFetchMocks()

const advanceToChecking = async () => {
    fireEvent.click(
        await screen.findByRole('button', { name: /Create new network/i })
    );
    fireEvent.input(
        await screen.findByLabelText('Choose a name for your network'),
        { target: { value: 'ournetwork' } }
    );
    fireEvent.input(
        await screen.findByLabelText('Choose a shared password for network administration'),
        { target: { value: 'somepassword123' } }
    );
    fireEvent.input(
        await screen.findByLabelText('Re-enter the shared password'),
        { target: { value: 'somepassword123' } }
    );
    fireEvent.input(
        await screen.findByLabelText('Choose a name for this node'),
        { target: { value: 'mynode' } }
    );
    fireEvent.click(
        await screen.findByRole('button', { name: /Create network/i })
    );
    // fastforward 125 seconds of waiting time...
    for (let i = 0; i < 125; i++) {
        jest.advanceTimersByTime(1000);
        await flushPromises();
    }
}

describe('Fbw Page', () => {
    beforeEach(() => {
        fetch.resetMocks();
        createNetwork.mockImplementation(async () => ({ status: 'done' }));
    })

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    })

    it('asks to connect to the wifi network for this node if cannot get hostname', async () => {
        fetch.mockReject();
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
        await advanceToChecking();
        expect(await screen.findByText('You should try to connect to the network ournetwork/mynode'));
    });

    it('asks to connect to the wifi network for this node if getting different hostname ', async () => {
        fetch.mockResponse('anothernode\n');
        render(<AppContextProvider><FbwPage /></AppContextProvider>);
        await advanceToChecking();
        expect(await screen.findByText('You are connected to another node in the network, try connecting to ournetwork/mynode'));
    });
})
