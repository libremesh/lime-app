/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Alert from '../../src/components/alert';
import 'skeleton-less/less/skeleton';
import '../../src/style';

export const actions = {
	hideAlert: action('hide')
};

const sampleText = 'Lorem ipsum dolor sit amet';

storiesOf('Alert', module)
	.addDecorator(withKnobs)
	.add('show alert', () => <Alert hide={actions.hideAlert} text={text('Alert message', sampleText)} />);