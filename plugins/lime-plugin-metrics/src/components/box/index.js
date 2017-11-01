import { h, Component } from 'preact';

import colorScale from 'simple-color-scale';

import I18n from 'i18n-js';



const style = {
	box: {
		margin: '3px',
		padding: '10px',
		background: '#f5f5f5',
		textAalign: 'center',
		transition: 'height 04s ease',
		overflow: 'hidden',
		height: 'auto'
	},
	loading: {
		margin: '3px',
		padding: '10px',
		background: '#f5f5f5',
		textAalign: 'center',
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


class Box extends Component {
	barStyle(loss) {
		return Object.assign({},style.line,{
			width: (this.props.station.bandwidth*100/this.props.settings.good_bandwidth).toString()+'%',
			maxWidth: '100%',
			backgroundColor: colorScale.getColor(loss)
		});
	}
	isGateway(gateway, hostname){
		return (gateway === true)? hostname + ' (Gateway)' : hostname;
	}
	render() {
		colorScale.setConfig({
			outputStart: 1,
			outputEnd: 100,
			inputStart: 0,
			inputEnd: this.props.settings.acceptable_loss
		});
		return (
			<div style={(this.props.station.loading)? style.loading: style.box} onClick={this.props.click} >
				<span><b>{this.isGateway(this.props.gateway, this.props.station.hostname)}</b><br /></span>
				{this.props.station.bandwidth} Mbps / <span>{I18n.t('Packet loss')}</span> {this.props.station.loss}%<br />
				<div style={this.barStyle(this.props.station.loss)} />
			</div>
		);
	}
}

export default Box;