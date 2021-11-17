import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { useForm } from 'react-hook-form';
import { usePortalConfig, useSetPortalConfig } from '../src/piraniaQueries';
import ConfigPageLayout from 'plugins/lime-plugin-node-admin/src/layouts/configPageLayout';
import Loading from 'components/loading';
import switchStyle from 'components/switch';
import I18n from 'i18n-js';

const PortalConfigForm = ({ config, onSubmit, isSubmitting }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: config
    });
    return (
        <Fragment>
            <form class="flex-grow-1">
                <p>{I18n.t(
                    'The Community Portal enables a welcome screen ' +
                    'to be displayed in the web browser to ' +
                    'anyone connecting to the network using the  ' +
                    'Community AP')}</p>
                <div class={switchStyle.toggles}>
                    <input type="checkbox"
                        name="activated"
                        id="activated"
                        ref={register()}
                    />
                    <label htmlFor="activated">{I18n.t("Activate Portal in Community AP")}</label>
                </div>
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

export const PortalConfigPage = () => {
    const { data: config, isLoading } = usePortalConfig();
    const [setPortalConfig, { isLoading: isSubmitting, isSuccess, isError }] = useSetPortalConfig();

    return (
        <ConfigPageLayout {...{
            isLoading, isSuccess, isError,
            title: I18n.t("Community Portal")
        }}>
            <PortalConfigForm {...{ config, onSubmit: setPortalConfig, isSubmitting }} />
        </ConfigPageLayout >
    )
}
