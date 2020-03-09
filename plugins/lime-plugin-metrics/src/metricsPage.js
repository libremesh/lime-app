import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getInternetStatus, getMetrics, getMetricsAll, getMetricsGateway, getNodeMetrics } from './metricsActions';
import { getNodeData, getSettings } from '../../lime-plugin-rx/src/rxSelectors';

import MetricsBox from './components/box';
import { Box } from '../../../src/components/box';

import I18n from 'i18n-js';

import colorScale from 'simple-color-scale';

const style = {
	textLoading: {
		textAlign: 'center',
		display: 'block',
		background: '#3bc1a5',
		color: '#fff',
		padding: '5px',
		borderRadius: '4px',
		fontWeight: 'bold'
	},
	textError: {
		textAlign: 'center',
		display: 'block',
		background: '#d55206',
		color: '#fff',
		padding: '5px',
		borderRadius: '4px',
		fontWeight: 'bold'
	},
	box: {
		margin: '3px',
		padding: '10px',
		fontSize: '1.4em',
		background: '#f5f5f5',
		textAlign: 'center',
		overflow: 'hidden',
		height: 'auto'
	}
};

export const Metrics = ({ getNodeMetrics, getMetricsAll, getMetricsGateway, getInternetStatus, meta, metrics, settings, node }) => {
	
	function clickGateway(gateway) {
		return () => {
			getMetricsGateway(gateway);
			getInternetStatus();
		};
	}

	function showButton(loading) {
		if (!loading) {
			return !isGateway(meta.selectedHost, metrics.gateway)
				? (
					<div class="row">
						<br />
						<button class="button green block u-full-width" type="submit" onClick={clickGateway(metrics.gateway)}>
							{I18n.t('Only gateway')}
						</button>
						<button class="button green block u-full-width"  type="submit" onClick={getMetricsAll}>
							{I18n.t('Full path metrics')}
						</button>
					</div>
				)
				: (
					<div class="row">
						<br />
						<p><b>{I18n.t('This node is the gateway')}</b><br />
							{I18n.t('You don\'t go through any paths to get here.')}</p>
					</div>
				);
		}
		return (
			<div />
		);
	}

	function showLoading(loading) {
		if (!loading) {
			return;
		}

		const loadingMessages = {
			metrics_status_gateway: I18n.t('metrics_status_gateway'),
			metrics_status_path: I18n.t('metrics_status_path'),
			metrics_status_stations: I18n.t('metrics_status_stations'),
			load_last_known_internet_path: I18n.t('load_last_known_internet_path')
		};

		return (
			<p style={style.textLoading}>{loadingMessages[metrics.status]}</p>
		);
	}

	function showInternetStatus(loading, node) {
		if (!loading) {
			return (
				<Box title={I18n.t('Internet connection')} style={{ marginTop: '15px' }}>
					<span>
						<b> {(node.internet.IPv4.working === true)? (<span style={{ color: 'green' }}>✔</span>): (<span style={{ color: 'red' }}>✘</span>)} IPv4 </b>
						<b> {(node.internet.IPv6.working === true)? (<span style={{ color: 'green' }}>✔</span>): (<span style={{ color: 'red' }}>✘</span>)} IPv6 </b>
						<b> {(node.internet.DNS.working === true)? (<span style={{ color: 'green' }}>✔</span>): (<span style={{ color: 'red' }}>✘</span>)} DNS </b>
					</span>
				</Box>
			);
		}
		return (
			<div />
		);
	}

	function showError(error){
		const errorMessages = {
			last_known_internet_path: I18n.t('last_known_internet_path')
		};

		if (error !== null) {
			return (<p style={style.textError}>{errorMessages[error]}</p>);
		}
		return;
	}

	function isGateway(hostname, gateway) {
		return (hostname === gateway);
	}
	 
	useEffect(() => {
		getMetricsGateway();
		getInternetStatus();
		colorScale.setConfig({
			outputStart: 1,
			outputEnd: 100,
			inputStart: 0,
			inputEnd: 30
		});
		return () => {};
	},[]);

	return (
		<div class="container" style={{ paddingTop: '80px', textAlign: 'center' }}>
			{metrics.loading? showLoading(metrics.loading) : metrics.error.map(x => showError(x))}
			<div style={style.box}>{I18n.t('From')+' '+meta.selectedHost}</div>
			{metrics.metrics.map((station, key) => (
				<MetricsBox
					settings={settings}
					station={station}
					gateway={isGateway(station.host.hostname,metrics.gateway)}
					loading={metrics.loading && station.loading && (key === 0 || metrics.metrics[key - 1].loading === false)}
					click={getNodeMetrics}
				/>
			))}
			<div style={style.box}>{I18n.t('To Internet')}</div>
			{showInternetStatus(metrics.loading, node)}
			{showButton(metrics.loading)}<br />
		</div>
	);
};


const mapStateToProps = (state) => ({
	metrics: state.metrics,
	meta: state.meta,
	node: getNodeData(state),
	settings: getSettings(state)
});

const mapDispatchToProps = (dispatch) => ({
	getMetrics: bindActionCreators(getMetrics,dispatch),
	getMetricsGateway: bindActionCreators(getMetricsGateway,dispatch),
	getMetricsAll: bindActionCreators(getMetricsAll,dispatch),
	getInternetStatus: bindActionCreators(getInternetStatus, dispatch),
	getNodeMetrics: bindActionCreators(getNodeMetrics, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
