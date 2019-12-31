import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVoucherList } from '../piraniaActions';
import { vouchers, loading } from '../piraniaSelectors';
import Loading from '../../../../src/components/loading';
import { Box } from '../../../../src/components/box';
import { Select } from '../../../../src/components/select';
import { mergeTypes } from './list';

import I18n from 'i18n-js';

function RenewContent ({ vouchers, handleCheck, selected }) {
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

function renewVouchers () {

	/* TODO */
}

function Renew ({ goBack, loading, vouchers, getVoucherList }) {
	const [ selected, setSelected ] = useState([]);
	function handleCheck (e) {
		const newList = selected.filter(i => i !== e.target.value);
		setSelected(newList);
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
	return (
		<div>
			<Box title={I18n.t('Renew')}>
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
				<button class="button green block button-one" onClick={renewVouchers}>
					{I18n.t('Renovar')}
				</button>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Cancelar')}
				</button>
			</div>
		</div>
	);
}

export const mapStateToProps = state => ({
	loading: loading(state),
	vouchers: vouchers(state)
});

export const mapDispatchToProps = dispatch => ({
	getVoucherList: bindActionCreators(getVoucherList, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Renew);
