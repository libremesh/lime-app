import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNodeStatusTimer, stopTimer, changeNode, getNodeStatus } from './rxActions';
import { getNodeData, isLoading } from './rxSelectors';

import { Box } from '../../../src/components/box';

import I18n from 'i18n-js';

const toHHMMSS = (secs, plus) => {
	let secNum = parseInt(secs, 10) + plus;
	let days    = Math.floor(secNum / 86400) % 24;
	let hours   = Math.floor(secNum / 3600) % 24;
	let minutes = Math.floor(secNum / 60) % 60;
	let seconds = secNum % 60;
	return [days,hours,minutes,seconds]
		.map(v => v < 10 ? '0' + v : v)
		.join(':');
};

const SystemBox = ({ node, update, count }) => {
	if (typeof node.uptime !== 'undefined') {
		update();
		return (
			<Box title={I18n.t('System')}>
				<span>
					<b>{I18n.t('Uptime')} </b>{toHHMMSS(node.uptime, count)}<br />
				</span>
			</Box>
		);
	}
	return (<span />);
};

const MostActiveBox = ({ node, changeNode }) => {
	if (typeof node.most_active !== 'undefined') {
		return (
			<Box title={I18n.t('Most Active')}>
				<span style={{ float: 'right',fontSize: '2.7em' }}>{node.most_active.signal}</span>
				<span style={{ fontSize: '1.4em' }} onClick={changeNode(node)}><b>{node.most_active.station_hostname.split('_wlan')[0].replace('_','-')}</b></span><br />
				<b>{I18n.t('Interface')} </b>{node.most_active.iface.split('-')[0]}<br />
				<b>{I18n.t('Traffic')} </b> {Math.round((node.most_active.rx_bytes + node.most_active.tx_bytes)/1024/1024)}MB
				<div style={{ clear: 'both' }} />
			</Box>
		);
	}
	return (<span />);
};

export class Page extends Component {
  
	loading(option, nodeData){
		if (!option) {
			return this.nodeStatus(nodeData);
		}
		return (
			<h4 style={{ textAlign: 'center' }} >
				{I18n.t('Loading node status...')}
			</h4>
		);
	}


	startCount() {
		if (typeof this.count === 'undefined') {
			this.setState({ plusTime: 0 });
			this.count = setInterval(() => {
				let newTime = this.state.plusTime + 1;
				this.setState({ plusTime: newTime });
			},1000);
		}
	}

	stopCount() {
		clearInterval(this.count);
		this.setState({ plusTime: 0 });
		delete this.count;
	}

	changeNode(node) {
		return () => {
			this.props.changeNode(node.most_active.hostname.split('_')[0]);
		};
	}

	nodeStatus(node){
		if (node.hostname) {
			this.startCount();
			return (
				<div>

					<MostActiveBox node={node} changeNode={this.changeNode} />
					
					<SystemBox node={node} count={this.state.plusTime} update={this.startCount} />

					<Box title={I18n.t('Internet connection')}>
						<span>
							<b> {(node.internet.IPv4.working === true)? (<span style={{ color: 'green' }}>✔</span>): (<span style={{ color: 'red' }}>✘</span>)} IPv4 </b>
							<b> {(node.internet.IPv6.working === true)? (<span style={{ color: 'green' }}>✔</span>): (<span style={{ color: 'red' }}>✘</span>)} IPv6 </b>
							<b> {(node.internet.DNS.working === true)? (<span style={{ color: 'green' }}>✔</span>): (<span style={{ color: 'red' }}>✘</span>)} DNS </b>
						</span>
					</Box>
            
					<Box title={I18n.t('IP Addresses')}>
						{ node.ips.map((ip,key) => (
							<span style={(key === 0)? { fontSize: '1.4em' } :{}}>
								<b>IPv{ip.version} </b> {ip.address}<br />
							</span>)
						)}
					</Box>

				</div>
			);
		}
	}
  
	constructor(props) {
		super(props);
		this.startCount = this.startCount.bind(this);
		this.changeNode = this.changeNode.bind(this);
	}

	componentDidMount() {
		this.props.getNodeStatusTimer();
		this.props.getNodeStatus();
	}

	componentWillUnmount() {
		this.props.stopTimer();
		this.stopCount();
	}

	render() {
		return (
			<div class="container" style={{ paddingTop: '80px' }}>
				{ this.loading(this.props.isLoading, this.props.nodeData,this.props.signal) }
			</div>
		);
	}
}


export const mapStateToProps = (state) => ({
	nodeData: getNodeData(state),
	isLoading: isLoading(state)
});

export const mapDispatchToProps = (dispatch) => ({
	getNodeStatusTimer: bindActionCreators(getNodeStatusTimer,dispatch),
	getNodeStatus: bindActionCreators(getNodeStatus,dispatch),
	stopTimer: bindActionCreators(stopTimer,dispatch),
	changeNode: bindActionCreators(changeNode,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);