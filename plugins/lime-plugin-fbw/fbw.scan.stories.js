/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { array } from '@storybook/addon-knobs';

import { Scan } from './src/containers/Scan';

export default {
	title: 'Containers/First boot wizard',
	component: Scan
};

export const scanningForNetworks = () => (
	<Scan
		networks={[{ config: {
			wifi: {}
		}, file: '' }]}
		status={'scanning'}
		searchNetworks={action('searchNetworks')}
		setNetwork={action('setNetwork')}
		toggleForm={() => action('toggleForm')}
	/>
);

export const selectNetworks = () => (
	<Scan
		networks={array('Hosts founded',[{
			ap: 'ql-graciela',
			config: {
				wifi: {
					apname_ssid: 'quintanalibre.org.ar/%H',
					ap_ssid: 'quintanalibre.org.ar'
				}
			},
			file: 'lime_default-ql-graciela'
		},
		{
			ap: 'ql-oncelotes',
			config: {
				wifi: {
					apname_ssid: 'quintanalibre.org.ar/%H',
					ap_ssid: 'quintanalibre.org.ar'
				}
			},
			file: 'lime_default-ql-oncelotes'
		}])}
		status={'scanned'}
		searchNetworks={action('searchNetworks')}
		setNetwork={action('setNetwork')}
		toggleForm={(data) => () => action('toggleForm')(data)}
	/>
);
