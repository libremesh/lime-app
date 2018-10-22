import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
	searchNetworks,
	getStatus,
	setNetwork
	// createNetwork
} from './api';

import {
	FBW_STATUS,
	FBW_STATUS_SUCCESS,
	FBW_STATUS_ERROR,
	FBW_SEARCH_NETWORKS,
	FBW_SEARCH_NETWORKS_SUCCESS,
	FBW_SEARCH_NETWORKS_ERROR,
	FBW_SET_NETWORK,
	FBW_SET_NETWORK_SUCCESS,
	FBW_SET_NETWORK_ERROR
} from './constants';

import { push } from 'preact-router-redux';

import { AUTH_LOGIN_SUCCESS, BANNER_SET, BANNER_HIDE } from '../../lime-plugin-core/src/metaConstants';

const _searchNetworks = ( action$, { getState }, { wsAPI } ) =>
	action$.ofType(...[FBW_SEARCH_NETWORKS])
		.mergeMap((action) => searchNetworks(wsAPI, getState().meta.sid, action.payload.rescan)
		    .map((payload) => ({ type: FBW_SEARCH_NETWORKS_SUCCESS, payload }))
		    .catch((error) => ({ type: FBW_SEARCH_NETWORKS_ERROR })));

const _getStatus = ( action$, { getState }, { wsAPI } ) =>
	action$.ofType(...[AUTH_LOGIN_SUCCESS, FBW_STATUS])
	    .mergeMap((action) => getStatus(wsAPI, getState().meta.sid)
			.map((payload) => ({ type: FBW_STATUS_SUCCESS, payload }))
			.catch((error) => [{ type: FBW_STATUS_ERROR }]));

const _setNetwork = ( action$, { getState }, {  wsAPI } ) =>
	action$.ofType(...[FBW_SET_NETWORK])
		.mergeMap((action) => setNetwork(wsAPI, getState().meta.sid, action.payload)
			.map(payload => ({ type: FBW_SET_NETWORK_SUCCESS, payload }))
			.catch((error) => ({ type: FBW_SET_NETWORK_ERROR })));

const _showBanner = ( action$, { getState }, { wsAPI } ) =>
	action$.ofType(...[FBW_STATUS_SUCCESS])
		.map(action => (action.payload.lock)?
			{ type: BANNER_SET, payload: {
				text: 'Please configure your network',
				onOk: { type: 'GO_FBW' },
				onCancel: { type: BANNER_HIDE }
			} }:
			{ type: '_' }
		);

const _goPage = ( action$ ) =>
	action$.ofType('GO_FBW')
		.mergeMap(() =>
			([
				push('firstbootwizard'),
				{ type: BANNER_HIDE }
			]));

export default { _searchNetworks, _getStatus, _showBanner, _goPage, _setNetwork };