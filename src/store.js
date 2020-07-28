import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { combineEpics } from 'redux-observable';

import createStore from './store/createStore';
import { loadEpics, loadReducers } from './utils/loader';

import { plugins } from './config';


//GENERATE REDUCERS
let reducers = loadReducers(plugins);
reducers.routing = routerReducer;
const rootReducers = combineReducers(reducers);

//GENERATE EPICS
const rootEpics =  combineEpics(...loadEpics(plugins));

//CREATE STORE
export const store = createStore({}, rootEpics, rootReducers);
