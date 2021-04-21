import Page from './src/networkNodesPage';
import { NetworkNodesMenu } from './src/networkNodesMenu';
import DeleteNodesPage from './src/containers/deleteNodesPage';

export default {
	name: 'NetworkNodes',
	page: Page,
	menu: NetworkNodesMenu,
    menuView: 'community',
	additionalProtectedRoutes: [
		['delete-nodes', DeleteNodesPage]
	]
};
