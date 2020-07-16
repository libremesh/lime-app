import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStations } from './changeNodeSelectors';
import { loadStations } from './changeNodeActions';

import I18n from 'i18n-js';
import { useAppContext } from '../../../src/utils/app.context';

export const ChangeNode = ({ stations, loadStations }) => {
	const { nodeHostname, baseNodeHostname, changeNode } = useAppContext();

	const [ state, setState ] = useState({
		station: nodeHostname
	});

	
	useEffect(() => {
		setState({
			station: nodeHostname
		});
		return () => {};
		
	},[nodeHostname]);
	
	useEffect(() => {
		loadStations();
	}, [loadStations]);

	function handleChange(e) {
		setState({ station: e.target.value });
		e.target.value;
	}

	function nextStation(e) {
		e.preventDefault();
		if (typeof state.station !== 'undefined') {
			return changeNode(state.station);
		}
	}

	function sortStations(stations) {
		const result = stations
			.filter(x => x !== nodeHostname)
			.sort();
		result.push(nodeHostname);
		return result;
	}

	return (
		<div class="container container-padded">
			<form onSubmit={nextStation}>
				<div class="row">
					<div class="six columns">
						<p>
							<label>{I18n.t('Current status')}</label>
							<span>{I18n.t('Connected Host')}</span>: {nodeHostname}<br />
							<span>{I18n.t('Base Host')}</span>: {baseNodeHostname}
						</p>
					</div>
					<div class="six columns">
						<p>
							<label>{I18n.t('Select new base station')}</label>
							<select class="u-full-width" onChange={handleChange} value={state.station}>
								{sortStations(stations).map(x => (<option value={x}>{x}</option>))}
							</select>
						</p>
					</div>
				</div>
		
				<button class="button block" type="submit">{I18n.t('Change')}</button>
			</form>
		</div>
	);
};


const mapStateToProps = (state) => ({
	stations: getStations(state)
});

const mapDispatchToProps = (dispatch) => ({
	loadStations: bindActionCreators(loadStations, dispatch)
});

const changeNodeConnected = connect(mapStateToProps, mapDispatchToProps)(ChangeNode);
export default changeNodeConnected;
