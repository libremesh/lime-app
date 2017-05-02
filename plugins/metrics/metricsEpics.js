import { getPath, getGateway, getMetrics, getAllMetrics, getLastKnownPath } from './metricsApi';
import {
  LOAD_GATEWAY,
  LOAD_GATEWAY_SUCCESS,
  LOAD_GATEWAY_ERROR,
  LOAD_GATEWAY_NOT_FOUND,
  LOAD_PATH,
  LOAD_PATH_SUCCESS,
  LOAD_PATH_ERROR,
  LOAD_PATH_NOT_FOUND,
  LOAD_METRICS,
  LOAD_METRICS_SUCCESS,
  LOAD_METRICS_ERROR
} from './metricsConstants';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/concatAll';


/*
 * Roadmap:
 *   -> Load Gateway (Display)
 *      -> Get path to Gatewat (Display)
 *         -> Get info from every hop (Display)
*/


const loadGateway = ( action$, store, { wsAPI }) =>
  action$.ofType(LOAD_METRICS)
    .mergeMap(()=> getGateway(wsAPI,store.getState().meta.sid,))
    .map(payload => {
      if (!payload.error) {
        return {type:LOAD_GATEWAY_SUCCESS, payload};
      }
      return {type:LOAD_GATEWAY_NOT_FOUND, payload};
    })
    .catch([({type:LOAD_GATEWAY_ERROR})]);

const loadPath = ( action$, store, { wsAPI }) =>
  action$.ofType(LOAD_GATEWAY_SUCCESS)
      .mergeMap((action)=> getPath(wsAPI,store.getState().meta.sid,{target:action.payload.gateway}))
      .map(payload => {
        if (!payload.error) {
          return {type:LOAD_PATH_SUCCESS, payload};
        }
        return {type:LOAD_PATH_NOT_FOUND, payload};
      })
      .catch([({type:LOAD_PATH_ERROR})]);

const loadLastPath = ( action$, store, { wsAPI }) =>
  action$.ofType(LOAD_GATEWAY_NOT_FOUND)
      .mergeMap((action)=> getLastKnownPath(wsAPI,store.getState().meta.sid,{target:action.payload.gateway}))
      .map(payload => {
        if (!payload.error) {
          return {type:LOAD_PATH_SUCCESS, payload};
        }
        return {type:LOAD_PATH_NOT_FOUND, payload};
      })
      .catch([({type:LOAD_PATH_ERROR})]);

const loadMetrics = ( action$, store, { wsAPI }) =>
    action$.ofType(LOAD_PATH_SUCCESS)
      .map(action => action.payload)
      .concatMap(paths => paths.map((path)=>getMetrics(wsAPI,store.getState().meta.sid,{target:path})))
      .concatAll()
      .map(payload => ({type:LOAD_METRICS_SUCCESS, payload }));
      
export default { loadGateway, loadPath, loadMetrics, loadLastPath };