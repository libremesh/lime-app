import {h} from 'preact';
import { Trans } from '@lingui/macro';
import RemoteSupportPage from './src/remoteSupportPage';
import ConsoleView from './src/consoleView';

export default {
	name: 'remotesupport',
	page: RemoteSupportPage,
	menu: () => <a href={'#/remotesupport'}><Trans>Remote Support</Trans></a>,
	isCommunityProtected: true,
	additionalProtectedRoutes: [
		['console', ConsoleView]
	]
}

