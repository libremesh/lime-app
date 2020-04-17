import { Fragement, h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import PropTypes from 'prop-types';

const StatusBox = ({value}) => (
	<b>
		{value ?
			(<span style={{ color: 'green' }}>✔</span>)
			:
			(<span style={{ color: 'red' }}>✘</span>)
		}
	</b>
)

/**
 * Form component to input secure shared password
 * with strength feedback and double input verification
 */
const SharedPasswordForm = ({ onOk, onBackToError }) => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [, setValid] = useState(false);

    useEffect(() => {
        setValid(prev => {
            const current = validateForm();
            current && !prev && onOk(password);
            !current && prev && onBackToError();
            return current;
        })
    }, [password, passwordConfirmation]);

    function passwordHasLength() {
        // Check there is at least 10 characters in the string
        return password.match("^(?=.{10,}$).*$")
    }

    function passwordHasNumber() {
        // Check there is at least one number in the string
        return password.match("^(?=.*[0-9]).*$")
    }

    function passwordHasAlphanumeric() {
        // Check there is at least one alphanumeric in the string
        return password.match("^(?=.*[a-zA-z]).*$")
    }

    function onPasswordChange(e) {
        setPassword(e.target.value || '');
    }

    function onPasswordConfirmationChange(e) {
        setPasswordConfirmation(e.target.value || '');
    }

    function validateForm() {
        return (
            passwordHasLength() &&
            passwordHasAlphanumeric() &&
            passwordHasNumber() &&
            password === passwordConfirmation
        );
    }

    return (
        <Fragment>
            <label>{I18n.t('Choose a shared password for network adminitration')}</label>
            <input type="password" placeholder={I18n.t('Password')} class="u-full-width" value={password} onInput={onPasswordChange} />
            <p>{I18n.t('The password should have:')}<br />
                <StatusBox value={passwordHasLength()} /> {I18n.t('More than 10 characters')}<br />
                <StatusBox value={passwordHasNumber()} /> {I18n.t('At least one number')}<br />
                <StatusBox value={passwordHasAlphanumeric()} /> {I18n.t('At least one alphanumeric character')}<br />
            </p>
            <label>{I18n.t('Re-enter the shared password')}</label>
            <input type="password" placeholder={I18n.t('Re-enter Password')} class="u-full-width" value={passwordConfirmation} onInput={onPasswordConfirmationChange} />
            {passwordConfirmation && password !== passwordConfirmation &&
                <p>{I18n.t('The passwords do not match!')}</p>
            }
        </Fragment>
    )
}

SharedPasswordForm.propTypes = {
    /** onOk(password) will be called with the password when the form gets valid */
    onOk: PropTypes.func,
    /** onBackToError() will be called when the form gets invalid state */
    onBackToError: PropTypes.func
}

export default SharedPasswordForm;
