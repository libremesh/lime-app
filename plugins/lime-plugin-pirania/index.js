import {h} from 'preact';
import I18n from 'i18n-js';
import PiraniaPage from './src/piraniaPage';

export default {
	name: 'Pirania',
	page: PiraniaPage,
	menu: () => <a href={'#/pirania'}>{I18n.t('Pirania')}</a>,
	isCommunityProtected: true,
	additionalRoutes: [
	]
}


