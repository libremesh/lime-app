import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'preact-router-redux';

import { history } from './history';


export default (initialState,rootEpics,rootReducers, wsAPI) => {

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const reduxRouterMiddleware = routerMiddleware(history);

	const epicMiddleware = createEpicMiddleware({
		dependencies: { wsAPI }
	});

	const enhancer = composeEnhancers(
		applyMiddleware(...[reduxRouterMiddleware,epicMiddleware]),
	);

	const store = createStore(rootReducers, initialState, enhancer);

	epicMiddleware.run(rootEpics);

	return store;

};
