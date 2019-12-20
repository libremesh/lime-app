/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import '../../src/i18nline-glue';

import { Banner } from '../../src/components/banner';
import 'skeleton-less/less/skeleton';
import '../../src/style';

export const actions = {
	send: action('onSend')
};

const bannerExample = {
	title: 'Please configure your network',
	description: `Your router has not yet been configured, 
		you can use our wizard to incorporate it into an existing network or create a new one.
		If you ignore this message it will continue to work with the default configuration.`,
	onOk: 'OK_EVENT',
	onCancel: 'CANCEL_EVENT'
};

storiesOf('Banner', module)
	.addDecorator(withKnobs)
	.add('like FBW', () => <Banner send={actions.send} banner={object('Banner configuration', bannerExample)} />);