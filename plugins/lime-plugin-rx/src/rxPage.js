import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNodeStatusTimer, stopTimer, getNodeStatus } from './rxActions';
import { getNodeData, isLoading } from './rxSelectors';

import { Box } from '../../../src/components/box';
import I18n from 'i18n-js';
import { useAppContext } from '../../../src/utils/app.context';

function stripIface (hostIface) {
	return hostIface.split('_wlan')[0].replace('_','-');
}

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

const SystemBox = ({ uptime }) => {
	const [ count, setCount ] = useState(0);

	useEffect(() => {
		const interval = setInterval(async () => {
			setCount(prevCount => prevCount + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	if (typeof uptime !== 'undefined') {
		return (
			<Box title={I18n.t('System')}>
				<span>
					<b>{I18n.t('Uptime')} </b>{toHHMMSS(uptime, count)}<br />
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
				<a style={{ fontSize: '1.4em' }} onClick={changeNode}><b>{stripIface(node.most_active.station_hostname)}</b></a><br />
				<b>{I18n.t('Interface')} </b>{node.most_active.iface.split('-')[0]}<br />
				<b>{I18n.t('Traffic')} </b> {Math.round((node.most_active.rx_bytes + node.most_active.tx_bytes)/1024/1024)}MB
				<div style={{ clear: 'both' }} />
			</Box>
		);
	}
	return (<span />);
};

export const Page = ({ getNodeStatusTimer, getNodeStatus, stopTimer, isLoading, nodeData }) => {
	const { changeNode } = useAppContext();

	function loading(option, nodeData) {
		if (!option) {
			return nodeStatus(nodeData);
		}
		return (
			<h4 style={{ textAlign: 'center' }} >
				{I18n.t('Loading node status...')}
			</h4>
		);
	}

	function _changeNode() {
		changeNode(stripIface(nodeData.most_active.station_hostname));
	}

	function nodeStatus(node){
		if (node.hostname) {
			return (
				<div>

					<MostActiveBox node={node} changeNode={_changeNode} />
					
					<SystemBox uptime={node.uptime} />

					<Box title={I18n.t('Internet connection')}>
						<span>
							<b> {(node.internet.IPv4.working === true)? (<span style={{ color: '#38927f' }}>✔</span>): (<span style={{ color: '#b11' }}>✘</span>)} IPv4 </b>
							<b> {(node.internet.IPv6.working === true)? (<span style={{ color: '#38927f' }}>✔</span>): (<span style={{ color: '#b11' }}>✘</span>)} IPv6 </b>
							<b> {(node.internet.DNS.working === true)? (<span style={{ color: '#38927f' }}>✔</span>): (<span style={{ color: '#b11' }}>✘</span>)} DNS </b>
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

	useEffect(() => {
		getNodeStatusTimer();
		getNodeStatus();
		return stopTimer;
	},[]);

	return (
		<div className="container container-padded" >
			{loading(isLoading, nodeData)}
		</div>
	);
};

export const mapStateToProps = (state) => ({
	nodeData: getNodeData(state),
	isLoading: isLoading(state)
});

export const mapDispatchToProps = (dispatch) => ({
	getNodeStatusTimer: bindActionCreators(getNodeStatusTimer,dispatch),
	getNodeStatus: bindActionCreators(getNodeStatus,dispatch),
	stopTimer: bindActionCreators(stopTimer,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
