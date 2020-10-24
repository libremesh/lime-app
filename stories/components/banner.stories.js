/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';

import { Banner } from 'components/banner';

const actions = {
	onOk: action('onOk'),
	onCancel: action('onCancel'),
	onNotShowAgain: action('notShowAgain')
};


export default {
	title: 'Banner',
	component: Banner
};

export const likeFBW = () => {
	const title = 'Please configure your network';
	const description = `Your router has not yet been configured, 
		you can use our wizard to incorporate it into an existing network or create a new one.
		If you ignore this message it will continue to work with the default configuration.`;
	return <Banner title={title} description={description} {...actions} />;
};
