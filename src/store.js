import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { combineEpics } from 'redux-observable';

import createStore from './store/createStore';
import { loadEpics, loadReducers } from './utils/loader';

import { UhttpdService } from './utils/uhttpd.service';

import { plugins } from './config';


//GENERATE REDUCERS
let reducers = loadReducers(plugins);
reducers.routing = routerReducer;
const rootReducers = combineReducers(reducers);

//GENERATE EPICS
const rootEpics =  combineEpics(...loadEpics(plugins));
export const api = new UhttpdService()
//CREATE STORE
export const store = createStore({},rootEpics,rootReducers, api);

// Init websocket
export const initStore = () => store.dispatch({
    type: 'meta/CONECTION_START',
    payload: window.location.href.split('/').slice(0, 3).join('/').concat('/ubus')
});

export default store;
