import {
	GET_NODE_STATUS,
	GET_NODE_STATUS_ERROR,
	GET_NODE_STATUS_SUCCESS,
	TIMER_START,
	TIMER_STOP,
	INTERVAL_GET,
	GET_SIGNAL,
	GET_SIGNAL_SUCCESS,
	GET_TRAFFIC,
	GET_TRAFFIC_SUCCESS,
	GET_INTERNET_STATUS,
	GET_INTERNET_STATUS_SUCCESS

} from './rxConstants';

import {
	getNodeStauts,
	getStationSignal,
	getStationTraffic,
	getInternetStatus
} from './rxApi';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

export const nodeStatus = ( action$, store, { wsAPI } ) =>
	action$.ofType(GET_NODE_STATUS)
		.mergeMap(() => getNodeStauts(wsAPI, store.value.meta.sid))
		.map( payload => ({ type: GET_NODE_STATUS_SUCCESS, payload }))
		.catch(([{ type: GET_NODE_STATUS_ERROR }]));

  
const runTimer = ( action$, store ) =>
	action$.ofType(...[TIMER_START])
		.mergeMap(() => Observable.interval(store.value.rx.interval)
			.takeUntil(action$.ofType(TIMER_STOP))
			.map(() => ({ type: INTERVAL_GET })));

const getSignal = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[GET_SIGNAL,INTERVAL_GET])
		.switchMap(() => getStationSignal(wsAPI, state$.value.meta.sid, state$.value.rx.data.most_active))
		.map( signal => ({ type: GET_SIGNAL_SUCCESS, payload: signal }));

const getTraffic = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[GET_TRAFFIC,INTERVAL_GET])
		.switchMap(() => getStationTraffic(wsAPI, state$.value.meta.sid, state$.value.rx.data.most_active))
		.map( signal => ({ type: GET_TRAFFIC_SUCCESS, payload: signal }));

const getInternet = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[GET_NODE_STATUS_SUCCESS, GET_INTERNET_STATUS])
		.switchMap(() => getInternetStatus(wsAPI, state$.value.meta.sid))
		.map( status => ({ type: GET_INTERNET_STATUS_SUCCESS, payload: status }));


export default {
	nodeStatus, runTimer, getSignal, getTraffic, getInternet
};