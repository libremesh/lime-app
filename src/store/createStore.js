import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createEpicMiddleware } from 'redux-observable';

import { rootEpics }   from './epics/rootEpics';
import { rootReducers} from './reducers/rootReducer';

// Websockets services
import { WebSocketService } from '../utils/webSockets.observable';
import { WebsocketAPI } from '../utils/webSockets.service';
const wsAPI = new WebsocketAPI(new WebSocketService());

const epicMiddleware = createEpicMiddleware(rootEpics, {
  dependencies: { wsAPI }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState, fetchMethod) => {
  const enhancer = composeEnhancers(
      applyMiddleware(...[epicMiddleware,thunk.withExtraArgument(fetchMethod)]),
  );
  return createStore(rootReducers, initialState, enhancer);
};
