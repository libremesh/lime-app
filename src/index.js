import { h, render } from 'preact';
import './style';

import 'preact/devtools';

import store from './store';

import { App } from './containers/app';



// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
  require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
  module.hot.accept(App, () => requestAnimationFrame() );
}

render(<App store={store} />, document.body);

