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

import { SafeUpgradeCountdown, UpgradeAvailableBanner } from '../../plugins/lime-plugin-firmware';

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
		{/* Additional plugins routes */}
		{plugins
			.filter(plugin => plugin.additionalRoutes)
			.map(plugin => plugin.additionalRoutes)
			.flat()
			.map(([path, Component]) => {
				return (
					<Route path={path}>
						<Component />
					</Route>
				)
			})
		}
		{/* Additional plugins protected routes */}
		{plugins
			.filter(plugin => plugin.additionalProtectedRoutes)
			.map(plugin => plugin.additionalProtectedRoutes)
			.flat()
			.map(([path, Component]) => {
				return (
					<CommunityProtectedRoute path={path}>
						<Component />
					</CommunityProtectedRoute>
				)
			})
		}
		<Redirect default path={'/'} to={'rx'} />
	</Router>
);

export const SubHeader = () => {
	const { data: session } = useSession();
	const { data: upgradeInfo } = useUpgradeInfo({enabled: session.username});
	const { data: newVersion } = useNewVersion({enabled: session.username});
	const showSuCountdown = upgradeInfo && upgradeInfo.suCounter > 0;
	const showNewFirmwareVersion = !showSuCountdown && newVersion && newVersion.version;

	return (
		<div>
			{showSuCountdown && <SafeUpgradeCountdown counter={upgradeInfo.suCounter} />}
			{showNewFirmwareVersion && <UpgradeAvailableBanner />}
		</div>
	)
}

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
			<SubHeader />
			<div id="content">
				<Routes />
			</div>
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
