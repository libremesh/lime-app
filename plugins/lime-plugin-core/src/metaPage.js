import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeBase } from './metaActions';
import { getBase, getStations, getSelectedHost } from './metaSelectors';

import I18n from 'i18n-js';

export const Meta = ({ selectedHost, changeBase, stations, base }) => {
	
	const [ state, setState ] = useState({
		station: selectedHost
	});

	function handleChange(e) {
		setState({ station: e.target.value });
		e.target.value;
	}

	function nextStation(e) {
		e.preventDefault();
		if (typeof state.station !== 'undefined') {
			return changeBase(state.station);
		}
	}

	useEffect(() => {
		setState({
			station: selectedHost
		});
		return () => {};

	},[selectedHost]);

	return (
		<div class="container" style={{ paddingTop: '100px' }}>
			<form onSubmit={nextStation}>
				<div class="row">
					<div class="six columns">
						<p>
							<label>{I18n.t('Current status')}</label>
							<span>{I18n.t('Connected Host')}</span>: {selectedHost}<br />
							<span>{I18n.t('Base Host')}</span>: {base}
						</p>
					</div>
					<div class="six columns">
						<p>
							<label>{I18n.t('Select new base station')}</label>
							<select class="u-full-width" onChange={handleChange} value={state.station} >
								{stations.map(x => (<option value={x}>{x}</option>))}
							</select>
						</p>
					</div>
				</div>
		
				<button class="button green block" type="submit">{I18n.t('Change')}</button>
			</form>
		</div>
	);
};


export const mapStateToProps = (state) => ({
	stations: getStations(state),
	base: getBase(state),
	selectedHost: getSelectedHost(state)
});

export const mapDispatchToProps = (dispatch) => ({
	changeBase: bindActionCreators(changeBase,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
