/*eslint camelcase: 0 */

export const getSid = (state) => state.admin.sid;
export const authStatus = (state) => state.admin.auth;
export const loading = (state) => state.admin.loading;
export const wireless = (state) => {
	if (state.admin.configs && state.admin.configs.values) {
		const {
			distance_5ghz,
			distance_2ghz,
			ap_ssid,
			channel_2ghz,
			channel_5ghz,
			adhoc_ssid,
			ieee80211s_mesh_id,
			country
		} = state.admin.configs.values;
		return {
			distance_5ghz,
			distance_2ghz,
			ap_ssid,
			channel_2ghz,
			channel_5ghz,
			mesh_id: adhoc_ssid || ieee80211s_mesh_id,
			country: country || 'US'
		};
	} return {};
};
export const channels = state => state.admin.configs ?
	Object.keys(state.admin.configs.channels).map(i => ({
		type: i,
		channel: state.admin.configs.channels[i]
	}))
	: [];