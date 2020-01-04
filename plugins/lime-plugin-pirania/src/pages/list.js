import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVoucherList } from '../piraniaActions';
import { vouchers, loading } from '../piraniaSelectors';
import Loading from '../../../../src/components/loading';
import { Box } from '../../../../src/components/box';

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

const daysBetween = (date1, date2) => {
	//Get 1 day in milliseconds
	let oneDay = 1000 * 60 * 60 * 24; // Convert both dates to milliseconds
	let date1Ms = date1.getTime();
	let date2Ms = date2.getTime(); // Calculate the difference in milliseconds
	let differenceMs = date2Ms - date1Ms; // Convert back to days and return
	return Math.round(differenceMs / oneDay);
};

const VoucherNodeBox = ({ node, list }) => (
	<div style={{ marginBottom: 50 }}>
		<h4 style={boxStyle}>{node}</h4>
		{list
			.sort((a, b) => b.macs.length - a.macs.length)
			.map(voucher => {
				const date = new Date(parseInt(voucher.expires, 10));
				const dateDiff = daysBetween(new Date(), date);
				const invalid = voucher.type === 'invalid';
				const used = voucher.macs.length > 0
				return (
					<div key={voucher.voucher} className="voucher">
						<span>{voucher.note}</span>
						<span style={{ textDecoration: used ? 'line-through' : 'none' }}>{voucher.voucher}</span>
						{!invalid && (
							<span>
								{dateDiff} {I18n.t('days left')}
							</span>
						)}
						{invalid && <span>{I18n.t('expired')}</span>}
					</div>
				);
			})}
	</div>
);

const VoucherTypeBox = ({ type, list }) => (
	<Box title={getTitletype(type)} collapse collapsed={type === 'invalid'}>
		{Object.keys(list).map(node => (
			<VoucherNodeBox key={node} node={node} list={list[node]} />
		))}
	</Box>
);

const List = ({ goBack, getVoucherList, vouchers, loading }) => {
	useEffect(() => {
		getVoucherList();
		return () => { };
	}, []);
	if (loading) return <Loading />;
	else if (vouchers) {
		let flatList = {
			member: {},
			visitor: {},
			invalid: {}
		};
		vouchers.forEach(voucher => mergeTypes(voucher, flatList));
		return (
			<div>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Go back')}
				</button>
				<div>
					{Object.keys(flatList).map(type => (
						<VoucherTypeBox key={type} type={type} list={flatList[type]} />
					))}
				</div>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Go back')}
				</button>
			</div>
		);
	}
};
export const mapStateToProps = state => ({
	loading: loading(state),
	vouchers: vouchers(state)
});

export const mapDispatchToProps = dispatch => ({
	getVoucherList: bindActionCreators(getVoucherList, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
