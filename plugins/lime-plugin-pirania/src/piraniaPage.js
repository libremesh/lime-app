import { h } from 'preact';
import { VoucherTablePage } from './voucherTablePage/voucherTablePage';
import { useListVouchers } from './piraniaQueries';
import { Loading } from 'components/loading';

const PiraniaPage = ({}) => {
	const { data: voucherList, isLoading } = useListVouchers();
	if (isLoading) {
		return (
			<div class="container container-center">
				<Loading />
			</div>)
	}
	if (voucherList && voucherList.vouchers.length > 0) {
	return <VoucherTablePage list={voucherList.vouchers} />
	}
	
	return <div />
}

export default PiraniaPage;
