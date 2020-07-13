import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';

import { history } from './history';
import uhttpdService from '../utils/uhttpd.service';

export default (initialState,rootEpics,rootReducers) => {

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const reduxRouterMiddleware = routerMiddleware(history);

	const epicMiddleware = createEpicMiddleware({
		dependencies: { wsAPI: uhttpdService }
	});

	const enhancer = composeEnhancers(
		applyMiddleware(...[reduxRouterMiddleware,epicMiddleware]),
	);

	const store = createStore(rootReducers, initialState, enhancer);

	epicMiddleware.run(rootEpics);

	return store;

};
