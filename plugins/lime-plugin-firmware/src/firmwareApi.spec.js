import xhrMock from 'xhr-mock';
import { of } from 'rxjs';

import { upgradeConfirmIsAvailable, uploadFile, validateFirmware, upgradeFirmware,
	upgradeConfirm, upgradeRevert } from './firmwareApi';

const FW_PATH = '/tmp/firmware.bin';

describe('upgradeConfirmIsAvailable', () => {
	it('calls the expected endpoint', async () => {
		const uhttpService = {
			call: jest.fn(() => of({}))
		};
		await upgradeConfirmIsAvailable(uhttpService);
		expect(uhttpService.call).toBeCalledWith('lime-utils-admin', 'is_upgrade_confirm_supported', {});
	})

	it('resolves to true when it is available', async () => {
		const uhttpService = {
			call: jest.fn(() => of({status: 'ok', supported: true}))
		};
		const isAvailable = await upgradeConfirmIsAvailable(uhttpService);
		expect(isAvailable).toBeTrue();
	});

	it('resolves to false when it is not', async () => {
		const uhttpService = {
			call: jest.fn(() => of({status: 'ok', supported: false}))
		};
		const isAvailable = await upgradeConfirmIsAvailable(uhttpService);
		expect(isAvailable).toBeFalse();
	});
});

describe('uploadFile', () => {

	beforeEach(() => xhrMock.setup());

	afterEach(() => xhrMock.teardown());

	it('sends expected request to cgi-upload endpoint', async () => {
		const uhttpService = {
			sid: '4261b19d65fac6be2552e10d3a351b5c'
		};
		const file = new File(['(⌐□_□)'], 'test.bin');
		xhrMock.post('/cgi-bin/cgi-upload', (req, res) => {
			const body = req.body();
			expect(body.get('sessionid')).toEqual(uhttpService.sid);
			expect(body.get('filename')).toEqual('/tmp/firmware.bin');
			expect(body.get('filedata')).toEqual(file);
			return res.status(200).body({})
		});
		await uploadFile(uhttpService, file);
	});

	it('resolves to cgi-upload response when the upload finished correctly', async () => {
		const mockResponse = {
			size: 5374131,
			checksum: "ef2949e0070830d49e3930a00f9d1794",
			sha256sum: "3cf8244acc06dd0d852bb2348e0da4f610dda6f0d3eed5807d4fe12570465a24"
		};
		const uhttpService = {
			sid: '4261b19d65fac6be2552e10d3a351b5c'
		};
		const file = new File(['(⌐□_□)'], 'test.bin');
		
		xhrMock.post('/cgi-bin/cgi-upload',
			(_req, res) => res.status(200).body(JSON.stringify(mockResponse)));

		const response = await uploadFile(uhttpService, file);
		expect(JSON.parse(response)).toEqual(mockResponse);
	});
});

describe('validateFirmware', () => {
	it('calls the expected endpoint with the expected parameters', async () => {
		const uhttpService = {
			call: jest.fn(() => of({}))
		};
		validateFirmware(uhttpService);
		expect(uhttpService.call).toBeCalledWith('lime-utils-admin', 'firmware_verify', {fw_path: FW_PATH});
	});

	it('resolves to true when it is valid', async () => {
		const uhttpService = {
			call: jest.fn(() => of({status: 'ok'}))
		};
		const isValid = await validateFirmware(uhttpService);
		expect(isValid).toBeTrue();
	});

	it('rejects with backend error message when it is not valid', async () => {
		const backendMessage = 'Invalid firmware';
		const uhttpService = {
			call: jest.fn(() => of({status: 'error', message: backendMessage}))
		};
		expect.assertions(1);
		return expect(validateFirmware(uhttpService)).rejects.toEqual(backendMessage);
	});
});


describe('upgradeFirmware', () => {
	it('sends the appropiate request to preserve config', () => {
		const uhttpService = {
			call: jest.fn(() => of({}))
		};
		upgradeFirmware(uhttpService, true);
		const timestamp = (Date.now() / 1000).toFixed(1);
		expect(uhttpService.call).toBeCalledWith('lime-utils-admin', 'firmware_upgrade',
			{fw_path: FW_PATH, preserve_config: true, metadata: {upgrade_timestamp: timestamp}});
	});

	it('sends the appropiate request to not to preserve config', () => {
		const uhttpService = {
			call: jest.fn(() => of({}))
		};
		upgradeFirmware(uhttpService, false);
		const timestamp = (Date.now() / 1000).toFixed(1);
		expect(uhttpService.call).toBeCalledWith('lime-utils-admin', 'firmware_upgrade',
			{fw_path: FW_PATH, preserve_config: false, metadata: {upgrade_timestamp: timestamp}});
	});

	it('resolves to true when upgrade is successfull', async () => {
		const upgradeId = 'random_id';
		const uhttpService = {
			call: jest.fn(() => of({status: 'ok', upgrade_id: upgradeId}))
		};
		const res = await upgradeFirmware(uhttpService, false);
		expect(res).toBe(true);
	})

	it('rejects with backend error message when upgrade fails', async () => {
		const backendMessage = 'Firmware file not found';
		const uhttpService = {
			call: jest.fn(() => of({status: 'error', message: backendMessage}))
		};
		expect.assertions(1);
		return expect(upgradeFirmware(uhttpService, false)).rejects.toEqual(backendMessage)
	});
});


describe('upgradeConfirm', () => {
	it('sends the appropiate request', () => {
		const uhttpService = {
			call: jest.fn(() => of({}))
		};
		upgradeConfirm(uhttpService);
		expect(uhttpService.call).toBeCalledWith('lime-utils-admin', 'firmware_confirm', {});
	})

	it('resolves to true on status ok', async () => {
		const uhttpService = {
			call: jest.fn(() => of({status: 'ok'}))
		};
		const res = await upgradeConfirm(uhttpService);
		expect(res).toBe(true);
	})

	it('rejects to false on status error', () => {
		const uhttpService = {
			call: jest.fn(() => of({status: 'error'}))
		};
		expect.assertions(1);
		return expect(upgradeConfirm(uhttpService)).rejects.toEqual(false);
	})
})

describe('upgradeRevert', () => {
	it('sends the appropiate request', () => {
		const uhttpService = {
			call: jest.fn(() => of(null))
		};
		upgradeRevert(uhttpService);
		expect(uhttpService.call).toBeCalledWith('system', 'reboot', {});
	})

	it('resolves to true on success', async () => {
		const uhttpService = {
			call: jest.fn(() => of(null))
		};
		const res = await upgradeRevert(uhttpService);
		expect(res).toBe(true);
	})
})
