import {
	searchNetworks,
	setNetwork,
	createNetwork
} from './api';

import {
	FBW_SEARCH_NETWORKS,
	FBW_SEARCH_NETWORKS_SUCCESS,
	FBW_SEARCH_NETWORKS_ERROR,
	FBW_SET_NETWORK,
	FBW_SET_NETWORK_SUCCESS,
	FBW_SET_NETWORK_ERROR,
	FBW_CREATE_NETWORK,
	FBW_CREATE_NETWORK_SUCCESS,
	FBW_CREATE_NETWORK_ERROR
} from './constants';

import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';


const _searchNetworks = ( action$, _state$, { wsAPI } ) =>
	action$.pipe(
		ofType(...[FBW_SEARCH_NETWORKS]),
		mergeMap((action) => searchNetworks(wsAPI, action.payload.rescan).pipe(
		    map((payload) => ({ type: FBW_SEARCH_NETWORKS_SUCCESS, payload })),
			catchError((error) => ({ type: FBW_SEARCH_NETWORKS_ERROR }))
		))
	);

const _setNetwork = ( action$, _state$, { wsAPI } ) =>
	action$.pipe(
		ofType(...[FBW_SET_NETWORK]),
		mergeMap((action) => setNetwork(wsAPI, action.payload).pipe(
			map(payload => ({ type: FBW_SET_NETWORK_SUCCESS, payload })),
			catchError((error) => ({ type: FBW_SET_NETWORK_ERROR }))
		))
	);

const _createNetwork = (action$, _state$, { wsAPI }) =>
	action$.pipe(
		ofType(FBW_CREATE_NETWORK),
		mergeMap(({ payload }) => createNetwork(wsAPI, payload).pipe(
			map(payload => ({ type: FBW_CREATE_NETWORK_SUCCESS })),
			catchError(payload => ({ type: FBW_CREATE_NETWORK_ERROR }))
		))
	);


export default { _searchNetworks, _setNetwork, _createNetwork };
