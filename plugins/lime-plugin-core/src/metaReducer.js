import {
	CONECTION_SUCCESS,
	CONECTION_ERROR,
	CONECTION_START,
	CONECTION_CHANGE_URL,
	CONECTION_LOAD_NEIGHBORS_SUCCESS,
	CONECTION_LOAD_HOSTNAME_SUCCESS,
	CONECTION_CHANGE_CURRENT_BASE,
	AUTH_LOGIN_SUCCESS,
	COMMUNITY_SETTINGS_LOAD_SUCCESS
} from './metaConstants';

const defaultSettings = {
	bad_signal: '-82',
	acceptable_loss: '20',
	bad_bandwidth: '1',
	good_signal: '-65',
	good_bandwidth: '5'
};

export const initialState = {
	title: 'LimeApp',
	sid: '00000000000000000000000000000000',
	status: 'start',
	alert: undefined,
	url: '/',
	conection: false,
	ws: '',
	interval: 1500,
	stations: [],
	base: '',
	home: '/rx',
	selectedHost: '',
	settings: defaultSettings
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CONECTION_START:
			return Object.assign({}, state, { conection: false, ws: payload, sid: '00000000000000000000000000000000' });
		case CONECTION_CHANGE_URL:
			return Object.assign({}, state, { conection: false, ws: payload, sid: '00000000000000000000000000000000' });
		case CONECTION_SUCCESS:
			return Object.assign({}, state, payload, { error: undefined });
		case CONECTION_ERROR:
			return Object.assign({}, state, { conection: false, error: 'ubusapi-not-found' });
		case AUTH_LOGIN_SUCCESS:
			return Object.assign({}, state, { sid: payload });
		case CONECTION_LOAD_HOSTNAME_SUCCESS:
			if (state.base === ''){
				return Object.assign({}, state, { base: payload.hostname, selectedHost: payload.hostname });
			}
			return Object.assign({}, state, { selectedHost: payload.hostname });
		case CONECTION_CHANGE_CURRENT_BASE:
			return Object.assign({}, state, { selectedHost: '' });
		case CONECTION_LOAD_NEIGHBORS_SUCCESS:
			return Object.assign({}, state, { stations: payload.concat([state.selectedHost]).sort(),status: 'ready' });
		case COMMUNITY_SETTINGS_LOAD_SUCCESS:
			return Object.assign({}, state, { settings: Object.assign({},defaultSettings, payload) });
		case 'NOTIFICATION':
			return Object.assign({}, state, { alert: payload.msg });
		case 'NOTIFICATION_HIDE':
			return Object.assign({}, state, { alert: undefined });
		default:
			return state;
	}
};
