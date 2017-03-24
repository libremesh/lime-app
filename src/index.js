import { h, render } from 'preact';
import './style';

import 'preact/devtools'

import store from './store';

import { App } from './containers/app';

import { WebSocketService } from './utils/webSockets.observable'
import { WebsocketAPI } from './utils/webSockets.service'

// Websockets services
window.wsAPI = new WebsocketAPI(new WebSocketService())
store.dispatch({ type: 'ws/CONECTION_START', payload: 'ws://10.13.207.235/websocket/'})

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	module.hot.accept(App, () => requestAnimationFrame() );
}

render(<App store={store} />, document.body);

