import { h } from "preact";
import { useState } from "preact/hooks";
import { Trans } from '@lingui/macro';
import { useAddVoucher } from "../piraniaQueries";
import CreateVoucherForm from "../components/createVoucherForm";
import CreateVoucherConfirm from "../components/createVoucherConfirm";
import ConfigPageLayout from 'plugins/lime-plugin-node-admin/src/layouts/configPageLayout';

const CreateVoucher = () => {
	const [createdVouchers, setCreatedVouchers] = useState(null);
	const [addVoucher, {isLoading:isSubmitting, isSuccess, isError }] = useAddVoucher();
	const submitVoucher = async (formData) => {
		const finalData = {
			...formData,
			qty: parseInt(formData.qty),
			duration_m: (
				formData.permanent ?
					null : parseInt(formData.duration_m) * 24 * 60
			),
			activation_deadline: (
				formData.with_activation_deadline === false ?
					null : formData.activation_deadline
			)
		};
		delete finalData.permanent;
		delete finalData.with_activation_deadline;
		const vouchers = await addVoucher(finalData);
		setCreatedVouchers(vouchers);
	};

	if (createdVouchers) {
		return <CreateVoucherConfirm vouchers={createdVouchers} />
	};

	return (
		<ConfigPageLayout {...{
			isSuccess, isError,
			title: <Trans>Create Voucher</Trans>,
			backUrl: '/access'
		}}>
			<CreateVoucherForm submitVoucher={submitVoucher} isSubmitting={isSubmitting} />
		</ConfigPageLayout >
	)
};

export default CreateVoucher;
