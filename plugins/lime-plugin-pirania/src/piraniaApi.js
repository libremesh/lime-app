import api from 'utils/uhttpd.service';
import Compressor from 'compressorjs';

export const getPortalConfig = () =>
    api.call('pirania', 'get_portal_config', {});

export const setPortalConfig = (config) =>
    api.call('pirania', 'set_portal_config', { ...config, with_vouchers: true });

export const getPortalContent = () =>
    api.call('pirania-app', 'read_content', {});

export const setPortalContent = (content) =>
    api.call('pirania-app', 'write_content', content);

export const createCompression = (file) =>
    new Promise(res => {
        new Compressor(file, {
            quality: 0.6,
            maxHeight: 150,
            maxWidth: 150,
            success: (result) => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    res(reader.result);
                }
                reader.readAsDataURL(result);
            }
        });
    });

export function listVouchers() {
	return api.call('pirania', 'list_vouchers', {})
	.then(response => {
		console.log(response)
			return response
	})
	.catch(error => {
		if (error.code === -32000) {
			return Promise.resolve(null)
		}
		throw error;
	})
}
