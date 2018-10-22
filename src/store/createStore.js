import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'preact-router-redux';

import { history } from './history';


export default (initialState,rootEpics,rootReducers, wsAPI) => {

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const reduxRouterMiddleware = routerMiddleware(history);

	const epicMiddleware = createEpicMiddleware();
	
	epicMiddleware.run(rootEpics, {
		dependencies: { wsAPI }
	});
  
	const enhancer = composeEnhancers(
		applyMiddleware(...[reduxRouterMiddleware,epicMiddleware,thunk.withExtraArgument()]),
	);
  

	const store = createStore(rootReducers, initialState, enhancer);
	return store;

};
