import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { useForm } from 'react-hook-form';
import { usePortalConfig, useSetPortalConfig } from '../src/piraniaQueries';
import ConfigPageLayout from 'plugins/lime-plugin-node-admin/src/layouts/configPageLayout';
import Loading from 'components/loading';
import switchStyle from 'components/switch';
import { Trans } from '@lingui/macro';

const PortalConfigForm = ({ config, onSubmit, isSubmitting }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: config
    });

    const routeToEditor = (e) => {
        e.preventDefault();
        route('/access/wellcomescreen');
    }

    return (
        <Fragment>
            <form class="flex-grow-1">
                <p>
                    <Trans>
                        The Community Portal enables a welcome screen
                        to be displayed in the web browser to
                        anyone connecting to the network using the
                        Community AP
                    </Trans>
                </p>
                <div class={switchStyle.toggles}>
                    <input type="checkbox"
                        name="activated"
                        id="activated"
                        ref={register()}
                    />
                    <label htmlFor="activated"><Trans>Activate Portal in Community AP</Trans></label>
                </div>
                <p>
                    <a href="#" onClick={routeToEditor}><Trans>Edit wellcome screen</Trans> </a>
                </p>
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {!isSubmitting &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" >
                            <Trans>Save</Trans>
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
            title: <Trans>Community Portal</Trans>
        }}>
            <PortalConfigForm {...{ config, onSubmit: setPortalConfig, isSubmitting }} />
        </ConfigPageLayout >
    )
}
