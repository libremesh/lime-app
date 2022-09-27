import { ofType } from "redux-observable";
import { from } from "rxjs";
import {
    catchError,
    concatAll,
    concatMap,
    map,
    mergeMap,
} from "rxjs/operators";

import {
    getGateway,
    getLastKnownPath,
    getMetrics,
    getPath,
} from "./metricsApi";
import {
    LOAD_GATEWAY_ERROR,
    LOAD_GATEWAY_NOT_FOUND,
    LOAD_GATEWAY_SUCCESS,
    LOAD_HOST_METRICS,
    LOAD_METRICS,
    LOAD_METRICS_ALL,
    LOAD_METRICS_GATEWAY,
    LOAD_METRICS_GATEWAY_SUCCESS,
    LOAD_METRICS_SUCCESS,
    LOAD_PATH_ERROR,
    LOAD_PATH_NOT_FOUND,
    LOAD_PATH_SUCCESS,
} from "./metricsConstants";

const loadGateway = (action$, _store, { wsAPI }) =>
    action$.pipe(
        ofType(LOAD_METRICS),
        mergeMap(() => getGateway(wsAPI)),
        map((payload) => {
            if (!payload.error) return { type: LOAD_GATEWAY_SUCCESS, payload };
            return { type: LOAD_GATEWAY_NOT_FOUND, payload };
        }),
        catchError(() => [{ type: LOAD_GATEWAY_ERROR }])
    );

const loadPath = (action$, store, { wsAPI }) =>
    action$.pipe(
        ofType(LOAD_GATEWAY_SUCCESS),
        mergeMap(() => getPath(wsAPI, { target: store.value.metrics.gateway })),
        mergeMap((payload) => {
            if (!payload.error)
                return [
                    { type: LOAD_PATH_SUCCESS, payload: payload.path },
                    { type: LOAD_METRICS_GATEWAY },
                ];
            return [{ type: LOAD_PATH_NOT_FOUND, payload }];
        }),
        catchError(() => [{ type: LOAD_PATH_ERROR }])
    );

const loadLastPath = (action$, _store, { wsAPI }) =>
    action$.pipe(
        ofType(LOAD_GATEWAY_NOT_FOUND),
        mergeMap(() => getLastKnownPath(wsAPI, {})),
        mergeMap((payload) => {
            if (!payload.error)
                return [
                    { type: LOAD_PATH_SUCCESS, payload: payload.path },
                    { type: LOAD_METRICS_ALL },
                ];
            return [{ type: LOAD_PATH_NOT_FOUND, payload }];
        }),
        catchError(() => [{ type: LOAD_PATH_ERROR }])
    );

const loadMetrics = (action$, store, { wsAPI }) =>
    action$.pipe(
        ofType(LOAD_METRICS_ALL),
        map(() => store.value.metrics.metrics), // Get array of paths
        map((paths) =>
            from(paths).pipe(
                concatMap((path) => getMetrics(wsAPI, { target: path.host.ip })) // Change array of paths for array of observables
            )
        ),
        concatAll(), // Consume one observable at a time
        map((payload) => ({ type: LOAD_METRICS_SUCCESS, payload })) // Output one result for each observable/promise consumed
    );

const loadGatewayMetrics = (action$, store, { wsAPI }) =>
    action$.pipe(
        ofType(LOAD_METRICS_GATEWAY),
        map((action) => action.payload),
        mergeMap(() => {
            if (
                store.value.metrics.gateway !== store.value.metrics.nodeHostname
            ) {
                return getMetrics(wsAPI, {
                    target: store.value.metrics.gateway,
                }).pipe(
                    map((payload) => ({
                        type: LOAD_METRICS_GATEWAY_SUCCESS,
                        payload,
                    }))
                );
            }
            return [{ type: LOAD_METRICS_GATEWAY_SUCCESS, payload: {} }];
        })
    );

const loadHostMetrics = (action$, _store, { wsAPI }) =>
    action$.pipe(
        ofType(LOAD_HOST_METRICS),
        mergeMap(({ payload }) => getMetrics(wsAPI, { target: payload })),
        map((payload) => ({ type: LOAD_METRICS_SUCCESS, payload }))
    );

export default {
    loadGateway,
    loadPath,
    loadMetrics,
    loadLastPath,
    loadGatewayMetrics,
    loadHostMetrics,
};
