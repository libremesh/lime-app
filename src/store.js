import createStore from './store/createStore';

import { updateLocation } from './store/actions/ActionCreators';
import { getUrl } from './store/selectors/meta';

const store = createStore(window.__STATE__);

//Listen change location on browser
window.addEventListener('popstate', (e) => {
  store.dispatch(updateLocation(window.location.pathname + window.location.search));
});

//Change locatin on state change
store.subscribe(() => {
  const url = getUrl(store.getState());
  if (window.location.pathname + window.location.search !== url) {
    window.history.pushState({}, '', url);
  }
});

// Init location
store.dispatch(updateLocation(window.location.pathname + window.location.search));

// Init websocket
store.dispatch({ type: 'ws/CONECTION_START', payload: 'ws://10.13.207.235/websocket/'});

export default store;