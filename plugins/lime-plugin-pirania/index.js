import {h} from 'preact';
import { Trans } from '@lingui/macro';
import PiraniaPage from './src/piraniaPage';
import { WellcomeScreenEditor } from './src/screens/wellcomeScreenEditor';

export default {
	name: 'Access vouchers',
	page: PiraniaPage,
	menu: () => <a href={'#/access'}><Trans>Access Vouchers</Trans></a>,
	isCommunityProtected: true,
	additionalProtectedRoutes: [
		['access/wellcomescreen', WellcomeScreenEditor]
	]
}
