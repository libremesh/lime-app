import { h } from 'preact';
import Router from 'preact-router';

import { Provider } from 'react-redux';
import { store } from '../store';
import { history } from '../store/history';

import { plugins } from '../config';

import { AppContextProvider } from '../utils/app.context';

import { Route, CommunityProtectedRoute, Redirect } from '../utils/routes';

import { Menu } from '../containers/Menu';

import { Header } from './header';
import Alert from './alert';

const Routes = () => (
	<Router history={history}>
		{/* Public pages, don't need to be authenticated */}
		{plugins
			.filter(plugin => !plugin.isCommunityProtected)
			.map(Component =>
				(<Route path={Component.name.toLowerCase()}>
					<Component.page />
				</Route>))
		}
		{/* Protected pages, need to be authenticated */}
		{plugins
			.filter(plugin => plugin.isCommunityProtected)
			.map(Component =>
				(<CommunityProtectedRoute path={Component.name.toLowerCase()}>
					<Component.page />
				</CommunityProtectedRoute>))
		}
		<Redirect path={'/'} to={'rx'} />
	</Router>
);

const App = () => (
	<div id="app">
		<Header Menu={Menu} />
		<div id="content">
			<Routes />
		</div>
		<Alert />
	</div>
);

const AppDefault = () => (
	<AppContextProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContextProvider>
);

export default AppDefault;
