import { h, Fragment } from "preact";
import { useForm } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import switchStyle from 'components/switch';
import Loading from "components/loading";
import { RequiredErrorMsg, MaxLengthMsg, MaxLengthErrorMsg } from "components/form";
const minDate = (new Date()).toISOString().substring(0, 10);

const CreateVoucherForm = ({ submitVoucher, isSubmitting }) => {
	const { register, handleSubmit, errors, watch } = useForm({
		defaultValues: {
			duration_m: 1,
			qty: 1,
			activation_deadline: minDate
		}
	});
	const isPermanent = watch('permanent');
	const withActivationDeadline = watch('with_activation_deadline');

	return (
		<Fragment>
			<form class="flex-grow-1">
				<label for="name"><Trans>Voucher group description</Trans></label>
				<span><MaxLengthMsg length={100} /></span>
				<textarea id="name" name="name"
					ref={register({ required: true, maxLength:100 })} class="w-100"
				/>
				{errors.name?.type === 'required' && <RequiredErrorMsg />}
				{errors.name?.type === 'maxLength' && <MaxLengthErrorMsg length={100} />}
				<div class={switchStyle.toggles}>
					<input type="checkbox" id="permanent" name="permanent"
						ref={register} class="w-100"
					/>
					<label for="permanent"><Trans>Is permanent</Trans></label>
				</div>
				<label style={{ opacity: isPermanent ? 0.3 : 1 }} for="duration_m">
					<Trans>Voucher duration in days</Trans>
				</label>
				<input type="number" id="duration_m" name="duration_m"
					disabled={isPermanent}
					ref={register} class="w-100"
					min={1}
				/>
				<label for="quantity"><Trans>Number of vouchers</Trans></label>
				<input type="number" id="quantity" name="qty"
					ref={register} class="w-100"
					min={1} max={10}
				/>
				<div class={switchStyle.toggles}>
					<input type="checkbox" id="with_activation_deadline"
						name="with_activation_deadline"
						ref={register} class="w-100"
					/>
					<label for="with_activation_deadline"><Trans>Setup activation deadline</Trans></label>
				</div>
				<label for="activation_deadline"><Trans>Activation Deadline</Trans></label>
				<input type="date" id="activation_deadline" name="activation_deadline"
					ref={register} class="w-100"
					disabled={!withActivationDeadline}
					min={minDate}
				/>
			</form>
			<div class="d-flex">
				<div class="ml-auto">
					{!isSubmitting &&
						<button onClick={handleSubmit(submitVoucher)} class="ml-auto" >
							<Trans>Create</Trans>
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

export default CreateVoucherForm;
