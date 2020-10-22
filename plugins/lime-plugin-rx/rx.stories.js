/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { object, boolean } from '@storybook/addon-knobs';

import { Page } from '../lime-plugin-rx/src/rxPage';

const nodeData =  {
	internet: {
	  DNS: {
			working: true
	  },
	  IPv6: {
			working: false
	  },
	  status: 'ok',
	  IPv4: {
			working: true
	  }
	},
	ips: [
	  {
			version: '4',
			address: '10.5.0.36/21'
	  },
	  {
			version: '6',
			address: '2801:1e8:2::7288:d100/64'
	  },
	  {
			version: '6',
			address: 'fe80::6670:2ff:fed1:8872/64'
	  }
	],
	hostname: 'ql-anaymarcos',
	status: 'ok',
	uptime: '93055.80\n',
	most_active: {
	  rx_bytes: 82509781,
	  station_mac: 'A8:40:41:1C:84:05',
	  station_hostname: 'ql_graciela_wlan2_adhoc',
	  tx_bytes: 12806307,
	  iface: 'wlan1-adhoc',
	  attributes: {
			inactive: 20,
			signal: '-63',
			channel: 136
	  },
	  link_type: 'wifi',
	  signal: '-62'
	}
};

const actions = {
	getNodeStatusTimer: action('getNodeStatusTimer'),
	getNodeStatus: action('getNodeStatus'),
	stopTimer: action('stopTimer'),
	changeNode: action('changeNode')
};

export default {
	title: 'Containers/Home Screen (Rx)',
	component: Page
};

export const withData = () => (
	<Page
		nodeData={object('Node data', nodeData)}
		isLoading={boolean('Is loading', false)}
		{...actions}
	/>
);

export const loadingNodeData = () => (
	<Page
		nodeData={object('Node data', nodeData)}
		isLoading={boolean('Is loading', true)}
		{...actions}
	/>
);

const newVersionAvailable = {
	version: 'LibreRouter 1.5'
}


export const newVersionIsAvailable = () => (
	<Page
		nodeData={object('Node data', nodeData)}
		isLoading={boolean('Is loading', false)}
		{...actions}
	/>
)
newVersionIsAvailable.args = {
	queries: [
		[['eupgrade', 'is_new_version_available'], newVersionAvailable]
	]
};

export const needToConfirmUpgrade = () => (
	<Page
		nodeData={object('Node data', {...nodeData, uptime: '60\n'})}
		isLoading={boolean('Is loading', false)}
		{...actions}
	/>
)
needToConfirmUpgrade.args = {
	queries: [
		[['lime-utils', 'get_upgrade_info'], {
			suCounter: 300
		}]
	]
}
