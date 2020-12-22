/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVoucherList, removeVoucher } from '../piraniaActions';
import { vouchers, loading } from '../piraniaSelectors';
import Loading from '../../../../src/components/loading';
import { Box } from '../../../../src/components/box';
import { Trash } from '../../../../src/components/icons';
import daysLeft from '../../../../src/utils/daysLeft';

import I18n from 'i18n-js';

export function mergeTypes(voucher, flatList) {
	const { type, node } = voucher;
	if (flatList[type][node]) {
		flatList[type][node].push(voucher);
	}
	else {
		flatList[type][node] = [voucher];
	}
}

function getTitletype(type) {
	switch (type) {
		case 'member':
			return I18n.t('Members');
		case 'visitor':
			return I18n.t('Visitors');
		case 'invalid':
			return I18n.t('Invalid vouchers');
		default:
			return '';
	}
}

const boxStyle = {
	margin: '3px',
	padding: '10px',
	background: '#f5f5ff',
	textAlign: 'center',
	transition: 'height 04s ease',
	overflow: 'hidden',
	height: 'auto',
	marginBottom: 50
};

const VoucherNodeBox = ({ node, list, removeVoucher }) => (
	<div style={{ marginBottom: 50 }}>
		<h4 style={boxStyle}>{node}</h4>
		{list
			.sort((a, b) => daysLeft(b.expires) - daysLeft(a.expires))
			.sort((a, b) => b.macs.length - a.macs.length)
			.map(voucher => {
				const invalid = voucher.type === 'invalid';
				const used = voucher.macs.length > 0;
				return (
					<div key={voucher.voucher} className="voucher">
						<span style={{ width: '30%' }}>{voucher.note}</span>
						<span style={{ width: '30%', textDecoration: used ? 'line-through' : 'none' }}>{voucher.voucher}</span>
						{!invalid && (
							<span style={{ width: '30%' }}>
								<span style={{ paddingRight: 15 }}>
									{I18n.t('%{daysLeft} days left', { daysLeft: daysLeft(voucher.expires) })}
								</span>
								<Trash size={15} onClick={() => removeVoucher(voucher.voucher)} />
							</span>
						)}
						{invalid && <span>{I18n.t('expired')}</span>}
					</div>
				);
			})}
	</div>
);

const VoucherTypeBox = ({ type, list, removeVoucher }) => (
	<Box title={getTitletype(type)} collapse collapsed={type === 'invalid'}>
		{Object.keys(list).map(node => (
			<VoucherNodeBox key={node} node={node} list={list[node]} removeVoucher={removeVoucher} />
		))}
	</Box>
);

export const ListPiraniaPage = ({ goBack, getVoucherList, removeVoucher, vouchers, loading }) => {
	useEffect(() => {
		if (!vouchers) {
			getVoucherList();
		}
		return () => { };
	}, []);
	function handleRemoveVoucher(voucher) {
		removeVoucher({
			voucher
		});
	}
	let flatList = {
		member: {},
		visitor: {},
		invalid: {}
	};
	if (vouchers && !loading) {
		vouchers.forEach(voucher => mergeTypes(voucher, flatList));
	}
	return (
		<div>
			<button class="button green block button-one" onClick={goBack}>
				{I18n.t('Go back')}
			</button>
			<button disabled={loading} class="button green block" onClick={getVoucherList}>
				{I18n.t('Refresh')}
			</button>
			<div>
				{Object.keys(flatList).map(type => (
					<VoucherTypeBox key={type} type={type} list={flatList[type]} removeVoucher={handleRemoveVoucher} />
				))}
				{loading && <Loading />}
			</div>
			<button class="button green block" onClick={goBack}>
				{I18n.t('Go back')}
			</button>
		</div>
	);
};
export const mapStateToProps = state => ({
	loading: loading(state),
	vouchers: vouchers(state)
});

export const mapDispatchToProps = dispatch => ({
	getVoucherList: bindActionCreators(getVoucherList, dispatch),
	removeVoucher: bindActionCreators(removeVoucher, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ListPiraniaPage);
