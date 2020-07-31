import {h} from 'preact';
import I18n from 'i18n-js';
import FirmwarePage from './src/firmwarePage';

export default {
	name: 'Firmware',
	page: FirmwarePage,
	menu: () => <a href={'#/firmware'}>{I18n.t('Firmware')}</a>,
	isCommunityProtected: true
}
