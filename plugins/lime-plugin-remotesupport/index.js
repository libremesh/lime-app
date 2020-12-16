import {h} from 'preact';
import I18n from 'i18n-js';
import RemoteSupportPage from './src/remoteSupportPage';

export default {
	name: 'Remote Support',
	page: RemoteSupportPage,
	menu: () => <a href={'#/remotesupport'}>{I18n.t('Remote Support')}</a>,
	isCommunityProtected: true,
	additionalRoutes: [
	]
}

