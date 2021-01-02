/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'preact/hooks';

import { getPiraniaGovernance, getActiveVouchers } from './piraniaActions';
import { activeVouchers, governance, loading } from './piraniaSelectors';

import Loading from '../../../src/components/loading';
import Home from './pages/home';
import Admin from './pages/admin';
import Create from './pages/create';
import List from './pages/list';
import Renew from './pages/renew';
import Governance from './pages/governance';
import Content from './pages/content';

import I18n from 'i18n-js';
import './style';

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
	activeVouchers,
	loading,
	getActiveVouchers,
	getPiraniaGovernance,
	governance,
	vouchers
}) => {
	const [page, setPage] = useState(0);
	const [password, changePassword] = useState('');
	function handlePassword(e) {
		changePassword(e.target.value);
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

	function goBack() {
		setPage(0);
	}

	useEffect(() => {
		getActiveVouchers();
		getPiraniaGovernance();
		return () => { };
	}, []);

	if (governance) {
		const { community } = governance;
		const now = new Date();
		const date = now.getDate();
		const hasPassed = date > community.payday;
		const nextPayday = new Date(now.getFullYear(), now.getMonth(), community.payday);
		const createEpoc = new Date(now.getFullYear(), now.getMonth(), community.payday + 1).valueOf();
		const nextNextRenewday = new Date(now.getFullYear(), now.getMonth() + 1, community.payday + 1);
		const renewMonth = nextNextRenewday.getMonth() + 1;
		const renewYear = nextNextRenewday.getFullYear();
		const renewEpoc = nextNextRenewday.valueOf();
		const renewDate = `${community.payday + 1}/${renewMonth > 9 ? renewMonth : `0${  renewMonth}`}/${renewYear}`;
		const month = nextPayday.getMonth() + 1;
		const year = nextPayday.getFullYear();
		const payday =
            community.payday === date
            	? 'Today'
            	: `${community.payday}/${month > 9 ? month : `0${  month}`}/${year}`;
		const daysLeft = Math.floor(
			(Date.UTC(
				nextPayday.getFullYear(),
				hasPassed ? nextPayday.getMonth() + 1 : nextPayday.getMonth(),
				nextPayday.getDate()
			) -
                Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
            (1000 * 60 * 60 * 24)
		);
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				<Admin
					list={() => setPage(1)}
					create={() => setPage(2)}
					renew={() => setPage(3)}
					editGovernance={() => setPage(4)}
					editContent={() => setPage(5)}
					payday={payday}
					daysLeft={daysLeft}
					{...activeVouchers}
					{...governance}
				/>
				{page === 1 && <List goBack={goBack} />}
				{page === 2 && (
					<Create
						goBack={goBack}
						daysLeft={daysLeft}
						createEpoc={createEpoc}
						list={() => setPage(1)}
					/>
				)}
				{page === 3 && (
					<Renew
						daysLeft={daysLeft}
						goBack={goBack}
						renewDate={renewDate}
						renewEpoc={renewEpoc}
					/>
				)}
				{page === 4 && (
					<Governance
						goBack={goBack}
						{...governance}
					/>
				)}
				{page === 5 && (
					<Content
						goBack={goBack}
					/>
				)}
			</div>
		);
	}
	return showLoading(loading);
};

export const mapStateToProps = state => ({
	activeVouchers: activeVouchers(state),
	loading: loading(state),
	governance: governance(state)
});

export const mapDispatchToProps = dispatch => ({
	getActiveVouchers: bindActionCreators(getActiveVouchers, dispatch),
	getPiraniaGovernance: bindActionCreators(getPiraniaGovernance, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Pirania);
