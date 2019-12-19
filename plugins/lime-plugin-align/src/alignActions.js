import {
	IFACE_CHANGE,
	STATION_SET,
	IFACES_LOAD,
	SIGNAL_GET
} from './alignConstants';
import { store } from '../../../src/store';

export const changeInterface = (iface) => {
	if (iface === store.getState().align.currentReading.iface) {
		return { type: 'no_iface' };
	}
	return {
		type: IFACE_CHANGE,
		payload: {
			iface
		}
	};
};

export const changeStation = (mac) => {
	if (mac === store.getState().align.currentReading.mac) {
		return { type: 'no_change' };
	}
	return {
		type: STATION_SET,
		payload: store.getState().align.stations.filter(x => x.mac === mac)[0]
	};
};

export const startAlign = () => ({
	type: IFACES_LOAD
});

export const getSignal = () => ({
	type: SIGNAL_GET
});
