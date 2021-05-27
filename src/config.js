import ChangeNode from '../plugins/lime-plugin-changeNode';
import Align from '../plugins/lime-plugin-align';
import Locate from '../plugins/lime-plugin-locate';
import Metrics from '../plugins/lime-plugin-metrics';
import Notes from '../plugins/lime-plugin-notes';
import Rx from '../plugins/lime-plugin-rx';
import Fbw from '../plugins/lime-plugin-fbw';
import NetworkAdmin from '../plugins/lime-plugin-network-admin';
import Firmware from '../plugins/lime-plugin-firmware';
import RemoteSupport from '../plugins/lime-plugin-remotesupport';

// REGISTER PLUGINS
export const plugins = [
	Rx,
	Align,
	Locate,
	Metrics,
	Notes,
	NetworkAdmin,
	Firmware,
	ChangeNode,
	RemoteSupport,
	Fbw // fbw does not have menu item
];
