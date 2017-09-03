import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { changeInterface, changeStation, startAlign, stopTimer } from './alignActions';

import { getAll, getSelectedHost } from './alignSelectors';

import I18n from 'i18n-js';

import colorScale from 'simple-color-scale';
colorScale.setConfig({
	outputStart: 1,
	outputEnd: 85,
	inputStart: 65,
	inputEnd: 100
});

//Eperimental text-to-speech
let synth = window.speechSynthesis;
let voices = synth.getVoices();

const speech = (text, lang, voices, synth) => {
	let utterThis = new SpeechSynthesisUtterance(text);
	utterThis.pitch = 0.9;
	utterThis.rate = 2.2;
	utterThis.voice = voices.filter(x => x.name === lang)[0];
	synth.speak(utterThis);
};


const style = {
	signal: {
		fontSize: '20vh',
		margin: '0.5rem',
		display: 'block',
		textAlign: 'center'
	},
	bar: {
		display: 'block',
		height: '5px'
	},
	hostname: {
		display: 'block',
		textAlign: 'center'
	},
	block: {
		width: '100%'
	}
};

class Align extends Component {

	changeInterface(e) {
		this.props.changeInterface(e.target.value);
	}

	changeStation(e) {
		this.props.changeStation(e.target.value);
	}

	constructor() {
		super();
		this.changeInterface = this.changeInterface.bind(this);
		this.changeStation = this.changeStation.bind(this);
	}

	componentWillMount() {
		this.props.startAlign();
	}

	componentWillUnmount() {
		this.props.stopAlign();
	}

	render(state) {
		speech(state.alignData.currentReading.signal*-1 || 0, 'es-ES', voices, synth);
		return (
			<div className="container" style={{ paddingTop: '100px' }}>
				<div className="row">
					<div className="six columns">
						<span style={style.hostname}>
							{this.props.selectedHost || ''}
						</span>
						<h1 style={style.signal}>
							{state.alignData.currentReading.signal || 0}
							<span style={Object.assign(style.bar,{ backgroundColor: colorScale.getColor(state.alignData.currentReading.signal || 0) })} />
						</h1>
						<span style={style.hostname}>
							{state.alignData.currentReading.hostname || ''}
						</span>
					</div>
					<div className="six columns">
						<label>{I18n.t('Intefaces')}</label>
						<select style={style.block} onChange={this.changeInterface} value={state.alignData.currentReading.iface ? state.alignData.currentReading.iface : null}>
							{state.alignData.ifaces.map((iface) => <option value={iface.name}>{iface.name}</option>)}
						</select>
						<label>{I18n.t('Stations')}</label>
						<select  style={style.block} onChange={this.changeStation} value={state.alignData.currentReading.mac ? state.alignData.currentReading.mac : null}>
							{state.alignData.stations.map((station) => <option value={station.mac}>{station.hostname}</option>)}
						</select>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	alignData: getAll(state),
	selectedHost: getSelectedHost(state)
});

const mapDispatchToProps = (dispatch) => ({
	changeInterface: bindActionCreators(changeInterface, dispatch),
	changeStation: bindActionCreators(changeStation, dispatch),
	startAlign: bindActionCreators(startAlign, dispatch),
	stopAlign: bindActionCreators(stopTimer,dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Align);