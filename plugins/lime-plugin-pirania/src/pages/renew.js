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
					<Select key={voucher.voucher} text={voucher.note} checked={isChecked} onChange={handleCheck} value={voucher.voucher} />
				);
			})}
		</div>
	));
}

function Renew({ goBack, loading, vouchers, getVoucherList, daysLeft, renewDate, renewVouchers, renewed }) {
	const [selected, setSelected] = useState([]);
	function handleCheck(e) {
		const newList = selected.filter(i => i !== e.target.value);
		setSelected(newList);
	}
	function handleRenew() {
		const splitDate = renewDate.split('/');
		const day = parseInt(splitDate[0]);
		const month = parseInt(splitDate[1]);
		const year = parseInt(splitDate[2]);
		console.log(day + 1, month, year);
		const epoc = new Date(year, month, day + 1).valueOf();
		console.log('epoc', epoc);
		renewVouchers({
			date: epoc,
			vouchers: selected
		});
	}
	useEffect(() => {
		getVoucherList();
		return () => { };
	}, []);
	if (!loading && vouchers && selected.length === 0) {
		const firstSelected = vouchers
			.filter(v => v.type === 'member')
			.map(v => v.voucher);
		setSelected(firstSelected);
	}
	console.log('renewed', renewed);
	return (
		<div>
			<Box title={daysLeft + ' ' + I18n.t('days left')}>
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
				<button class="button green block button-one" disabled={loading} onClick={handleRenew}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Renew);
