import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVoucherList } from '../piraniaActions';
import { vouchers, loading } from '../piraniaSelectors';
import Loading from '../../../../src/components/loading';
import { Box } from '../../../../src/components/box';

import style from '../style';
import I18n from 'i18n-js';

const boxStyle = {
	margin: '3px',
	padding: '10px',
	background: '#f5f5ff',
	textAlign: 'center',
	transition: 'height 04s ease',
	overflow: 'hidden',
	height: 'auto',
	textAlign: 'center',
	marginBottom: 50
}

const daysBetween = ( date1, date2 ) => {   //Get 1 day in milliseconds   
  var one_day=1000*60*60*24    // Convert both dates to milliseconds
  var date1_ms = date1.getTime()   
  var date2_ms = date2.getTime()    // Calculate the difference in milliseconds  
  var difference_ms = date2_ms - date1_ms        // Convert back to days and return   
  return Math.round(difference_ms/one_day) 
} 
  

const VoucherNodeBox = ({node, list}) => (
	<div style={{ marginBottom: 50 }}>
		<h4 style={boxStyle}>{node}</h4>
		{list.map(voucher => {
			const date = new Date (parseInt(voucher.expires))
			const dateDiff = daysBetween(new Date(), date)
			const invalid = voucher.type === 'invalid'
			return (
				<div key={voucher.voucher} className="voucher">
					<span>{voucher.name}</span>
					<span>{voucher.voucher}</span>
					{!invalid && <span>{dateDiff} {I18n.t('days left')}</span>}
					{invalid && <span>{I18n.t('expired')}</span>}
				</div>
			)
		})}
	</div>
)

const VoucherTypeBox = ({type, list}) => {
	return (
		<Box title={type}>
			{Object.keys(list).map(node => <VoucherNodeBox key={node} node={node} list={list[node]} />)}
		</Box>
	)
}

const List = ({ goBack, getVoucherList, vouchers , loading }) => {
	useEffect(() => {
		getVoucherList();
		return () => {};
	}, []);
	if (loading) return <Loading />
	else if (vouchers) {
		let flatList = {
			member: {},
			visitor: {},
			invalid: {},
		}
		function mergeTypes (voucher) {
			const { type, node } = voucher
			if (flatList[type][node]) {
				flatList[type][node].push(voucher)
			} else {
				flatList[type][node] = [voucher]
			}
		}

		vouchers.forEach(voucher => mergeTypes(voucher))
		return (
			<div>
				<div>
					{Object.keys(flatList).map(type => <VoucherTypeBox key={type} type={type} list={flatList[type]} />)}
				</div>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Go back')}
				</button>
			</div>
		);	
	}
}
export const mapStateToProps = state => ({
	loading: loading(state),
	vouchers: vouchers(state)
});

export const mapDispatchToProps = dispatch => ({
	getVoucherList: bindActionCreators(getVoucherList, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(List);