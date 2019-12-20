import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeInterface, changeStation, startAlign, getSignal } from './alignActions';

import { getAll, getSelectedHost, getSettings } from './alignSelectors';

import I18n from 'i18n-js';

import colorScale from 'simple-color-scale';

//Eperimental text-to-speech
let synth = window.speechSynthesis;
let voices = synth.getVoices();

const speech = (text, lang, voices, synth) => {
	let utterThis = new SpeechSynthesisUtterance(text);
	utterThis.pitch = 0.9;
	utterThis.rate = 1.2;
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
		height: '10px'
	},
	hostname: {
		display: 'block',
		textAlign: 'center'
	},
	block: {
		width: '100%'
	}
};

function useInterval (callback, delay, off) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);

}

export const Align = ({ startAlign, changeInterface, changeStation, alignData, selectedHost, settings, getSignal }) => {

	const [ lastSpeech, setLastSpeech ] = useState(0);
	const [ resumedTimes, setResumedTimes ] = useState(0);

	function _changeInterface(e) {
		changeInterface(e.target.value);
	}

	function _changeStation(e) {
		changeStation(e.target.value);
	}

	function colorBar(signal) {
		return Object.assign({}, style.bar,{ backgroundColor: colorScale.getColor(signal) });
	}

	useEffect(() => {
		startAlign();
		colorScale.setConfig({
			outputStart: 1,
			outputEnd: Number(settings.bad_signal)* -1,
			inputStart: Number(settings.good_signal)* -1,
			inputEnd: Number(settings.bad_signal)* -1 + 10
		});
	},[]);

	useEffect(() => {
		if (typeof alignData.currentReading !== 'undefined') {
			const value = alignData.currentReading.signal * -1;
			
			if ( (Math.floor(lastSpeech/10) !== Math.floor(value/10)) || Number(value.toString()[value.toString().length -1 ]) === 0 || resumedTimes === 5 ) {
				speech(value || 0, 'es-ES', voices, synth);
				setResumedTimes(() => 0);
			}
			
			else {
				speech(value.toString()[value.toString().length - 1] || 0, 'es-ES', voices, synth);
				setResumedTimes(() => resumedTimes + 1);
			}
			setLastSpeech(() => value);
		}
	}, [alignData]);

	useInterval(() => {
		getSignal();
	},[2000]);

	return (
		<div className="container" style={{ paddingTop: '100px' }}>
			{ typeof alignData.currentReading !== 'undefined'? (
				<div className="row">
					<div className="six columns">
						<span style={style.hostname}>
							{selectedHost || ''}
						</span>
						<h1 style={style.signal}>
							{alignData.currentReading.signal || 0}
							<span style={colorBar(alignData.currentReading.signal * -1)} />
						</h1>
						<span style={style.hostname}>
							{alignData.currentReading.hostname || ''}
						</span>
					</div>
					<div className="six columns">
						<label>{I18n.t('Interfaces')}</label>
						<select style={style.block} onChange={_changeInterface} value={alignData.currentReading.iface ? alignData.currentReading.iface : null}>
							{alignData.ifaces.map((iface) => <option value={iface.name}>{iface.name}</option>)}
						</select>
						<label>{I18n.t('Stations')}</label>
						<select  style={style.block} onChange={_changeStation} value={alignData.currentReading.mac ? alignData.currentReading.mac : null}>
							{alignData.stations.map((station) => <option value={station.mac}>{station.hostname}</option>)}
						</select>
					</div>
				</div>
			): (
				<div className="row">
					<div className="six columns">
						<span style={style.hostname}>
							{I18n.t('This node does not see other nodes in the network.')}
						</span>
						<h1 style={style.signal}>
							:(
						</h1>
					</div>
				</div>
			)}
		</div>
	);
};


const mapStateToProps = (state) => ({
	alignData: getAll(state),
	selectedHost: getSelectedHost(state),
	settings: getSettings(state)
});

const mapDispatchToProps = (dispatch) => ({
	changeInterface: bindActionCreators(changeInterface, dispatch),
	changeStation: bindActionCreators(changeStation, dispatch),
	startAlign: bindActionCreators(startAlign, dispatch),
	getSignal: bindActionCreators(getSignal, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Align);