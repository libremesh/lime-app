import { getPath, getGateway, getMetrics, getAllMetrics } from './metricsApi';
import {
  LOAD_GATEWAY,
  LOAD_GATEWAY_SUCCESS,
  LOAD_GATEWAY_ERROR,
  LOAD_PATH,
  LOAD_PATH_SUCCESS,
  LOAD_PATH_ERROR,
  LOAD_METRICS,
  LOAD_METRICS_SUCCESS,
  LOAD_METRICS_ERROR
} from './metricsConstants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeAll';



/*
 * Roadmap:
 *   -> Load Gateway (Display)
 *      -> Get path to Gatewat (Display)
 *         -> Get info from every hop (Display)
*/


const loadGateway = ( action$, store, { wsAPI }) =>
  action$.ofType(LOAD_METRICS)
    .mergeMap(()=> getGateway(wsAPI,store.getState().meta.sid,))
    .map(payload => ({type:LOAD_GATEWAY_SUCCESS, payload}));

const loadPath = ( action$, store, { wsAPI }) =>
  action$.ofType(LOAD_GATEWAY_SUCCESS)
    .mergeMap((action)=> getPath(wsAPI,store.getState().meta.sid,{target:action.payload.gateway}))
      .map(payload => ({type:LOAD_PATH_SUCCESS, payload}));

const loadMetrics = ( action$, store, { wsAPI }) =>
  action$.ofType(LOAD_PATH_SUCCESS)
    .map(action => action.payload)
    .concatMap(paths => getAllMetrics(wsAPI,store.getState().meta.sid,{targets:paths}))
    .mergeAll()
    .map(payload =>({type:LOAD_METRICS_SUCCESS, payload }));

export default { loadGateway, loadPath, loadMetrics };