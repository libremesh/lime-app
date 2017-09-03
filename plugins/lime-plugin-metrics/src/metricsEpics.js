import { getPath, getGateway, getMetrics, getLastKnownPath } from './metricsApi';
import {
	LOAD_GATEWAY_SUCCESS,
	LOAD_GATEWAY_ERROR,
	LOAD_GATEWAY_NOT_FOUND,
	LOAD_PATH_SUCCESS,
	LOAD_PATH_ERROR,
	LOAD_PATH_NOT_FOUND,
	LOAD_METRICS,
	LOAD_METRICS_SUCCESS,
	LOAD_METRICS_GATEWAY_SUCCESS,
	LOAD_METRICS_ALL,
	LOAD_METRICS_GATEWAY
} from './metricsConstants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeAll';

const loadGateway = ( action$, store, { wsAPI }) =>
	action$.ofType(LOAD_METRICS)
		.mergeMap(() => getGateway(wsAPI,store.getState().meta.sid,))
		.map(payload => {
			if (!payload.error) {
				return { type: LOAD_GATEWAY_SUCCESS, payload };
			}
			return { type: LOAD_GATEWAY_NOT_FOUND, payload };
		})
		.catch([({ type: LOAD_GATEWAY_ERROR })]);

const loadPath = ( action$, store, { wsAPI }) =>
	action$.ofType(LOAD_GATEWAY_SUCCESS)
		.mergeMap((action) => getPath(wsAPI,store.getState().meta.sid,{ target: store.getState().metrics.gateway }))
		.map(payload => {
			if (!payload.error) {
				return { type: LOAD_PATH_SUCCESS, payload };
			}
			return { type: LOAD_PATH_NOT_FOUND, payload };
		})
		.catch([({ type: LOAD_PATH_ERROR })]);

const loadLastPath = ( action$, store, { wsAPI }) =>
	action$.ofType(LOAD_GATEWAY_NOT_FOUND)
		.mergeMap((action) => getLastKnownPath(wsAPI,store.getState().meta.sid,{}))
		.map(payload => {
			if (!payload.error) {
				return { type: LOAD_PATH_SUCCESS, payload };
			}
			return { type: LOAD_PATH_NOT_FOUND, payload };
		})
		.catch([({ type: LOAD_PATH_ERROR })]);

const loadMetrics = ( action$, store, { wsAPI }) =>
	action$.ofType(LOAD_METRICS_ALL)
		.map(action => store.getState().metrics.metrics)
		.concatMap(paths => paths.map((path) => getMetrics(wsAPI,store.getState().meta.sid,{ target: path.hostname })))
		.concatAll()
		.map(payload => ({ type: LOAD_METRICS_SUCCESS, payload }));

/*const loadGatewayPath = ( action$ ) =>
    action$.ofType(LOAD_GATEWAY_SUCCESS)
      .map(action => action.payload)
      .map(payload => ({type:LOAD_PATH_SUCCESS, payload:[payload.gateway]}));
*/
const loadGatewayMetrics = ( action$, store, { wsAPI }) =>
	action$.ofType(...[LOAD_PATH_SUCCESS,LOAD_METRICS_GATEWAY])
		.map(action => action.payload)
		.mergeMap(payload => getMetrics(wsAPI,store.getState().meta.sid,{ target: store.getState().metrics.gateway })
			.map(payload => ({ type: LOAD_METRICS_GATEWAY_SUCCESS, payload })));


export default { loadGateway, loadPath, loadMetrics, loadLastPath, loadGatewayMetrics };