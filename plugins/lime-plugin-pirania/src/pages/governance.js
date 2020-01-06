/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { writeGovernance } from '../piraniaActions';
import { loading } from '../piraniaSelectors';

import I18n from 'i18n-js';
import { Box } from '../../../../src/components/box';
import Loading from '../../../../src/components/loading';
import { Input } from '../../../../src/components/input';
import { useInput } from '../../../../src/utils/hooks';

function Governance({ provider, community, member, goBack, loading, writeGovernance }) {
	const { value: communityCurrency, bind: bindCommunityCurrency } = useInput(community.currency);
	const { value: communityMaintenance, bind: bindCommunityMaintenance } = useInput(parseInt(community.maintenance, 10));
	const { value: communityReserve, bind: bindCommunityReserve } = useInput(parseInt(community.reserve, 10));
	const { value: communityPayday, bind: bindCommunityPayday } = useInput(community.payday);

	const { value: memberCost, bind: bindMemberCost } = useInput(member.cost);
	const { value: memberVouchers, bind: bindMemberVouchers } = useInput(member.vouchers);

	const { value: providerName, bind: bindProviderName } = useInput(provider.name);
	const { value: providerCost, bind: bindProviderCost } = useInput(provider.cost);
	const { value: providerSpeed, bind: bindProviderSpeed } = useInput(provider.speed);
	const { value: providerPayday, bind: bindProviderPayday } = useInput(provider.payday);

	function submitForm(e) {
		e.preventDefault();
		const data = {
			communityCurrency,
			communityMaintenance,
			communityReserve,
			communityPayday,
			memberCost,
			memberVouchers,
			providerName,
			providerCost,
			providerSpeed,
			providerPayday
		};
		writeGovernance(data);
	}
	return (
		<div>
			<button class="button green block" onClick={goBack}>
				{I18n.t('Go back')}
			</button>
			<Box title={I18n.t('Membership informantion')}>
				<div class="box">
					<Input width={'200px'}  {...bindMemberCost} label={I18n.t('Cost per member')} type="number" value={memberCost} />
					<Input width={'200px'}  {...bindMemberVouchers} label={I18n.t('Vouchers per member')} type="number" value={memberVouchers} />
				</div>
			</Box>
			{!loading && <Input type={'submit'} label={I18n.t('Save')} onClick={submitForm} />}
			{loading && <Loading />}
			<Box title={I18n.t('Edit payment informantion')}>
				<div class="box">
					<Input width={'200px'} {...bindCommunityCurrency} label={I18n.t('Community currency')} type="text" value={communityCurrency} />
					<Input width={'200px'}  {...bindCommunityPayday} label={I18n.t('Last day of the month for payment')} type="number" value={communityPayday} />
				</div>
				<br />
				<div class="box">
					<Input width={'200px'} {...bindCommunityReserve} label={I18n.t('Community reserve')} type="number" value={communityReserve} />
					<Input width={'200px'}  {...bindCommunityMaintenance} label={I18n.t('Community maintenance')} type="number" value={communityMaintenance} />
				</div>
			</Box>
			{!loading && <Input type={'submit'} label={I18n.t('Save')} onClick={submitForm} />}
			{loading && <Loading />}
			<Box title={I18n.t('Edit provider information')}>
				<div class="box">
					<Input width={'300px'} {...bindProviderName} label={I18n.t('Provider name')} type="text" value={providerName} />
					<Input width={'200px'}  {...bindProviderCost} label={I18n.t('Provider monthly cost')} type="number" value={providerCost} />
				</div>
				<div class="box">
					<Input width={'200px'} {...bindProviderSpeed} label={I18n.t('Provider speed')} type="text" value={providerSpeed} />
					<Input width={'200px'}  {...bindProviderPayday} label={I18n.t('Last day of the month for to pay the provider')} type="number" value={providerPayday} />
				</div>
				<br />
			</Box>
			{!loading && <Input type={'submit'} label={I18n.t('Save')} onClick={submitForm} />
			}
			{loading && <Loading />}</div>
	);
}

export const mapStateToProps = state => ({
	loading: loading(state)
});

export const mapDispatchToProps = dispatch => ({
	writeGovernance: bindActionCreators(writeGovernance, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Governance);
