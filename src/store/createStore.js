import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { createEpicMiddleware } from 'redux-observable'

import { rootEpics }   from './epics/rootEpics'
import { rootReducers} from './reducers/rootReducer'

const epicMiddleware = createEpicMiddleware(rootEpics);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState, fetchMethod) => {
  const enhancer = composeEnhancers(
      applyMiddleware(...[epicMiddleware,thunk.withExtraArgument(fetchMethod)]),
  )
  return createStore(rootReducers, initialState, enhancer)
}
