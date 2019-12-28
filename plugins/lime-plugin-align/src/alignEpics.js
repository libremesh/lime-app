import { getInterfaces, getStations, getIfaceStation, getStationSignal } from './alignApi';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
	IFACES_LOAD,
	IFACES_LOAD_SUCCESS,
	IFACE_SET,
	IFACE_CHANGE,
	STATIONS_LOAD,
	STATIONS_LOAD_SUCCESS,
	STATION_SET,
	SIGNAL_GET,
	SIGNAL_GET_SUCCESS,
	SIGNAL_GET_FAILD
} from './alignConstants';


// LOAD INTERFACES -> Dispatch success and stations loads
const ifaceLoad = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[IFACES_LOAD])
		.mergeMap((action) => getInterfaces(wsAPI, state$.value.meta.sid))
		.mergeMap((payload) => Observable.from([
			({ type: IFACES_LOAD_SUCCESS, payload }),
			({ type: STATIONS_LOAD })
		]));


// LOAD ALL STATIONS -> Dispatch success and Init Align
const allStationsLoad = (action$, state$, { wsAPI }  ) =>
	action$.ofType(STATIONS_LOAD)
		.mergeMap(() => getStations(wsAPI, state$.value.meta.sid, state$.value.align.ifaces))
		.map((payload) => ({ type: STATIONS_LOAD_SUCCESS, payload }))
		.catch(error => ([{
			type: 'NOTIFICATION',
			payload: { msg: 'Not stations in interfaces', error }
		}]));

// CHANGE INTEFACE -> DIspatch get station by interface and select best signal
const ifaceChange = (action$, state$, { wsAPI } ) =>
	action$.ofType(IFACE_CHANGE)
		.mergeMap((action) => getIfaceStation(wsAPI, state$.value.meta.sid, action.payload.iface)
			.map((payload) => ({ type: STATIONS_LOAD_SUCCESS, payload: payload.nodes }))
			.catch(error => ([{
				type: 'NOTIFICATION',
				payload: { msg: 'Not stations in interface', error }
			}])));

// INIT ALIGN -> Select best node, interface and start timer
const initAlign = (action$, state$ ) =>
	action$.ofType(STATIONS_LOAD_SUCCESS)
		.map(action => action.payload)
		.map(payload => {
			//Select most active node as default
			if (typeof state$.value.rx.data.most_active !== 'undefined'){
				if (payload.filter(x => x.mac === state$.value.rx.data.most_active.station_mac).length > 0) {
					return payload.filter(x => x.mac === state$.value.rx.data.most_active.station_mac)[0];
				}
			}
			//Or select best node if not found most active node.
			return payload.sort((x, y) => x.signal + y.signal)[0];
		})
		.mergeMap((res) => Observable.from([
			({ type: STATION_SET, payload: res }),
			({ type: IFACE_SET, payload: res? res.iface: undefined })
		]));

// GET_SIGNAL -> Update current signal and nodes
const getSignal = ( action$, state$, { wsAPI } ) =>
	action$.ofType(SIGNAL_GET)
		.switchMap(() => getStationSignal(wsAPI, state$.value.meta.sid, state$.value.align.currentReading))
		.map( signal => ({ type: SIGNAL_GET_SUCCESS, payload: signal }))
		.catch(e => [{ type: SIGNAL_GET_FAILD }]);

export default { ifaceLoad, allStationsLoad, ifaceChange, initAlign, getSignal };