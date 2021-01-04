import { h } from 'preact';

import AlignPage from './src/alignPage';
import { render } from 'utils/test_utils';
import { screen, fireEvent, act, cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom';
import queryCache from 'utils/queryCache';

import { getMeshIfaces, getAssocList } from './src/alignApi';
import { getBatHost } from 'utils/api';

jest.mock('./src/alignApi');
jest.mock('utils/api');

jest.mock('./src/speech.js', () => ({
	speech: jest.fn()
}));

async function mockAssocList(iface) {
	if (iface === 'wlan1-mesh') {
		return Promise.resolve([
			{ mac: "52:00:00:ab:cd:a0", signal: -75, inactive: 20},
			{ mac: "52:00:00:ab:cd:a1", signal: -73, inactive: 30}
		])
	}
	if (iface === 'wlan2-mesh') {
		return Promise.resolve([
			{ mac: "52:00:00:ab:cd:a2", signal: -63, inactive: 10},
			{ mac: "52:00:00:ab:cd:a3", signal: -65, inactive: 20}
		])
	}
}


async function mockBatHost(mac) {
	const mac2bathost = {
		"52:00:00:ab:cd:a0": {hostname: "mc-rocio", iface: "wlan1-mesh"},
		"52:00:00:ab:cd:a1": {hostname: "mc-martinez", iface: "wlan1-mesh"},
		"52:00:00:ab:cd:a2": {hostname: "mc-mile", iface: "wlan1-mesh"},
		"52:00:00:ab:cd:a3": {hostname: "mc-tanque", iface: "wlan1-mesh"}
	}
	return mac2bathost[mac];
}

async function findNeighbors() {
	let neighs = await screen.findAllByText(/mc-.*/);
	return neighs.map(n => n.textContent);
}

function flushPromises() {
	return new Promise(resolve => setImmediate(resolve));
}
describe('align page', () => {

	beforeAll(() => {
		jest.useFakeTimers();
	})

	afterAll(() => {
		jest.useRealTimers();
	})

	beforeEach(() => {
		getMeshIfaces.mockImplementation(async () => ['wlan1-mesh', 'wlan2-mesh']);
		getAssocList.mockClear().mockImplementation(mockAssocList);
		getBatHost.mockImplementation(mockBatHost);
	})

	afterEach(() => {
		cleanup();
		act(() => queryCache.clear());
	});

	it('shows one tab for each mesh iface with its radio name', async () => {
		render(<AlignPage />);
		expect(await screen.findByRole('tab', {name: /radio 1/i})).toBeInTheDocument();
		expect(await screen.findByRole('tab', {name: /radio 2/i})).toBeInTheDocument();
	})

	it('shows a message when there are not neighbors in one radio', async () => {
		getAssocList.mockImplementation(async () => []);
		render(<AlignPage />);
		expect(await screen.findByText(
			/This radio is not associated with other nodes/i)).toBeInTheDocument();
		const radio2 = await screen.findByRole('tab', {name: /radio 2/i});
		fireEvent.click(radio2);
		expect(await screen.findByText(
			/This radio is not associated with other nodes/i)).toBeInTheDocument();
	})

	it('shows the list of neighbors with hostname and signal for each radio', async() => {
		render(<AlignPage />);
		const radio1 = await screen.findByRole('tab', {name: /radio 1/i});
		fireEvent.click(radio1);
		expect(await screen.findByText('mc-rocio')).toBeInTheDocument();
		expect(await screen.findByText('-75')).toBeInTheDocument();
		expect(await screen.findByText('mc-martinez')).toBeInTheDocument();
		expect(await screen.findByText('-73')).toBeInTheDocument();
		const radio2 = await screen.findByRole('tab', {name: /radio 2/i});
		fireEvent.click(radio2);
		expect(await screen.findByText('mc-mile')).toBeInTheDocument();
		expect(await screen.findByText('-63')).toBeInTheDocument();
		expect(await screen.findByText('mc-tanque')).toBeInTheDocument();
		expect(await screen.findByText('-65')).toBeInTheDocument();
	})

	it('orders the neighbors by signal strength but avoid jumpy reordering', async() => {
		getAssocList
			.mockImplementationOnce(async () => [
				{ mac: "52:00:00:ab:cd:a0", signal: -63, inactive: 0 }, // mc-rocio
				{ mac: "52:00:00:ab:cd:a1", signal: -72, inactive: 0 }, // mc-martinez
				{ mac: "52:00:00:ab:cd:a2", signal: -73, inactive: 0 }  // mc-tanque
			])
			.mockImplementationOnce(async () => [
				{ mac: "52:00:00:ab:cd:a0", signal: -63, inactive: 0 },
				{ mac: "52:00:00:ab:cd:a1", signal: -74, inactive: 0 },
				{ mac: "52:00:00:ab:cd:a2", signal: -73, inactive: 0 }
			])
			.mockImplementationOnce(async () => [
				{ mac: "52:00:00:ab:cd:a0", signal: -63, inactive: 0 },
				{ mac: "52:00:00:ab:cd:a1", signal: -79, inactive: 0 },
				{ mac: "52:00:00:ab:cd:a2", signal: -73, inactive: 0 }
			])
		render(<AlignPage />);
		expect(await findNeighbors()).toEqual(['mc-rocio', 'mc-martinez', 'mc-mile']);
		expect(getAssocList).toBeCalledTimes(1);
		act(() => {
			jest.advanceTimersByTime(2 * 1000)
		})
		await flushPromises();
		expect(getAssocList).toBeCalledTimes(2);
		expect(await findNeighbors()).toEqual(['mc-rocio', 'mc-martinez', 'mc-mile']);
		act(() => {
			jest.advanceTimersByTime(2 * 1000)
		})
		await flushPromises();
		expect(getAssocList).toBeCalledTimes(3);
		expect(await findNeighbors()).toEqual(['mc-rocio', 'mc-mile', 'mc-martinez']);
	})

	it('shows nodes with big inactive time as not associated anymore', async() => {
		getAssocList
			.mockImplementationOnce(async () => [
				{ mac: "52:00:00:ab:cd:a0", signal: -63, inactive: 4000 }, // mc-rocio lost
				{ mac: "52:00:00:ab:cd:a1", signal: -72, inactive: 0 },
				{ mac: "52:00:00:ab:cd:a2", signal: -73, inactive: 0 }
			])
		render(<AlignPage />);
		expect(await findNeighbors()).toEqual(['mc-martinez', 'mc-mile', 'mc-rocio']);
		expect(await screen.findByText(/not associated/i)).toBeInTheDocument();
		expect(await screen.findByText(/last packet: 4 seconds ago/i)).toBeInTheDocument();
	})
})
