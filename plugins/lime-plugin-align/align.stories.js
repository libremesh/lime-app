/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';

import { Align } from './src/alignPage';
import { useState } from 'preact/hooks';

const actions = {
	changeInterface: action('changeInterface'),
	changeStation: action('changeStation'),
	startAlign: action('startAlign'),
	getSignal: action('getSignal')
};

const alignData = {
	ifaces: [
		{
			name: 'wlan1-adhoc',
			mode: 'adhoc'
		},
		{
			name: 'wlan2-adhoc',
			mode: 'adhoc'
		}
	],
	stations: [
		{
			mac: 'A8:40:41:1C:84:05',
			hostname: 'ql-graciela',
			signal: -64,
			iface: 'wlan1-adhoc'
		},
		{
			mac: 'A8:40:41:1C:84:04',
			hostname: 'ql-margayorlando',
			signal: -52,
			iface: 'wlan1-adhoc'
		}
	],
	currentReading: {
		mac: 'A8:40:41:1C:84:05',
		hostname: 'ql-graciela',
		signal: -64,
		iface: 'wlan1-adhoc'
	}
};

const AlignWithState = ({ getSignal }) => {
	const [ align, setAlign ] = useState(alignData);
 
	function changeStation(station) {
		const newSelected = { ...align.stations.find(x => x.mac === station.mac) };
		setAlign({ ...align, currentReading: newSelected });
	}

	function changeInterface(iface) {
		if (iface === 'wlan2-adhoc') {
			setAlign({ ...alignData });
		}
	}

	function setRandom() {
		getSignal();
		setAlign(() => ({
			...align,
			currentReading: {
				...align.currentReading,
				signal: Math.floor(Math.random() * 10) + 60
			}
		})
		);
	}
    
	return (
		<Align
			alignData={align}
			changeStation={changeStation}
			changeInterface={changeInterface}
			startAlign={actions.startAlign}
			getSignal={setRandom}
		/>
	);
};

export default {
	title: 'Containers/Align screen',
	component: Align
};

export const withoutAlignData = () => (
	<Align
		alignData={object('Align data', {})}
		{...actions}
	/>
);

export const withAlignData = () => (
	<AlignWithState {...actions} />
);
