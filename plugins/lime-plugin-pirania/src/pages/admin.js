import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { enable, disable, getStatus } from '../piraniaActions';
import { loading, status } from '../piraniaSelectors';

import { Box } from '../../../../src/components/box';
import { Loading } from '../../../../src/components/loading';

import I18n from 'i18n-js';

export const AdminPiraniaPage = ({ provider,
	community,
	member,
	payday,
	visitors,
	members,
	list,
	create,
	renew,
	editGovernance,
	editContent,
	download,
	daysLeft,
	getStatus,
	status,
	enable,
	disable,
	loading
}) => {
	function handleSwitch(e) {
		e.preventDefault();
		if (status) {
			disable();
		}
		else enable();
		getStatus();
	}
	useEffect(() => {
		if (status === undefined) {
			getStatus();
		}
		return () => { };
	}, []);
	return (
		<div>
			<div className="box">
				<b>{I18n.t('Enable or disable Pirania')}</b>
				<label className="switch">
					<input type="checkbox" checked={status} onChange={handleSwitch} />
					{!loading && <span className="slider">
						<span
							style={{
								position: 'relative',
								top: 5,
								left: status ? 15 : 60
							}}
						>
							{status ? I18n.t('On') : I18n.t('Off')}
						</span>
					</span>}
					{loading && <Loading />}
				</label>
			</div>
			<Box title={I18n.t('Current month')}>
				<div class="info">
					<span style="display: none;">
						<b>{I18n.t('Members')}: </b>
						<span>{members}</span>
						<b style={{ marginLeft: 30, marginRight: 10 }}>
							{I18n.t('%{daysLeft} days left', { daysLeft })}
						</b>
						<br />
					</span>
					<span>
						<b>{I18n.t('Visitors')}: </b>
						<span>{visitors}</span>
						<br />
					</span>
				</div>
				<button class="button green block" onClick={list}>
					{I18n.t('Show all vouchers')}
				</button>
			</Box>
			<button class="button green block button-one" onClick={create}>
				{I18n.t('Create voucher')}
			</button>
			<button class="button green block" onClick={renew} style="display: none;">
				{I18n.t('Renew member vouchers')}
			</button>
			<Box title={I18n.t('Governance information')} style={{ marginTop: 30 }}>
				<div className="info">
					<span style="display: none;">
						<b>{I18n.t('Value per person')}: </b>
						<span>{community.currency} {member.cost}</span>
						<br />
					</span>
					<span style="display: none;">
						<b>{I18n.t('Active member vouchers')}: </b>
						<span>{members}</span>
						<br />
					</span>
					<span>
						<b>{I18n.t('Active visitor vouchers')}: </b>
						<span>{visitors}</span>
						<br />
					</span>
					<span style="display: none;">
						<b>{I18n.t('Contracted internet speed')}: </b>
						<span>{provider.speed}</span>
						<br />
					</span>
					<span style="display: none;">
						<span>
							<b>{I18n.t('Provider cost')}: </b>
							<span>{community.currency} {provider.cost}</span>
							<br />
						</span>
					</span>
					<span style="display: none;">
						<b>{I18n.t('Maintenance cost')}: </b>
						<span>{community.currency} {community.maintenance}</span>
						<br />
					</span>
					<span style="display: none;">
						<b>{I18n.t('Amount in reserve')}: </b>
						<span>{community.currency} {community.reserve}</span>
						<br />
					</span>
				</div>
				<div>
					<button class="button green block button-one" onClick={editGovernance} style="display: none;">
						{I18n.t('Edit governance information')}
					</button>
					<button class="button green block" onClick={editContent}>
						{I18n.t('Edit captive-portal page content')}
					</button>
				</div>
			</Box>
		</div>
	);
};

export const mapStateToProps = state => ({
	loading: loading(state),
	status: status(state)
});

export const mapDispatchToProps = dispatch => ({
	getStatus: bindActionCreators(getStatus, dispatch),
	enable: bindActionCreators(enable, dispatch),
	disable: bindActionCreators(disable, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminPiraniaPage);
