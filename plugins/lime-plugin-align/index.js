import Page from './src/alignPage';
import { AlignMenu } from './src/alignMenu';
import AlignSingle from './src/containers/alignSingle';

export default {
	name: 'Align',
	page: Page,
	menu: AlignMenu,
	store: {
		name: 'align'
	},
	additionalRoutes: [
		['aling-single/:iface/:mac', AlignSingle]
	]
};
