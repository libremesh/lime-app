import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import api from 'utils/uhttpd.service';

describe('uhttpd.service', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it('resolves to response on successfull response', async () => {
		const result = {
			safe_upgrade_confirm_remaining_s: -1,
			status: "ok",
			is_upgrade_confirm_supported: false
		};
		fetch.mockResponse(JSON.stringify({
			jsonrpc: "2.0",
			id: 6,
			result: [0, result]
		}));
		expect(await api.call('lime-utils', 'get_upgrade_info', {}))
			.toEqual(result);
	});

	it('rejects on ubus response with result code distinct from 0', async () => {
		fetch.mockResponse(JSON.stringify({
			jsonrpc: "2.0",
			id: 6,
			result: [3]
		}));
		return expect(api.call('lime-utils', 'get_upgrade_info', {}))
			.toReject();
	});

	it('rejects on ubus response with error object', async () => {
		fetch.mockResponse(JSON.stringify({
			jsonrpc: "2.0",
			id: 6,
			error: { code: -32002, message: "Access denied"}
		}));
		return expect(api.call('lime-utils-admin', 'firmware_upgrade', {fw_path: '/tmp/firmware'}))
			.toReject();
	});

	it('rejects to message on ubus response with status error', async () => {
		fetch.mockResponse(JSON.stringify({
			jsonrpc: "2.0",
			id: 6,
			result: [0, { status: "error", message: "Invalid Firmware"}]
		}));
		expect.assertions(1);
		try {
			await api.call('lime-utils-admin', 'firmware_upgrade', {fw_path: '/tmp/firmware'});
		}
		catch (e) {
			expect(e).toEqual('Invalid Firmware');
		}
	});
});
