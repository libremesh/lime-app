import { h } from 'preact';

function passwordHasLength(password) {
	// Check there is at least 10 characters in the string
	return password.match("^(?=.{10,}$).*$")
}

function passwordHasNumber(password) {
	// Check there is at least one number in the string
	return password.match("^(?=.*[0-9]).*$")
}

function passwordHasAlphanumeric(password) {
	// Check there is at least one alphanumeric in the string
	return password.match("^(?=.*[a-zA-z]).*$")
}

export function isValidPassword(password) {
	return (
		passwordHasLength(password) &&
        passwordHasAlphanumeric(password) &&
        passwordHasNumber(password)
	)
}

const StatusBox = ({value}) => (
	<b>
		{value ?
			(<span style={{ color: 'green' }}>✔</span>)
			:
			(<span style={{ color: 'red' }}>✘</span>)
		}
	</b>
)

export const ValidationMessages = ({password}) => (
	<p>
		{I18n.t('The password should have:')}<br />
		<StatusBox value={passwordHasLength(password)} /> {I18n.t('More than 10 characters')}<br />
		<StatusBox value={passwordHasNumber(password)} /> {I18n.t('At least one number')}<br />
		<StatusBox value={passwordHasAlphanumeric(password)} /> {I18n.t('At least one alphanumeric character')}<br />
	</p>
)
