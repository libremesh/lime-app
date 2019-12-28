/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, text } from '@storybook/addon-knobs/react';

import { frameDecorator } from '../../.storybook/frameDecorator';
import { Align } from './src/alignPage';
import { useState } from 'preact/hooks';

export const actions = {
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
const selectedHost = 'ql-anaymarcos';
const settings = {
	bad_signal: '-82',
	acceptable_loss: '20',
	bad_bandwidth: '1',
	good_signal: '-65',
	good_bandwidth: '5'
};

const AlignWithState = ({ selectedHost, settings, getSignal }) => {
	const [ align, setAlign ] = useState(alignData);

	function changeStation(stationMac) {
		const newSelected = { ...align.stations.find(x => x.mac === stationMac) };
		setAlign({ ...align, currentReading: newSelected });
	}

	function changeInterface(iface) {
		if (iface === 'wlan2-adhoc') {
			setAlign({ ...alignData });
		}
	}

	function setRandom() {
		console.log( Math.floor(Math.random() * 10) + 60);
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
			selectedHost={selectedHost}
			settings={settings}
			changeStation={changeStation}
			changeInterface={changeInterface}
			startAlign={actions.startAlign}
			getSignal={setRandom}
		/>
	);
};

storiesOf('Containers|Align screen', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('without align data', () => (
		<Align
			alignData={object('Align data', {})}
			selectedHost={text('Selected host', selectedHost)}
			settings={object('Settings', settings)}
			{...actions}
		/>
	))
	.add('with align data', () => (
		<AlignWithState
			selectedHost={object('Selected host', selectedHost)}
			settings={object('Settings', settings)}
			{...actions}
		/>)
	);
