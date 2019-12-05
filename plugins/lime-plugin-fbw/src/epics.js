import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import I18n from 'i18n-js';

import {
	searchNetworks,
	getStatus,
	setNetwork,
	createNetwork
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
	FBW_SET_NETWORK_ERROR,
	FBW_CREATE_NETWORK,
	FBW_CREATE_NETWORK_SUCCESS,
	FBW_CREATE_NETWORK_ERROR
} from './constants';

import { push } from 'react-router-redux';

import { AUTH_LOGIN_SUCCESS, BANNER_SET, BANNER_HIDE } from '../../lime-plugin-core/src/metaConstants';

const _searchNetworks = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[FBW_SEARCH_NETWORKS])
		.mergeMap((action) => searchNetworks(wsAPI, state$.value.meta.sid, action.payload.rescan)
		    .map((payload) => ({ type: FBW_SEARCH_NETWORKS_SUCCESS, payload }))
		    .catch((error) => ({ type: FBW_SEARCH_NETWORKS_ERROR })));

const _getStatus = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[AUTH_LOGIN_SUCCESS, FBW_STATUS])
	    .mergeMap((action) => getStatus(wsAPI, state$.value.meta.sid)
			.map((payload) => ({ type: FBW_STATUS_SUCCESS, payload  }))
			.catch((error) => [{ type: FBW_STATUS_ERROR }]));

const _setNetwork = ( action$, state$, {  wsAPI } ) =>
	action$.ofType(...[FBW_SET_NETWORK])
		.mergeMap((action) => setNetwork(wsAPI, state$.value.meta.sid, action.payload)
			.map(payload => ({ type: FBW_SET_NETWORK_SUCCESS, payload }))
			.catch((error) => ({ type: FBW_SET_NETWORK_ERROR })));

const _showBanner = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[FBW_STATUS_SUCCESS])
		.map(action => (action.payload.lock && state$.value.firstbootwizard.status === null)?
			{ type: BANNER_SET, payload: {
				title: I18n.t('Please configure your network'),
				description: I18n.t(`Your router has not yet been configured, 
					you can use our wizard to incorporate it into an existing network or create a new one.
					If you ignore this message it will continue to work with the default configuration.`),
				onOk: { type: 'GO_FBW' },
				onCancel: { type: BANNER_HIDE }
			} }: { type: '_' }
		);

const _createNetwork = (action$, state$, { wsAPI }) =>
	action$.ofType(FBW_CREATE_NETWORK)
		.mergeMap(({ payload }) => createNetwork(wsAPI, state$.value.meta.sid, payload)
			.map(payload => ({ type: FBW_CREATE_NETWORK_SUCCESS }))
			.catch(payload => ({ type: FBW_CREATE_NETWORK_ERROR })));

const _goPage = ( action$ ) =>
	action$.ofType('GO_FBW')
		.mergeMap(() =>
			([
				push('firstbootwizard'),
				{ type: BANNER_HIDE }
			]));

export default { _searchNetworks, _getStatus, _showBanner, _goPage, _setNetwork, _createNetwork };