/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs/react';

import { Metrics } from './src/metricsPage';
import Box from './src/components/box';
import { AppContext } from 'utils/app.context';

const metricState = {
	metrics: [
		{
			host: {
				ip: '10.5.0.99',
				hostname: 'ql-graciela'
			},
			loading: true,
			error: false
		},
		{
			host: {
				ip: '10.5.0.98',
				hostname: 'ql-graciela-bbone'
			},
			loading: true,
			error: false
		},
		{
			host: {
				ip: '10.5.0.3',
				hostname: 'ql-czuk-bbone'
			},
			loading: true,
			error: false
		},
		{
			host: {
				ip: '10.5.40.2',
				hostname: 'lapraviana'
			},
			loading: true,
			error: false
		}
	],
	error: [],
	loading: false,
	status: 'metrics_status_stations',
	gateway: '16:cc:20:ff:fe:ad:ae:c8 lapraviana si-vale lpl-ravelocasa'
};

const nodeHostname = text('nodeHostname', 'ql-anaymarcos');
const communitySettings = object('communitySettings', {
	bad_signal: '-82',
	acceptable_loss: '20',
	bad_bandwidth: '1',
	good_signal: '-65',
	good_bandwidth: '5'
});

const nodeState = {
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
	uptime: '29771.08\n',
	most_active: {
		rx_bytes: 2045796703,
		station_mac: 'A8:40:41:1C:84:05',
		station_hostname: 'ql_graciela_wlan2_adhoc',
		tx_bytes: 1418572114,
		iface: 'wlan1-adhoc',
		attributes: {
			inactive: 20,
			signal: '-61',
			channel: 136
		},
		link_type: 'wifi',
		signal: '-61'
	}
};

const addMetrics = (metricState) => ({
	...metricState,
	metrics: metricState.metrics.map((station, key) => ({
		...station,
		loading: key === metricState.metrics.length - 1,
		status: 'ok',
		bandwidth: '10' - key*3,
		loss: key * 2
	})),
	loading: true
});

const actions = {
	getMetrics: action('getMetrics'),
	getMetricsGateway: action('getMetricsGateway'),
	getMetricsAll: action('getMetricsAll'),
	getInternetStatus: action('getInternetStatus,'),
	getNodeMetrics: action('getNodeMetrics')
};

const metricsInProcess = addMetrics(metricState);

export default {
	title: 'Containers|Metrics',
	component: Metrics,
	decorators: [withKnobs]
};

export const fullPath = () => (
	<AppContext.Provider value={{ nodeHostname, communitySettings }}>
		<Metrics
			metrics={object('Metrics state', metricState)}
			node={object('Node status', nodeState)}
			{...actions}
		/>
	</AppContext.Provider>
);

export const runningMetrics = () => (
	<AppContext.Provider value={{ nodeHostname, communitySettings }}>
		<Metrics
			metrics={object('Metrics state', metricsInProcess)}
			node={object('Node status', nodeState)}
			{...actions}
		/>
	</AppContext.Provider>
);

export const metricsBox = () => (
	<Box
		station={metricsInProcess.metrics[1]}
		settings={communitySettings}
		loading={false}
		click={action('box click')}
		gateway={false}
	/>
);

export const metricsBoxLoading = () => (
	<Box
		station={object('Station data', metricsInProcess.metrics[1])}
		settings={communitySettings}
		loading={boolean('Is loading', true)}
		click={action('box click')}
		gateway={false}
	/>
);
