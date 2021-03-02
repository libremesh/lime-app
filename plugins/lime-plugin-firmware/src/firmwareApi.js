const FW_PATH = {
	'.sh': '/tmp/upgrade.sh',
	'.bin': '/tmp/firmware.bin'
};

import path from 'path';
import api from 'utils/uhttpd.service';

export function getUpgradeInfo() {
	return api.call('lime-utils', 'get_upgrade_info', {}).toPromise()
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res({
					...response,
					suCounter: Number(response.safe_upgrade_confirm_remaining_s)
				});
			}
			else {
				rej(response.message);
			}
		}));
}

export function uploadFile(file) {
	return new Promise((res, rej) => {
		const request = new XMLHttpRequest();
		const formData = new FormData();
		const extname = path.extname(file.name);
		const destPath = FW_PATH[extname] || path.resolve('/tmp/', file.name);
		formData.append("sessionid", api.sid());
		formData.append("filename", destPath);
		formData.append("filedata", file)
	
		request.addEventListener('loadend', () => {
			res(destPath);
		});
	
		request.addEventListener('error', (error) => {
			rej(error)
		});

		request.open('POST', '/cgi-bin/cgi-upload');
		request.send(formData);
	})
}

export function upgradeFirmware(filepath) {
	return api.call('lime-utils-admin', 'firmware_upgrade',
		{
			fw_path: filepath,
			metadata: { upgrade_timestamp: (Date.now() / 1000).toFixed(1) } // in seconds;
		})
		.toPromise()
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res(true);
			}
			else {
				rej(response.message);
			}
		}));
}

export function upgradeConfirm() {
	return api.call('lime-utils-admin', 'firmware_confirm', {})
		.toPromise()
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res(true);
			}
			else {
				rej(false);
			}
		}))
}

export function upgradeRevert() {
	return api.call('system', 'reboot', {}).toPromise().then(() => true);
}

export function getNewVersion() {
	return api.call("eupgrade", "is_new_version_available", {}).toPromise()
		.catch(error => {
			if (error.code === -32000) {
				return Promise.resolve(null)
			}
			throw error;
		})
}

export function getDownloadStatus() {
	return api.call("eupgrade", "download_status", {}).toPromise();
}

export function downloadRelease() {
	return api.call('eupgrade', 'start_download', {}).toPromise();
}
