import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVoucherList, renewVouchers } from '../piraniaActions';
import { vouchers, loading, renewed } from '../piraniaSelectors';
import Loading from '../../../../src/components/loading';
import { Box } from '../../../../src/components/box';
import { Select } from '../../../../src/components/select';
import { mergeTypes } from './list';
import getDaysLeft from '../../../../src/utils/daysLeft';

import I18n from 'i18n-js';

function RenewContent({ vouchers, handleCheck, selected }) {
	let flatList = {
		member: {},
		visitor: {},
		invalid: {}
	};
	vouchers.forEach(voucher => mergeTypes(voucher, flatList));
	return Object.keys(flatList.member).map(node => (
		<div key={node}>
			<h4>{node}</h4>
			{flatList.member[node].map(voucher => {
				const isChecked = selected.find(s => s === voucher.voucher);
				return (
					<div className="box">
						<Select key={voucher.voucher} text={voucher.note} checked={isChecked} onChange={handleCheck} value={voucher.voucher} />
						<span>
							{I18n.t('%{daysLeft} days left', { daysLeft: getDaysLeft(voucher.expires) })}
						</span>
					</div>
				);
			})}
		</div>
	));
}

export function RenewPiraniaPage({ goBack, loading, vouchers, getVoucherList, daysLeft, renewDate, renewVouchers, renewed, renewEpoc }) {
	const [selected, setSelected] = useState([]);
	function handleCheck(e) {
		const newList = selected.filter(i => i !== e.target.value);
		setSelected(newList);
	}
	function handleRenew() {
		renewVouchers({
			date: `${renewEpoc}`,
			vouchers: selected
		});
	}
	useEffect(() => {
		if (!vouchers) {
			getVoucherList();
		}
		return () => { };
	}, []);
	let allVouchersRenewed = true;
	if (vouchers) {
		const memberVouchers = vouchers.filter(v => v.type === 'member');
		if (selected.length === 0 && !loading) {
			const firstSelected = memberVouchers.map(v => v.voucher);
			setSelected(firstSelected);
		}
		allVouchersRenewed = memberVouchers.filter(v => daysLeft < getDaysLeft(v.expres) - 1).length > 0;
	}
	const disabled = loading || renewed || allVouchersRenewed;
	return (
		<div>
			<Box title={I18n.t('%{daysLeft} days left', { daysLeft })}>
				{!loading && vouchers
					? <RenewContent
						vouchers={vouchers}
						handleCheck={handleCheck}
						selected={selected}
					  />
					: <Loading />
				}
			</Box>
			<div>
				<h4>{I18n.t('Renew vouchers until')} {renewDate}</h4>
				<button class="button green block button-one" disabled={disabled} onClick={handleRenew}>
					{I18n.t('Renew')}
				</button>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Cancel')}
				</button>
			</div>
		</div>
	);
}

export const mapStateToProps = state => ({
	loading: loading(state),
	vouchers: vouchers(state),
	renewed: renewed(state)
});

export const mapDispatchToProps = dispatch => ({
	getVoucherList: bindActionCreators(getVoucherList, dispatch),
	renewVouchers: bindActionCreators(renewVouchers, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RenewPiraniaPage);
