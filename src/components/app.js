import { h } from 'preact';
import Router from 'preact-router';
import { ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { Provider } from 'react-redux';
import { store } from '../store';
import { history } from '../store/history';

import { plugins } from '../config';

import { AppContextProvider } from '../utils/app.context';
import { Route, CommunityProtectedRoute, Redirect } from '../utils/routes';

import { Menu } from '../containers/Menu';

import { Header } from './header';
import Alert from './alert';

import queryCache from 'utils/queryCache';

import { useUpgradeInfo, useNewVersion } from '../../plugins/lime-plugin-firmware/src/firmwareQueries';
import { useSession, useLogin } from 'utils/queries';

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
		<Redirect default path={'/'} to={'rx'} />
	</Router>
);

const App = () => {
	const { data: session } = useSession();
	const [login, {isIdle}] = useLogin();

	if (session.username === null && isIdle) {
		login({username: 'lime-app', password: 'generic'});
		return 'Loading...'
	}

	return (
		<div id="app">
			<ReactQueryDevtools />
			<Header Menu={Menu} />
			{(suCounter > 0) && <SafeUpgradeCountdown counter={suCounter} />}
			<div id="content">
				<Routes />
			</div>
			<Alert />
		</div>
	)
}


const AppDefault = () => (
	<ReactQueryCacheProvider queryCache={queryCache}>
		<AppContextProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</AppContextProvider>
	</ReactQueryCacheProvider>
);

export default AppDefault;
