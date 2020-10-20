import xhrMock from 'xhr-mock';
import { of } from 'rxjs';
import api from 'utils/uhttpd.service';
jest.mock('utils/uhttpd.service')

import { getUpgradeInfo, uploadFile, upgradeFirmware,
	upgradeConfirm, upgradeRevert } from './firmwareApi';

describe('upgradeInfo', () => {
	it('calls the expected endpoint', async () => {
		api.call.mockImplementation(() => of({status: 'ok'}))
		await getUpgradeInfo();
		expect(api.call).toBeCalledWith('lime-utils', 'get_upgrade_info', {});
	})

	it('resolves to expected object value', async () => {
		api.call.mockImplementation(() => of(
			{ status: 'ok',
			  is_upgrade_confirm_supported: true,
			  safe_upgrade_confirm_remaining_s: '-1'
			}));
		let data = await getUpgradeInfo();
		expect(data.suCounter).toEqual(-1);
		expect(data.is_upgrade_confirm_supported).toBeTrue();
		api.call.mockImplementation(() => of(
			{ status: 'ok',
			  is_upgrade_confirm_supported: false,
			  safe_upgrade_confirm_remaining_s: '340'
			}));
		data = await getUpgradeInfo();
		expect(data.suCounter).toEqual(340);
		expect(data.is_upgrade_confirm_supported).toBeFalse();
	});
});

describe('uploadFile', () => {

	beforeEach(() => xhrMock.setup());

	afterEach(() => xhrMock.teardown());

	it.each([
		['mycustomfirmware.bin', '/tmp/firmware.bin'],
		['mysutominstaller.sh', '/tmp/upgrade.sh'],
		['custom.unkonwnextension', '/tmp/custom.unkonwnextension']
	])('sends expected request to cgi-upload endpoint %s %s', async (userFileName, uploadedFilename) => {
		api.sid.mockImplementation(() => '4261b19d65fac6be2552e10d3a351b5c');
		const file = new File(['(⌐□_□)'], userFileName);
		xhrMock.post('/cgi-bin/cgi-upload', (req, res) => {
			const body = req.body();
			expect(body.get('sessionid')).toEqual(api.sid());
			expect(body.get('filename')).toEqual(uploadedFilename);
			expect(body.get('filedata')).toEqual(file);
			return res.status(200).body({})
		});
		await uploadFile(file);
	});

	it.each([
		['mycustomfirmware.bin', '/tmp/firmware.bin'],
		['mysutominstaller.sh', '/tmp/upgrade.sh'],
		['custom.unkonwnextension', '/tmp/custom.unkonwnextension']
	])('resolves to destination path when the upload finished correctly', async (userFileName, uploadedFilename) => {
		const mockResponse = {
			size: 5374131,
			checksum: "ef2949e0070830d49e3930a00f9d1794",
			sha256sum: "3cf8244acc06dd0d852bb2348e0da4f610dda6f0d3eed5807d4fe12570465a24"
		};
		api.sid.mockImplementation(() => '4261b19d65fac6be2552e10d3a351b5c');
		const file = new File(['(⌐□_□)'], userFileName);
		
		xhrMock.post('/cgi-bin/cgi-upload',
			(_req, res) => res.status(200).body(JSON.stringify(mockResponse)));

		const destinationPath = await uploadFile(file);
		expect(destinationPath).toEqual(uploadedFilename);
	});
});

describe('upgradeFirmware', () => {
	beforeEach(() => {
		api.call.mockImplementation(() => of({status: 'ok'}))
	})
	it('sends the appropiate request', () => {
		upgradeFirmware('some_fw_path');
		const timestamp = (Date.now() / 1000).toFixed(1);
		expect(api.call).toBeCalledWith('lime-utils-admin', 'firmware_upgrade',
			{fw_path: 'some_fw_path', metadata: {upgrade_timestamp: timestamp}});
	});

	it('resolves to true when upgrade is successfull', async () => {
		const res = await upgradeFirmware('some_fw_path');
		expect(res).toBe(true);
	})

	it('rejects with backend error message when upgrade fails', async () => {
		const backendMessage = 'Invalid Firmware';
		api.call.mockImplementation(() => of({status: 'error', message: backendMessage}));
		expect.assertions(1);
		await expect(upgradeFirmware('some_fw_path')).rejects.toEqual(backendMessage)
	});
});


describe('upgradeConfirm', () => {
	it('sends the appropiate request', () => {
		api.call.mockImplementation(() => of({status: 'ok'}));
		upgradeConfirm();
		expect(api.call).toBeCalledWith('lime-utils-admin', 'firmware_confirm', {});
	})

	it('resolves to true on status ok', async () => {
		api.call.mockImplementation(() => of({status: 'ok'}));
		const res = await upgradeConfirm();
		expect(res).toBe(true);
	})

	it('rejects to false on status error', async () => {
		api.call.mockImplementation(() => of({status: 'error'}));
		expect.assertions(1);
		await expect(upgradeConfirm()).rejects.toEqual(false);
	})
})

describe('upgradeRevert', () => {
	it('sends the appropiate request', async () => {
		api.call.mockImplementation(() => of({status: 'ok'}));
		await upgradeRevert();
		expect(api.call).toBeCalledWith('system', 'reboot', {});
	})

	it('resolves to true on success', async () => {
		api.call.mockImplementation(() => of({status: 'ok'}));
		const res = await upgradeRevert();
		expect(res).toBe(true);
	})
})
