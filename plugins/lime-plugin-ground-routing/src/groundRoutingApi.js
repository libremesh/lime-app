export const getGroundRouting = (api, sid) => api.call(sid, 'lime-ground-routing', 'get_groundrouting', { })
	.map(x => {
		if (typeof x.config === 'undefined') {
			throw { error: true };
		}
		return x;
	});

export const setGroundRouting = (api, sid, config) => api.call(sid, 'lime-ground-routing', 'set_groundrouting', config);