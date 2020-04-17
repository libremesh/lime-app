import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import SharedPasswordForm from './sharedPasswordForm';

const actions = {
    onOk: action('onOk'),
    onBackToError: action('onBackToError'),
}

storiesOf('SharedPasswordForm', module)
    .add('form', () => <SharedPasswordForm {...actions}></SharedPasswordForm>)
