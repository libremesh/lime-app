import Align, { AssocRow } from "./src/alignPage";
import AlignSingle from "./src/containers/alignSingle";

export default {
	title: 'Containers/Align screen'
};

const station = {
	mac: 'A8:40:41:1C:84:05',
	signal: -64,
	inactive: 10
};

export const alignRow = () => (
	<AssocRow station={station} iface={'wlan1-mesh'} />
)
alignRow.args = {
	queries: [
		[['lime-utils', 'get_bathost', station.mac, 'wlan1-mesh'], {hostname: 'ql-graciela', iface: 'wlan1-mesh'}]
	]
}

export const alignRowNotAssociated = () => (
	<AssocRow station={{...station, inactive: 4000}} iface={'wlan1-mesh'} />
)
alignRowNotAssociated.args = {
	queries: [
		[['lime-utils', 'get_bathost', station.mac, 'wlan1-mesh'], {hostname: 'ql-graciela', iface: 'wlan1-mesh'}]
	]
}

export const alignPage = () => <Align />;
alignPage.args = {
	queries: [
		[['lime-utils', 'get_mesh_ifaces'], ['wlan1-mesh', 'wlan2-mesh']],
		[['iwinfo', 'assoclist', 'wlan1-mesh'],
			[{ mac: "52:00:00:ab:cd:a0", signal: -75, inactive: 10},
			 { mac: "52:00:00:ab:cd:a1", signal: -73, inactive: 10}]
		],
		[['iwinfo', 'assoclist', 'wlan2-mesh'],
			[{ mac: "52:00:00:ab:cd:a2", signal: -63, inactive: 10},
			 { mac: "52:00:00:ab:cd:a3", signal: -85, inactive: 10}]
		],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a0', 'wlan1-mesh'], {hostname: 'mc-rocio', iface: 'wlan1-mesh'}],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a1', 'wlan1-mesh'], {hostname: 'mc-martinez', iface: 'wlan1-mesh'}],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a2', 'wlan2-mesh'], {hostname: 'mc-jorge', iface: 'wlan2-mesh'}],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a3', 'wlan2-mesh'], {hostname: 'mc-tanque', iface: 'wlan1-mesh'}]
	]
}

export const noNeighbors = () => <Align />;
noNeighbors.args = {
	queries: [
		[['lime-utils', 'get_mesh_ifaces'], ['wlan1-mesh', 'wlan2-mesh']],
		[['iwinfo', 'assoclist', 'wlan1-mesh'], []],
		[['iwinfo', 'assoclist', 'wlan2-mesh'], []]
	]
}

export const fetchingNeighborName = () => <Align />;
fetchingNeighborName.args = {
	queries: [
		[['lime-utils', 'get_mesh_ifaces'], ['wlan1-mesh', 'wlan2-mesh']],
		[['iwinfo', 'assoclist', 'wlan1-mesh'],
			[{ mac: "52:00:00:ab:cd:a0", signal: -75, inactive: 10},
			 { mac: "52:00:00:ab:cd:a1", signal: -73, inactive: 10}]
		],
		[['iwinfo', 'assoclist', 'wlan2-mesh'], []],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a0', 'wlan1-mesh'], {hostname: 'mc-rocio', iface: 'wlan1-mesh'}]
	]
}

export const alignSingle = () => <AlignSingle iface={'wlan1-mesh'} mac={'52:00:00:ab:cd:a0'} />
alignSingle.args = {
	queries: [
		[['iwinfo', 'assoclist', 'wlan1-mesh'],
			[{ mac: "52:00:00:ab:cd:a0", signal: -75, inactive: 10, associated: true}]
		],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a0', 'wlan1-mesh'], {hostname: 'mc-rocio', iface: 'wlan1-mesh'}]
	]
}

export const alignSingleNoAssociated = () => <AlignSingle iface={'wlan1-mesh'} mac={'52:00:00:ab:cd:a0'} />
alignSingleNoAssociated.args = {
	queries: [
		[['iwinfo', 'assoclist', 'wlan1-mesh'],
			 [{ mac: "52:00:00:ab:cd:a0", signal: -73, inactive: 4000, associated: false}]
		],
		[['lime-utils', 'get_bathost', '52:00:00:ab:cd:a0', 'wlan1-mesh'], {hostname: 'mc-rocio', iface: 'wlan1-mesh'}]
	]
}
