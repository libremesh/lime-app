/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import {FbwBanner} from "./src/containers/FbwBanner";

storiesOf('Containers/First boot wizard', module)

	.add('Choose an option', () => (
		<FbwBanner
			toggleForm={(data) => () => action('toggleForm')(data)}
		/>
	));
