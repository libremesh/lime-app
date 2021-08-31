import { h, Fragment } from 'preact';
import { useForm, Controller } from 'react-hook-form';
import { useAdminWifiData, useChangeAPPassword } from '../nodeAdminQueries';
import ConfigPageLayout from '../layouts/configPageLayout';
import Loading from 'components/loading';
import switchStyle from 'components/switch';
import I18n from 'i18n-js';

const APPasswordPageForm = ({ wifiData, onSubmit, isSubmitting }) => {
    const { node_ap: { password, has_password } } = wifiData;
    const { register, handleSubmit, errors, watch } = useForm({
        defaultValues: { password, enablePassword: has_password }
    });
    const enablePassword = watch("enablePassword");

    function isValidPassword(password) {
        return !enablePassword || (password && password.length > 7);
    }

    return (
        <Fragment>
            <form class="flex-grow-1">
                <div class={switchStyle.toggles}>
                    <input type="checkbox"
                        name="enablePassword"
                        id="enablePassword"
                        ref={register()}
                    />
                    <label htmlFor="enablePassword">{I18n.t("Enable Password")}</label>
                </div>
                <label class="d-none" htmlFor="password">{I18n.t("Wifi Password")}</label>
                <input type="text" name="password" id="password"
                    ref={register({
                        validate: isValidPassword
                    })}
                    class={`w-100 ${!enablePassword && 'd-none'}`} />
                {errors && errors.password &&
                    <p class="text-danger">
                        {I18n.t('The password should have at least 8 characters')}
                    </p>
                }
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" >
                            {I18n.t("Save")}
                        </button>
                    }
                    {isSubmitting &&
                        <Loading />
                    }
                </div>
            </div>
        </Fragment>
    )
}

const APPasswordPage = () => {
    const { data: wifiData, isLoading } = useAdminWifiData();
    const [changeApNamePassword, { isLoading: isSubmitting, isSuccess, isError }] = useChangeAPPassword();
    function onSubmit({ password, enablePassword }) {
        return changeApNamePassword({
            password: enablePassword ? password: "",
            enablePassword
        });
    };

    return (
        <ConfigPageLayout {...{
            isLoading, isSuccess, isError,
            title: I18n.t("Wifi Password")
        }}>
            <APPasswordPageForm {...{wifiData, onSubmit, isSubmitting}} />
        </ConfigPageLayout >
    )
}

export default APPasswordPage;
