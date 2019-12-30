import { h } from 'preact';

import colorScale from 'simple-color-scale';

import I18n from 'i18n-js';

import Loading from '../../../../../src/components/loading';

const style = {
	box: {
		margin: '3px',
		padding: '10px',
		background: '#f5f5f5',
		textAlign: 'center',
		transition: 'height 04s ease',
		overflow: 'hidden',
		height: 'auto',
		cursor: 'pointer'
	},
	loading: {
		margin: '3px',
		padding: '10px',
		background: '#f5f5f5',
		textAlign: 'center',
		overflow: 'hidden',
		height: '34px',
		transition: 'height 04s ease'
	},
	line: {
		margin: '0 auto',
		height: '8px',
		backgroundColor: '#ccc'
	},
	gateway: {
		marginButtom: '0px',
		marginTop: '-9px',
		fontSize: '2.4rem',
		lineHeight: '1.35'
	}
};


const Box = ({ station, settings, loading, click, gateway }) => {
	function barStyle(loss) {
		return Object.assign({},style.line,{
			width: ((station.bandwidth*100/settings.good_bandwidth) || 3).toString()+'%',
			maxWidth: '100%',
			backgroundColor: colorScale.getColor(loss)
		});
	}

	function isGateway(gateway, hostname){
		return (gateway === true)? hostname + ' (Gateway)' : hostname;
	}

	function onClick() {
		click(station.host.ip);
	}

	colorScale.setConfig({
		outputStart: 1,
		outputEnd: 100,
		inputStart: 0,
		inputEnd: settings.acceptable_loss
	});
	return (
		<div style={(station.loading && !loading)? style.loading: style.box} onClick={onClick} >
			<span>
				<b>{isGateway(gateway, station.host.hostname)}
					{ Number(station.bandwidth || '0') === 0 && station.loss
						? <b> ({I18n.t('Error')})</b>
						:false}
				</b><br /></span>
			{loading
				? (<Loading />)
				: (<div>
					{station.bandwidth || 0} Mbps / <span>{I18n.t('Packet loss')}</span> {station.loss}%<br />
					<div style={barStyle(station.loss)} />
				</div>)
			}
		</div>
	);
};

export default Box;