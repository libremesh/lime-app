import api from 'utils/uhttpd.service';

export const getMeshIfaces = () =>
	api.call('lime-utils', 'get_mesh_ifaces', {}).toPromise()
		.then(res => res.ifaces);

export const getAssocList = (iface) =>
	api.call('iwinfo', 'assoclist', {device: iface}).toPromise()
		.then(res => res.results);
