/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean} from '@storybook/addon-knobs/react';

import { frameDecorator } from '../../.storybook/frameDecorator';
import { _NetAdminLogin, _NetAdminLogged } from './src/netAdminPage';


const submitLogin = action('login');
const submitSharedPassword = action('setSharedPassword');

storiesOf('Containers|Network Configuration screen', module)
    .addDecorator(withKnobs)
    .addDecorator(frameDecorator)
    .add('Login Screen', () => (
        <_NetAdminLogin
            submitting={boolean('submitting', false)}
            error={boolean('error', false)}
            submitLogin={submitLogin}/>
    ))
    .add('Logged Screen', () => (
        <_NetAdminLogged
            submitting={boolean('submitting', false)}
            error={boolean('error', false)}
            success={boolean('succees', false)}
            submitSharedPassword={submitSharedPassword} />
    ))
