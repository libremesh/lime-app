import RemoteSupportPage from './src/remoteSupportPage';
import Menu from './src/remoteSupportMenu';
import ConsoleView from './src/consoleView';

export default {
	name: 'remotesupport',
	page: RemoteSupportPage,
	menu: Menu,
	isCommunityProtected: true,
	additionalProtectedRoutes: [
		['console', ConsoleView]
	]
}

