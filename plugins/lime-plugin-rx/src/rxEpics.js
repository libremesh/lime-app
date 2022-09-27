import { ofType } from "redux-observable";
import { from, interval } from "rxjs";
import {
    catchError,
    map,
    mergeMap,
    switchMap,
    takeUntil,
} from "rxjs/operators";

import {
    getInternetStatus,
    getNodeStauts,
    getStationSignal,
    getStationTraffic,
} from "./rxApi";
import {
    GET_INTERNET_STATUS,
    GET_INTERNET_STATUS_SUCCESS,
    GET_NODE_STATUS,
    GET_NODE_STATUS_ERROR,
    GET_NODE_STATUS_SUCCESS,
    GET_SIGNAL,
    GET_SIGNAL_SUCCESS,
    GET_TRAFFIC,
    GET_TRAFFIC_SUCCESS,
    INTERVAL_GET,
    TIMER_START,
    TIMER_STOP,
} from "./rxConstants";

export const nodeStatus = (action$, _store, { wsAPI }) =>
    action$.pipe(
        ofType(GET_NODE_STATUS),
        mergeMap(() => from(getNodeStauts(wsAPI))),
        map((payload) => ({ type: GET_NODE_STATUS_SUCCESS, payload })),
        catchError([{ type: GET_NODE_STATUS_ERROR }])
    );

const runTimer = (action$, store) =>
    action$.pipe(
        ofType(...[TIMER_START]),
        mergeMap(() =>
            interval(store.value.rx.interval).pipe(
                takeUntil(action$.pipe(ofType(TIMER_STOP))),
                map(() => ({ type: INTERVAL_GET }))
            )
        )
    );

const getSignal = (action$, state$, { wsAPI }) =>
    action$.pipe(
        ofType(...[GET_SIGNAL, INTERVAL_GET]),
        switchMap(() =>
            from(getStationSignal(wsAPI, state$.value.rx.data.most_active))
        ),
        map((signal) => ({ type: GET_SIGNAL_SUCCESS, payload: signal }))
    );

const getTraffic = (action$, state$, { wsAPI }) =>
    action$.pipe(
        ofType(...[GET_TRAFFIC, INTERVAL_GET]),
        switchMap(() =>
            from(getStationTraffic(wsAPI, state$.value.rx.data.most_active))
        ),
        map((signal) => ({ type: GET_TRAFFIC_SUCCESS, payload: signal }))
    );

const getInternet = (action$, _state$, { wsAPI }) =>
    action$.pipe(
        ofType(...[GET_NODE_STATUS_SUCCESS, GET_INTERNET_STATUS, INTERVAL_GET]),
        switchMap(() => from(getInternetStatus(wsAPI))),
        map((status) => ({
            type: GET_INTERNET_STATUS_SUCCESS,
            payload: status,
        }))
    );

export default {
    nodeStatus,
    runTimer,
    getSignal,
    getTraffic,
    getInternet,
};
