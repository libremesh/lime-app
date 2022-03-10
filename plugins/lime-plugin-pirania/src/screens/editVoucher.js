import { h, Fragment } from "preact";
import { Trans } from '@lingui/macro';
import Loading from "components/loading";
import { useListVouchers, useRename } from "../piraniaQueries";
import { RequiredErrorMsg, MaxLengthMsg, MaxLengthErrorMsg } from "components/form";
import { ConfigPageLayout } from 'plugins/lime-plugin-node-admin/src/layouts';
import { useForm } from 'react-hook-form';

const EditVoucherForm = ({ name, submitVoucher, isSubmitting }) => {
	const { register, handleSubmit, errors } = useForm({
		defaultValues: { name },
	});
	return (
		<Fragment>
			<form class="flex-grow-1">
				<label for="name"><Trans>Description</Trans></label>
				<span><MaxLengthMsg length={100} /></span>
				<textarea id="name" name="name"
					ref={register({ required: true, maxLength: 100 })} class="w-100"
				/>
				{errors.name?.type === 'required' && <RequiredErrorMsg />}
				{errors.name?.type === 'maxLength' && <MaxLengthErrorMsg length={100} />}
			</form>
			<div class="d-flex">
				<div class="ml-auto">
					{!isSubmitting &&
						<button onClick={handleSubmit(submitVoucher)} class="ml-auto" >
							<Trans>Save</Trans>
						</button>
					}
					{isSubmitting &&
						<Loading />
					}
				</div>
			</div>
		</Fragment>
	);
};

const EditVoucher = ({ id }) => {
	const [renameVoucher,
		{ isLoading: isSubmitting, isSuccess, isError }
	] = useRename();
	const { data: vouchers, isLoading } = useListVouchers();
	const voucher = vouchers && (
		vouchers.filter((v) => v.id === id)[0]
	);

	const submitVoucher = async ({ name }) => {
		return renameVoucher({
			id: voucher.id,
			name
		});
	};

	return (
		<ConfigPageLayout {...{
			isLoading,
			isSuccess,
			isError,
			title: <Trans>Edit Voucher</Trans>,
			backUrl: `/access/view/${id}`
		}}>
			<EditVoucherForm name={voucher?.name}
				submitVoucher={submitVoucher}
				isSubmitting={isSubmitting} />
		</ConfigPageLayout >
	);
};

export default EditVoucher;
