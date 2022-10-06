
import { useState } from "preact/hooks";
import { Trans } from '@lingui/macro';
import { useAddVoucher } from "../piraniaQueries";
import CreateVoucherForm from "../components/createVoucherForm";
import PostCreate from "./postCreate";
import ConfigPageLayout from 'plugins/lime-plugin-node-admin/src/layouts/configPageLayout';
import { dateToLocalUnixTimestamp } from 'utils/time';

const CreateVoucher = () => {
	const [createdVouchers, setCreatedVouchers] = useState(null);
	const [addVoucher, { isLoading: isSubmitting, isSuccess, isError }] = useAddVoucher();
	const submitVoucher = async (formData) => {
		let deadline = null;

		if (formData.with_activation_deadline) {
			deadline = dateToLocalUnixTimestamp(
				formData.activation_deadline, '23:59'
			);
		}

		const finalData = {
			...formData,
			qty: parseInt(formData.qty, 10),
			duration_m: (
				formData.permanent ?
					null : parseInt(formData.duration_m, 10) * 24 * 60
			),
			activation_deadline: deadline
		};
		delete finalData.permanent;
		delete finalData.with_activation_deadline;
		const vouchers = await addVoucher(finalData);
		setCreatedVouchers(vouchers);
	};

	if (createdVouchers) {
		return <PostCreate vouchers={createdVouchers} />
	}

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
