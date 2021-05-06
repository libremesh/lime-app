import xhrMock from 'xhr-mock';
import api from 'utils/uhttpd.service';
jest.mock('utils/uhttpd.service')

import {
	getUpgradeInfo, uploadFile
} from './firmwareApi';

describe('upgradeInfo', () => {
	it('resolves to expected object value', async () => {
		api.call.mockImplementation(async () => (
			{
				status: 'ok',
				is_upgrade_confirm_supported: true,
				safe_upgrade_confirm_remaining_s: '-1'
			}));
		let data = await getUpgradeInfo();
		expect(data.suCounter).toEqual(-1);
		expect(data.is_upgrade_confirm_supported).toBeTrue();
		api.call.mockImplementation(async () => (
			{
				status: 'ok',
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
