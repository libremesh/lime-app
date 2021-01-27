import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNodeStatusTimer, stopTimer, getNodeStatus } from './rxActions';
import { getNodeData, isLoading } from './rxSelectors';

import { Box } from 'components/box';
import I18n from 'i18n-js';
import { useBoardData, useBatHost } from 'utils/queries';

function stripIface (hostIface) {
	return hostIface.split('_wlan')[0].replace('_','-');
}

const toHHMMSS = (seconds, plus) => {
	let secNum = parseInt(seconds, 10) + plus;
	let days = Math.floor(secNum / 86400);
	let hours = Math.floor(secNum / 3600) % 24;
	let mins = Math.floor(secNum / 60) % 60;
	let secs = secNum % 60;
	const daysText = days ? [days, I18n.t('days', { count: days })].join(' ') : null;
	const hoursText = hours ? [hours, I18n.t('hours', { count: hours })].join(' ') : null;
	const minsText = mins ? [mins, I18n.t('minutes', { count: mins })].join(' ') : null;
	const secsText = secs ? [secs, I18n.t('seconds', { count: secs })].join(' ') : null;
	const allTexts = [daysText, hoursText, minsText, secsText];
	return allTexts.filter(x => x !== null).join(', ');
};

const SystemBox = ({ uptime, firmwareVersion, boardModel }) => {
	const [ count, setCount ] = useState(0);

	useEffect(() => {
		const interval = setInterval(async () => {
			setCount(prevCount => prevCount + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	let actualUptime = '?'
	if (typeof uptime !== 'undefined') {
		actualUptime = toHHMMSS(uptime, count);
	}
	actualUptime = toHHMMSS(uptime, count);
	return (
		<Box title={I18n.t('System')}>
			<span>
				<b>{I18n.t('Uptime')} </b>{actualUptime} <br />
			</span>
			<span>
				<b>{I18n.t('Device')} </b>{boardModel}<br />
			</span>
			<span style={{whiteSpace: 'nowrap'}}>
				<b>{I18n.t('Firmware')} </b>{firmwareVersion}<br />
			</span>
		</Box>
	);
};

const MostActiveBox = ({ node, changeNode }) => {
	const {data: bathost } = useBatHost(
		node.most_active && node.most_active.station_mac,
		node.most_active && node.most_active.iface,
		{enabled: node.most_active}
	);

	if (node.most_active === undefined) {
		return (<span />)
	}

	return (
		<Box title={I18n.t('Most Active')}>
			<span style={{ float: 'right',fontSize: '2.7em' }}>{node.most_active.signal}</span>
			{ bathost && bathost.hostname ?
				<a style={{ fontSize: '1.4em' }} onClick={() => changeNode(bathost.hostname)}><b>{stripIface(bathost.hostname)}</b></a>
				:
				<span class="withLoadingEllipsis">{I18n.t("Fetching name")}</span>
			}
			<br />
			<b>{I18n.t('Interface')} </b>{node.most_active.iface.split('-')[0]}<br />
			<b>{I18n.t('Traffic')} </b> {Math.round((node.most_active.rx_bytes + node.most_active.tx_bytes)/1024/1024)}MB
			<div style={{ clear: 'both' }} />
		</Box>
	);
};

export const Page = ({ getNodeStatusTimer, getNodeStatus, stopTimer, isLoading, nodeData }) => {
	const { data: boardData, isLoading: loadingBoardData } = useBoardData();

	function loading(option, nodeData) {
		if (!option && !loadingBoardData) {
			return nodeStatus(nodeData);
		}
		return (
			<h4 style={{ textAlign: 'center' }} >
				{I18n.t('Loading node status...')}
			</h4>
		);
	}

	function _changeNode(hostname) {
		window.location.href = `http://${hostname}`;
	}

	function nodeStatus(node){
		if (node.hostname) {
			return (
				<div>

					<MostActiveBox node={node} changeNode={_changeNode} />

					<SystemBox uptime={node.uptime} firmwareVersion={boardData.release.description} boardModel={boardData.model} />

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
