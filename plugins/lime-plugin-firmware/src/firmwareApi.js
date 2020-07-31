const FW_PATH = '/tmp/firmware.bin';

export async function upgradeConfirmIsAvailable(api) {
	return api.call('lime-utils-admin', 'is_upgrade_confirm_supported', {})
		.toPromise()
		.then(res => res.supported);
}

export function uploadFile(api, file) {
	return new Promise((res, rej) => {
		const request = new XMLHttpRequest();
		const formData = new FormData();
	
		formData.append("sessionid", api.sid);
		formData.append("filename", FW_PATH);
		formData.append("filedata", file)
	
		request.addEventListener('load', () => {
			res(request.responseText);
		});
	
		request.addEventListener('error', (error) => {
			rej(error)
		});
	
		request.open('POST', '/cgi-bin/cgi-upload');
		request.send(formData);
	})
}

export function validateFirmware(api) {
	return api.call('lime-utils-admin', 'firmware_verify', {fw_path: FW_PATH})
		.toPromise()
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res(true)
			}
			else {
				rej(response.message);
			}
		}));
}

export function upgradeFirmware(api, preserveConfig) {
	return api.call('lime-utils-admin', 'firmware_upgrade',
		{fw_path: FW_PATH, preserve_config: preserveConfig})
		.toPromise()
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res(response.upgrade_id);
			}
			else {
				rej(response.message);
			}
		}));
}

export default {
	upgradeConfirmIsAvailable,
	uploadFile,
	validateFirmware,
	upgradeFirmware
};
