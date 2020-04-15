import Meta from '../plugins/lime-plugin-core';
import Align from '../plugins/lime-plugin-align';
import Locate from '../plugins/lime-plugin-locate';
import Metrics from '../plugins/lime-plugin-metrics';
import Notes from '../plugins/lime-plugin-notes';
import Rx from '../plugins/lime-plugin-rx';
import Admin from '../plugins/lime-plugin-admin';
import Fbw from '../plugins/lime-plugin-fbw';

// REGISTER PLUGINS
export const plugins = [
	Rx,
	Align,
	Locate,
	Metrics,
	Notes,
	Admin,
	Meta,
	Fbw,  // fbw does not have menu item
];
