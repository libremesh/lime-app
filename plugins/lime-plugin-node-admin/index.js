import Page from './src/nodeAdminPage';
import Menu from './src/nodeAdminMenu';
import HostnamePage from './src/screens/hostname';
import APPasswordPage from './src/screens/password';
import RoamingAPPage from './src/screens/roamingAP';
import { PortalConfigPage } from 'plugins/lime-plugin-pirania/nodeAdmin/PortalConfigPage';

export default {
	name: 'NodeAdmin',
	page: Page,
	menu: Menu,
	additionalProtectedRoutes: [
		['nodeadmin/hostname', HostnamePage],
		['nodeadmin/wifipassword', APPasswordPage],
		['nodeadmin/roaming-ap', RoamingAPPage],
		['nodeadmin/communityPortal', PortalConfigPage],
	]
};
