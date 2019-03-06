import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getMetrics, getMetricsAll, getMetricsGateway, changeNode } from './metricsActions';
import { getNodeData, getSettings } from '../../lime-plugin-rx/src/rxSelectors';

import Loading from '../../../src/components/loading';
import MetricsBox from './components/box';
import { Box } from '../../../src/components/box';

import I18n from 'i18n-js';

import colorScale from 'simple-color-scale';

const style = {
	textLoading: {
		textAlign: 'center',
		display: 'block'
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
		textAalign: 'center',
		overflow: 'hidden',
		height: 'auto'
	},
	loadingBox: {
		position: 'fixed',
		marginTop: '30vh',
		zIndex: '5555',
		background: 'rgb(255, 255, 255)',
		width: '200px',
		top: '0px',
		left: 'calc(50% - 100px)',
		borderRadius: '11px',
		padding: '15px',
		boxShadow: '1px 1px 6px rgba(0,0,0,0.5)'
	}
};

class Metrics extends Component {
  
	clickGateway(gateway) {
		return () => {
			this.props.getMetricsGateway(gateway);
		};
	}

	showButton(loading) {
		if (!loading) {
			return !this.isGateway(this.props.meta.selectedHost,this.props.metrics.gateway)
				? (
					<div class="row">
						<br />
						<button class="button green block u-full-width" type="submit" onClick={this.clickGateway(this.props.metrics.gateway)}>
							{I18n.t('Only gateway')}
						</button>
						<button class="button green block u-full-width"  type="submit" onClick={this.props.getMetricsAll}>
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

	showLoading(loading) {
		if (!loading) {
			return;
		}

		const loadingMessages = {
			metrics_status_gateway: I18n.t('metrics_status_gateway'),
			metrics_status_path: I18n.t('metrics_status_path'),
			metrics_status_stations: I18n.t('metrics_status_stations')
		};

		return (
			<div style={style.loadingBox}>
				<Loading />
				<span style={style.textLoading}>{loadingMessages[this.props.metrics.status]}</span>
			</div>
		);
	}

	showInternetStatus(loading,node) {
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

	showError(error){
		const errorMessages = {
			load_last_known_internet_path: I18n.t('load_last_known_internet_path')
		};

		if (error !== null) {
			return (<p style={style.textError}>Error: {errorMessages[error.msg]}</p>);
		}
		return;
	}

	isGateway(hostname, gateway) {
		return (hostname === gateway);
	}
  
	wrapperChangeNode (station) {
		return () => {
			this.props.changeNode(station.hostname.split('_')[0]);
		};
	}

 
	constructor(props) {
		super(props);
		this.wrapperChangeNode = this.wrapperChangeNode.bind(this);
		this.clickGateway = this.clickGateway.bind(this);
	}
  
	componentWillMount() {
		this.props.getMetrics();
		colorScale.setConfig({
			outputStart: 1,
			outputEnd: 100,
			inputStart: 0,
			inputEnd: 30
		});
	}
	render() {
		return (
			<div class="container" style={{ paddingTop: '80px', textAlign: 'center' }}>
				{this.props.metrics.error.map(x => this.showError(x))}
				<div style={style.box}>{I18n.t('From')+' '+this.props.meta.selectedHost}</div>
				{this.props.metrics.metrics.map(station => (
					<MetricsBox settings={this.props.settings} station={station} click={this.wrapperChangeNode(station)} gateway={this.isGateway(station.hostname,this.props.metrics.gateway)} />
				))}
				<div style={style.box}>{I18n.t('To Internet')}</div>
				{this.showInternetStatus(this.props.metrics.loading, this.props.node)}
				{this.showLoading(this.props.metrics.loading)}
				{this.showButton(this.props.metrics.loading)}<br />
			</div>
		);
	}
}


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
	changeNode: bindActionCreators(changeNode,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
