import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { useForm } from "react-hook-form";

import {
    MaxLengthErrorMsg,
    MaxLengthMsg,
    RequiredErrorMsg,
} from "components/form";
import Loading from "components/loading";
import switchStyle from "components/switch";

type CreateVoucherFormProps = {
    submitVoucher: () => void;
    isSubmitting: boolean;
}

type VoucherForm = {
    name: string;
    duration_m: number;
    qty: number;
    activation_deadline: string;
    permanent: boolean;
    with_activation_deadline: boolean;
}

const minDate = new Date().toISOString().substring(0, 10);

const CreateVoucherForm = ({ submitVoucher, isSubmitting }: CreateVoucherFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<VoucherForm>({
        defaultValues: {
            duration_m: 1,
            qty: 1,
            activation_deadline: minDate,
        },
    });
    const isPermanent = watch("permanent");
    const withActivationDeadline = watch("with_activation_deadline");

    return (
        <Fragment>
            <form className="flex-grow-1">
                <label htmlFor="name">
                    <Trans>Voucher group description</Trans>
                </label>
                <span>
                    <MaxLengthMsg length={100} />
                </span>
                <textarea
                    id="name"
                    {...register("name", { required: true, maxLength: 100 })}
                    className="w-100"
                />
                {errors.name?.type === "required" && <RequiredErrorMsg />}
                {errors.name?.type === "maxLength" && (
                    <MaxLengthErrorMsg length={100} />
                )}
                <div className={switchStyle.toggles}>
                    <input
                        type="checkbox"
                        id="permanent"
                        {...register("permanent")}
                        className="w-100"
                    />
                    <label htmlFor="permanent">
                        <Trans>Is permanent</Trans>
                    </label>
                </div>
                <label
                    style={{ opacity: isPermanent ? 0.3 : 1 }}
                    htmlFor="duration_m"
                >
                    <Trans>Voucher duration in days</Trans>
                </label>
                <input
                    type="number"
                    id="duration_m"
                    disabled={!!isPermanent}
                    {...register("duration_m")}
                    className="w-100"
                    min={1}
                />
                <label htmlFor="quantity">
                    <Trans>Number of vouchers</Trans>
                </label>
                <input
                    type="number"
                    id="quantity"
                    {...register("qty")}
                    className="w-100"
                    min={1}
                    max={10}
                />
                <div className={switchStyle.toggles}>
                    <input
                        type="checkbox"
                        id="with_activation_deadline"
                        {...register("with_activation_deadline")}
                        className="w-100"
                    />
                    <label htmlFor="with_activation_deadline">
                        <Trans>Setup activation deadline</Trans>
                    </label>
                </div>
                <label htmlFor="activation_deadline">
                    <Trans>Activation deadline</Trans>
                </label>
                <input
                    type="date"
                    id="activation_deadline"
                    {...register("activation_deadline")}
                    className="w-100"
                    disabled={!withActivationDeadline}
                    min={minDate}
                />
            </form>
            <div className="d-flex">
                <div className="ml-auto">
                    {!isSubmitting && (
                        <button
                            onClick={handleSubmit(submitVoucher)}
                            className="ml-auto"
                        >
                            <Trans>Create</Trans>
                        </button>
                    )}
                    {isSubmitting && <Loading />}
                </div>
            </div>
        </Fragment>
    );
};

export default CreateVoucherForm;
