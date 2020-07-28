import {
	IFACE_CHANGE,
	STATION_SET,
	IFACES_LOAD,
	SIGNAL_GET
} from './alignConstants';

export const changeInterface = (iface) => ({
	type: IFACE_CHANGE,
	payload: {
		iface
	}
});

export const changeStation = (station) => ({
	type: STATION_SET,
	payload: station
});

export const startAlign = () => ({
	type: IFACES_LOAD
});

export const getSignal = () => ({
	type: SIGNAL_GET
});
