/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Metrics } from './src/metricsPage';
import Box from './src/components/box';
import { frameDecorator } from '../../.storybook/frameDecorator';
import { object } from '@storybook/addon-knobs';

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

const metaState = {
	title: 'LimeApp',
	sid: '0f08f63219cd7cf4bc9d275da851e2ce',
	status: 'ready',
	url: '/',
	conection: true,
	ws: 'http://thisnode.info/ubus',
	interval: 15000,
	stations: [
		'lapraviana',
		'lpl-ravelocasa',
		'paravachasca-tres',
		'ql-ale',
		'ql-anaymarcos',
		'ql-anaymarcos',
		'ql-angelina',
		'ql-bety',
		'ql-cesarylucia',
		'ql-coqui',
		'ql-czuk',
		'ql-czuk-bbone',
		'ql-espacioabierto',
		'ql-esteban',
		'ql-gioiajesinico',
		'ql-graciela',
		'ql-graciela-bbone',
		'ql-guilleolsina',
		'ql-guillermina',
		'ql-irene',
		'ql-lauraymario',
		'ql-male',
		'ql-margayorlando',
		'ql-nicojesigioia',
		'ql-oncelotes',
		'ql-quinteros',
		'ql-silviak',
		'ql-vale',
		'ql-yani',
		'si-andrea',
		'si-bel-mar',
		'si-cantor',
		'si-claudio',
		'si-frigo-bbone',
		'si-frigorifico',
		'si-giordano',
		'si-manu',
		'si-marcelo',
		'si-mario',
		'si-monica',
		'si-nestor',
		'si-pablo',
		'si-radio',
		'si-sonia',
		'si-soniam',
		'si-tato',
		'si-vale'
	],
	base: 'ql-anaymarcos',
	home: '/rx',
	selectedHost: 'ql-anaymarcos',
	settings: {
		bad_signal: '-82',
		acceptable_loss: '20',
		bad_bandwidth: '1',
		good_signal: '-65',
		good_bandwidth: '5'
	},
	banner: false,
	menuHidden: false
};

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

export const actions = {
	getMetrics: action('getMetrics'),
	getMetricsGateway: action('getMetricsGateway'),
	getMetricsAll: action('getMetricsAll'),
	getInternetStatus: action('getInternetStatus,'),
	getNodeMetrics: action('getNodeMetrics')
};

const metricsInProcess = addMetrics(metricState);

storiesOf('Containers|Metrics', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Full path', () => (
		<Metrics
			metrics={object('Metrics state', metricState)}
			meta={object('Meta state', metaState)}
			node={object('Node status', nodeState)}
			settings={object('Metrics settings', metaState.settings)}
			{...actions}
		/>
	))
	.add('Running metrics', () => (
		<Metrics
			metrics={object('Metrics state', metricsInProcess)}
			meta={object('Meta state', metaState)}
			node={object('Node status', nodeState)}
			settings={object('Metrics settings', metaState.settings)}
			{...actions}
		/>
	));

storiesOf('Containers|Metrics', module)
	.add('Metric box', () => (
		<Box
			station={metricsInProcess.metrics[1]}
			settings={metaState.settings}
			loading={false}
			click={action('box click')}
			gateway={false}
		/>
	))
	.add('Metric box loading', () => (
		<Box
			station={object('Station data', metricsInProcess.metrics[1])}
			settings={object('Metrics settings', metaState.settings)}
			loading={boolean('Is loading', true)}
			click={action('box click')}
			gateway={false}
		/>
	));
