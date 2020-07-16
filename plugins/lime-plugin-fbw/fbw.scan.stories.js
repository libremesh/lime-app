/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, text } from '@storybook/addon-knobs/react';

import { Scan } from './src/containers/Scan';
import { AppContext } from '../../src/utils/app.context';

const nodeHostname = text('nodeHostname', 'new-node');

export default {
	title: 'Containers|First boot wizard',
	component: Scan,
	decorators: [withKnobs]
};

export const scanningForNetworks = () => (
	<AppContext.Provider value={{ nodeHostname }}>
		<Scan
			networks={[{ config: {
				wifi: {}
			}, file: '' }]}
			status={'scanning'}
			searchNetworks={action('searchNetworks')}
			setNetwork={action('setNetwork')}
			toggleForm={() => action('toggleForm')}
		/>
	</AppContext.Provider>
);

export const selectNetworks = () => (
	<AppContext.Provider value={{ nodeHostname }}>
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
	</AppContext.Provider>
);
