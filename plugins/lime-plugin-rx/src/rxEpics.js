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

import { interval, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, takeUntil, mergeMap, catchError, switchMap } from 'rxjs/operators';

export const nodeStatus = (action$, store, { wsAPI }) =>
	action$.pipe(
		ofType(GET_NODE_STATUS),
		mergeMap(() => from(getNodeStauts(wsAPI, store.value.meta.sid))),
		map(payload => ({ type: GET_NODE_STATUS_SUCCESS, payload })),
		catchError(([{ type: GET_NODE_STATUS_ERROR }]))
	);

const runTimer = (action$, store) =>
	action$.pipe(
		ofType(...[TIMER_START]),
		mergeMap(() => interval(store.value.rx.interval).pipe(
			takeUntil(action$.pipe(ofType(TIMER_STOP))),
			map(() => ({ type: INTERVAL_GET }))
		))
	);

const getSignal = (action$, state$, { wsAPI }) =>
	action$.pipe(
		ofType(...[GET_SIGNAL, INTERVAL_GET]),
		switchMap(() => from(getStationSignal(wsAPI, state$.value.meta.sid, state$.value.rx.data.most_active))),
		map(signal => ({ type: GET_SIGNAL_SUCCESS, payload: signal }))
	);

const getTraffic = (action$, state$, { wsAPI }) =>
	action$.pipe(
		ofType(...[GET_TRAFFIC, INTERVAL_GET]),
		switchMap(() => from(getStationTraffic(wsAPI, state$.value.meta.sid, state$.value.rx.data.most_active))),
		map(signal => ({ type: GET_TRAFFIC_SUCCESS, payload: signal }))
	);

const getInternet = (action$, state$, { wsAPI }) =>
	action$.pipe(
		ofType(...[GET_NODE_STATUS_SUCCESS, GET_INTERNET_STATUS, INTERVAL_GET]),
		switchMap(() => from(getInternetStatus(wsAPI, state$.value.meta.sid))),
		map(status => ({ type: GET_INTERNET_STATUS_SUCCESS, payload: status }))
	);

export default {
	nodeStatus, runTimer, getSignal, getTraffic, getInternet
};
