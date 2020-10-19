import { useAppContext } from '../../utils/app.context';
import I18n from 'i18n-js';
import { useState, useEffect } from 'preact/hooks';
import Loading from '../../components/loading';
import { useLogin } from 'utils/queries';

const loadingBoxStyle = {
	position: 'fixed',
	marginTop: '30vh',
	zIndex: '5555',
	background: 'rgb(255, 255, 255)',
	width: '200px',
	top: '0px',
	left: 'calc(50% - 100px)',
	borderRadius: '11px',
	padding: '15px',
	boxShadow: '1px 1px 6px rgba(0,0,0,0.5)',
	textAlign: 'center'
};

const SharedPasswordLogin = ({ submitting, error, submitLogin }) => {
	const [password, setPassword] = useState('');
	const [showHelp, setShowHelp] = useState('');

	function toogleHelp(e) {
		e.preventDefault();
		setShowHelp(prevValue => !prevValue);
	}

	function changePassword(e) {
		setPassword(e.target.value || '');
	}

	function _submitLogin() {
		submitLogin(password);
	}

	return (
		<div className="container container-padded">
			<p>{I18n.t('You need to know the shared password to enter this page')}</p>
			<label htmlFor="password">{I18n.t('Shared Password')}</label>
			<input name="password" type="password" value={password} onInput={changePassword} />
			{error &&
				<p>{I18n.t('Wrong password, try again')}</p>
			}
			<div>
				<button onClick={_submitLogin}>{I18n.t('Login')}</button>
			</div>
			<a href="#" onClick={toogleHelp}>{I18n.t("I don't know the shared password")}</a>
			{showHelp &&
				<p>{I18n.t('The shared password has been chosen by the community when the network was created. You can ask other community members for it.')}</p>
			}
			{submitting &&
				<div style={loadingBoxStyle}>
					<Loading />
					{I18n.t('Logging in')}
				</div>
			}
		</div>
	);
};

const TryToLoginAutomatically = () => {
	const [hasPassword, sethasPassword] = useState(undefined);
	const { loginAsRoot } = useAppContext();

	useEffect(() => {
		loginAsRoot('')
			.catch(() => sethasPassword(true));
	}, [sethasPassword, loginAsRoot]);

	if (hasPassword === undefined) {
		return <div class="container container-center"><Loading /></div>
	}
	if (hasPassword === true) {
		return <SharedPasswordLoginHOC />
	}
	return hasPassword
}

const SharedPasswordLoginHOC = () => {
	const [login, {isLoading, isError}] = useLogin();

	function submitLogin (password) {
		login({username: 'root', password})
	}

	return <SharedPasswordLogin submitting={isLoading} error={isError} submitLogin={submitLogin} />;
};

export default TryToLoginAutomatically;
