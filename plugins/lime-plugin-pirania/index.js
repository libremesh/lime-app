import {h} from 'preact';
import I18n from 'i18n-js';
import PiraniaPage from './src/piraniaPage';
import { WellcomeScreenEditor } from './src/screens/wellcomeScreenEditor';

export default {
	name: 'Access vouchers',
	page: PiraniaPage,
	menu: () => <a href={'#/access'}>{I18n.t('Access Vouchers')}</a>,
	isCommunityProtected: true,
	additionalProtectedRoutes: [
		['access/wellcomescreen', WellcomeScreenEditor]
	]
}
