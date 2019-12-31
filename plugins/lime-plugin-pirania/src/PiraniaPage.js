/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'preact/hooks';

import { adminLogin } from '../../lime-plugin-admin/src/adminActions';
import { getPiraniaGovernance } from './piraniaActions';
import { governance, loading } from './piraniaSelectors';
import { authStatus } from '../../lime-plugin-admin/src/adminSelectors';

import Loading from '../../../src/components/loading';
import Home from './pages/home';
import Admin from './pages/admin';
import Create from './pages/create';
import List from './pages/list';

import I18n from 'i18n-js';

const style = {
	textLoading: {
		textAlign: 'center',
		display: 'block'
	},
	loadingBox: {
		position: 'fixed',
		marginTop: '30vh',
		zIndex: '5555',
		background: 'rgb(255, 255, 255)',
		width: '200px',
		top: '0px',
		left: 'calc(50% - 100px)',
		borderRadius: '11px',
		padding: '15px',
		boxShadow: '1px 1px 6px rgba(0,0,0,0.5)'
	}
};

export const Pirania = ({
	authStatus,
	adminLogin,
	loading,
	getPiraniaGovernance,
	governance,
	vouchers
}) => {
	const [page, setPage] = useState(0);
	const [password, changePassword] = useState('');
	function handlePassword(e) {
		changePassword(e.target.value);
	}

	function login(e) {
		e.preventDefault();
		adminLogin({
			username: 'root',
			password
		});
	}

	function showLoading(show) {
		if (show) {
			return (
				<div style={style.loadingBox}>
					<Loading />
					<span style={style.textLoading}>{I18n.t('Loading')}</span>
				</div>
			);
		}
	}

	function handleRedirect() {
		console.log('Should redirect to download');
	}

	useEffect(() => {
		getPiraniaGovernance();
		return () => { };
	}, []);

	if (governance) {
		const { community } = governance;
		const now = new Date();
		const date = now.getDate();
		const hasPassed = date > community.payday;
		const nextPayday = hasPassed
			? new Date(now.getFullYear(), now.getMonth() + 1, community.payday)
			: now;
		const month = nextPayday.getMonth() + 1;
		const year = nextPayday.getFullYear();
		const daysLeft = Math.floor(
			(Date.UTC(
				nextPayday.getFullYear(),
				nextPayday.getMonth(),
				nextPayday.getDate()
			) -
				Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
			(1000 * 60 * 60 * 24)
		);
		const payday =
			community.payday === date
				? 'Today'
				: `${community.payday}/${month}/${year}`;

		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				{!authStatus && (
					<Home
						logged={authStatus}
						submit={login}
						handlePassword={handlePassword}
						payday={payday}
						daysLeft={daysLeft}
						{...governance}
					/>
				)}
				{authStatus && page === 0 && (
					<Admin
						list={() => setPage(1)}
						create={() => setPage(2)}
						renew={() => setPage(3)}
						download={handleRedirect}
						daysLeft={daysLeft}
						{...governance}
					/>
				)}
				{page === 1 && <List goBack={() => setPage(0)} />}
				{page === 2 && (
					<Create
						goBack={() => setPage(0)}
						list={() => setPage(1)}
						daysLeft={daysLeft}
					/>
				)}
			</div>
		);
	}
	return showLoading(loading);
};

export const mapStateToProps = state => ({
	authStatus: authStatus(state),
	loading: loading(state),
	governance: governance(state)
});

export const mapDispatchToProps = dispatch => ({
	getPiraniaGovernance: bindActionCreators(getPiraniaGovernance, dispatch),
	adminLogin: bindActionCreators(adminLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Pirania);
