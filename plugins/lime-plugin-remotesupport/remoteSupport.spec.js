import { h } from 'preact';
import { fireEvent, cleanup, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from "utils/test_utils";
import RemoteSupportPage from './src/remoteSupportPage';
import { getSession, openSession, closeSession } from './src/remoteSupportApi';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

jest.mock('./src/remoteSupportApi');

describe('remote support page', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	})

	beforeEach(() => {
		getSession.mockImplementation(async () =>
			({ rw_ssh: 'ssh -p2222 test_rw_token@test_host', ro_ssh: 'ssh -p2222 test_ro_token@test_host'})
		);
		openSession.mockImplementation(async () => null);
		closeSession.mockImplementation(async () => null);
	});

	afterEach(() => {
		cleanup();
		act(() => queryCache.clear());
	});
	
	afterAll(() => {
		jest.useRealTimers();
	})

	it('shows a button to create session when there is no session', async () => {
		getSession.mockImplementation(async () => null);
		render(<RemoteSupportPage />);
		expect(await screen.findByRole('button', {name: /create session/i })).toBeEnabled();
	});

	it('shows rw session token when there is an open session', async () => {
		render(<RemoteSupportPage />);
		expect(await screen.findByText('ssh -p2222 test_rw_token@test_host')).toBeInTheDocument();
	})

	it('shows a button to close session when there is an open session', async () => {
		render(<RemoteSupportPage />);
		expect(await screen.findByRole('button', {name: /close session/i})).toBeEnabled();
	})

	it('shows rw session token after clicking on open session', async() => {
		getSession
			.mockImplementationOnce(async () => null)
			.mockImplementationOnce(async () =>
				({ rw_ssh: 'ssh -p2222 test_rw_token@test_host', ro_ssh: 'ssh -p2222 test_ro_token@test_host'}));
		render(<RemoteSupportPage />)
		const createButton = await screen.findByRole('button', {name: /create session/i });
		fireEvent.click(createButton);
		expect(await screen.findByText('ssh -p2222 test_rw_token@test_host')).toBeInTheDocument();
	});

	it('show an error when open session fails', async() => {
		getSession.mockImplementation(async() => null);
		openSession.mockImplementation(async() => { throw new Error() })
		render(<RemoteSupportPage />)
		const createButton = await screen.findByRole('button', {name: /create session/i });
		fireEvent.click(createButton);
		expect(await screen.findByText(/Cannot connect to the remote support server/i)).toBeVisible();
	});

	it('shows a button to show the console when there is an active session', async() => {
		render(<RemoteSupportPage />);
		expect(await screen.findByRole('button', {name: /show console/i})).toBeEnabled();
	});
});
