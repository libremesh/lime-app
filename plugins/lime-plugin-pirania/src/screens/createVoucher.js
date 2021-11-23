import { h } from "preact";
import { useState } from "preact/hooks";
import { Trans } from '@lingui/macro';
import { useAddVoucher } from "../piraniaQueries";
import GoBack from "../components/goBack";
import CreateVoucherForm from "../components/createVoucherForm";
import CreateVoucherConfirm from "../components/createVoucherConfirm";
import style from "../style.less";

const CreateVoucher = () => {
	const [createdVouchers, setCreatedVouchers] = useState(null);
	const [addVoucher] = useAddVoucher();
	const submitVoucher = async (e, input) => {
		e.preventDefault();
		const vouchers = await addVoucher(input);
		setCreatedVouchers(vouchers);
	};
	return (
		<div class="container container-padded">
			<div class={style.goBackTitle}>
				<GoBack url="/access/" />
				<h1><Trans>create voucher</Trans></h1>
			</div>
			{!createdVouchers && <CreateVoucherForm submitVoucher={submitVoucher} />}
			{createdVouchers && <CreateVoucherConfirm vouchers={createdVouchers} />}
		</div>
	);
};

export default CreateVoucher;