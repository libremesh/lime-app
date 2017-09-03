export const getNotes = (api, sid) => api.call(sid, 'get_notes', { })
	.map(x => {
		if (typeof x.notes === 'undefined') {
			throw { error: true };
		}
		return x;
	});

export const setNotes = (api, sid, notes) => api.call(sid, 'set_notes', notes);