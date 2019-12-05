import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import './style';
import 'skeleton-less/less/skeleton';

import 'preact/devtools';

import store, { initStore } from './store';

import App from './containers/app';

import { history } from './store/history';

import './i18nline-glue';

initStore();

// in development, set up HMR:
if (module.hot) {
	module.hot.accept(App, () => requestAnimationFrame() );
}

render(
	<Provider store={store}>
		<App history={history} />
	</Provider>, document.body);