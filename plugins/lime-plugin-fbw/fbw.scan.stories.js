/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, array } from '@storybook/addon-knobs';

import { frameDecorator } from '../../.storybook/frameDecorator';
import { Scan } from './src/containers/Scan';

storiesOf('Containers|First boot wizard', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Scanning for networks', () => (
		<Scan
			networks={[{ config: {
				wifi: {}
			}, file: '' }]}
			status={'scanning'}
			hostname={'newnode'}
			getStatus={action('getStatus')}
			searchNetworks={action('searchNetworks')}
			setNetwork={action('setNetwork')}
			showNotification={action('showNotification')}
			toggleForm={() => action('toggleForm')}
		/>
	))
	.add('Select networks', () => (
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
			hostname={''}
			getStatus={action('getStatus')}
			searchNetworks={action('searchNetworks')}
			setNetwork={action('setNetwork')}
			showNotification={action('showNotification')}
			toggleForm={(data) => () => action('toggleForm')(data)}
		/>
	));