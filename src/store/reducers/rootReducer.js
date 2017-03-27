import { combineReducers } from 'redux';
import { routerReducer } from 'preact-router-redux';

import meta from './meta';
import align from './align';
import locate from './locate';

export const rootReducers = combineReducers({
  routing: routerReducer,
  meta,
  align,
  locate
});
