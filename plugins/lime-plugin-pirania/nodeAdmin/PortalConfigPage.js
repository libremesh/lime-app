import { Trans } from "@lingui/macro";
import ConfigPageLayout from "plugins/lime-plugin-node-admin/src/layouts/configPageLayout";
import { Fragment } from "preact";
import { route } from "preact-router";
import { useForm } from "react-hook-form";

import Loading from "components/loading";
import switchStyle from "components/switch";

import { usePortalConfig, useSetPortalConfig } from "../src/piraniaQueries";

const PortalConfigForm = ({ config, onSubmit, isSubmitting }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: config,
    });

    const routeToEditor = (e) => {
        e.preventDefault();
        route("/access/wellcomescreen");
    };

    const routeToVouchers = (e) => {
        e.preventDefault();
        route("/access");
    };

    return (
        <Fragment>
            <form class="flex-grow-1">
                <p>
                    <Trans>
                        The Community Portal enables a welcome screen to be
                        displayed in the web browser to anyone connecting to the
                        network using the Community AP
                    </Trans>
                </p>
                <div class={switchStyle.toggles}>
                    <input
                        type="checkbox"
                        name="activated"
                        id="activated"
                        ref={register()}
                    />
                    <label htmlFor="activated">
                        <Trans>Enable Portal in Community AP</Trans>
                    </label>
                </div>
                <p>
                    <a href="#" onClick={routeToEditor}>
                        <Trans>Edit wellcome screen</Trans>{" "}
                    </a>
                </p>
                <h4>
                    <Trans>Access vouchers</Trans>
                </h4>
                <p>
                    <Trans>
                        Vouchers can be used to limit access through the
                        Community Portal to those who have an authorization code
                    </Trans>
                </p>
                <div class={switchStyle.toggles}>
                    <input
                        type="checkbox"
                        name="with_vouchers"
                        id="with_vouchers"
                        ref={register()}
                    />
                    <label htmlFor="with_vouchers">
                        <Trans>Use vouchers for access</Trans>
                    </label>
                </div>
                {config?.with_vouchers && (
                    <p>
                        <a href="#" onClick={routeToVouchers}>
                            <Trans>Manage Vouchers</Trans>
                        </a>
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

export const PortalConfigPage = () => {
    const { data: config, isLoading } = usePortalConfig();
    const [setPortalConfig, { isLoading: isSubmitting, isSuccess, isError }] =
        useSetPortalConfig();

    return (
        <ConfigPageLayout
            {...{
                isLoading,
                isSuccess,
                isError,
                title: <Trans>Community Portal</Trans>,
            }}
        >
            <PortalConfigForm
                {...{ config, onSubmit: setPortalConfig, isSubmitting }}
            />
        </ConfigPageLayout>
    );
};
