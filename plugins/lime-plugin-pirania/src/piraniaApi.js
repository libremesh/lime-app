import api from 'utils/uhttpd.service';

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