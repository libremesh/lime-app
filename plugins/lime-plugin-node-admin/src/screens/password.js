import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { useForm } from "react-hook-form";

import Loading from "components/loading";
import switchStyle from "components/switch";

import ConfigPageLayout from "../layouts/configPageLayout";
import { useAdminWifiData, useChangeAPPassword } from "../nodeAdminQueries";

const APPasswordPageForm = ({ wifiData, onSubmit, isSubmitting }) => {
    const {
        node_ap: { password, has_password },
    } = wifiData;
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: { password, enablePassword: has_password },
    });
    const enablePassword = watch("enablePassword");

    function isValidPassword(password) {
        return !enablePassword || (password && password.length > 7);
    }

    return (
        <Fragment>
            <form class="flex-grow-1">
                <div class={switchStyle.toggles}>
                    <input
                        type="checkbox"
                        name="enablePassword"
                        id="enablePassword"
                        {...register("enablePassword")}
                    />
                    <label htmlFor="enablePassword">
                        <Trans>Enable Password</Trans>
                    </label>
                </div>
                {enablePassword && (
                    <div>
                        <label htmlFor="password">
                            <Trans>Wifi Password</Trans>
                        </label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            {...register("password", {
                                validate: isValidPassword,
                            })}
                            class="w-100"
                        />
                    </div>
                )}
                {errors && errors.password && (
                    <p class="text-danger">
                        <Trans>
                            The password should have at least 8 characters
                        </Trans>
                    </p>
                )}
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting && (
                        <button
                            onClick={handleSubmit(onSubmit)}
                            class="ml-auto"
                        >
                            <Trans>Save</Trans>
                        </button>
                    )}
                    {isSubmitting && <Loading />}
                </div>
            </div>
        </Fragment>
    );
};

const APPasswordPage = () => {
    const { data: wifiData, isLoading } = useAdminWifiData();
    const {
        mutate: changeApNamePassword,
        isLoading: isSubmitting,
        isSuccess,
        isError,
    } = useChangeAPPassword();
    function onSubmit({ password, enablePassword }) {
        return changeApNamePassword({
            password: enablePassword ? password : "",
            enablePassword,
        });
    }

    return (
        <ConfigPageLayout
            {...{
                isLoading,
                isSuccess,
                isError,
                title: <Trans>Wifi Password</Trans>,
            }}
        >
            <APPasswordPageForm {...{ wifiData, onSubmit, isSubmitting }} />
        </ConfigPageLayout>
    );
};

export default APPasswordPage;
