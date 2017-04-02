import { combineReducers } from 'redux';
import { routerReducer } from 'preact-router-redux';

import { combineEpics } from 'redux-observable';

import createStore from './store/createStore';
import { loadConstants, loadEpics, loadReducers, loadSelectors } from './utils/loader';

import wsAPI from './utils/webSockets.service';

import { plugins } from './config';


//GENERATE REDUCERS
let reducers = loadReducers(plugins);
reducers.routing = routerReducer;
const rootReducers = combineReducers(reducers);

//GENERATE EPICS
const rootEpics =  combineEpics(...loadEpics(plugins));

//CREATE STORE
const store = createStore({},rootEpics,rootReducers,wsAPI);

// Init websocket
store.dispatch({ type: 'meta/CONECTION_START', payload: 'ws://thisnode.info/websocket/'});

export default store;