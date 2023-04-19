import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { useForm } from "react-hook-form";

import Loading from "components/loading";
import switchStyle from "components/switch";

import ConfigPageLayout from "../layouts/configPageLayout";
import { useSetupRoamingAP, useWifiData } from "../nodeAdminQueries";

const RoamingAPForm = ({ wifiData, onSubmit, isSubmitting }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { enableRoamingAP: wifiData.community_ap.enabled },
    });
    return (
        <Fragment>
            <form class="flex-grow-1">
                <div class={switchStyle.toggles}>
                    <input
                        type="checkbox"
                        id="enableRoamingAP"
                        {...register("enableRoamingAP")}
                    />
                    <label htmlFor="enableRoamingAP">
                        <Trans>Enable Community Roaming AP</Trans>
                    </label>
                </div>
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

const RoamingAPPage = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const {
        mutate: setupRoamingAP,
        isLoading: isSubmitting,
        isSuccess,
        isError,
    } = useSetupRoamingAP();
    const apSsid = wifiData?.community_ap?.ssid;
    const communityName = wifiData?.community_ap.ssid;

    function onSubmit({ enableRoamingAP }) {
        return setupRoamingAP({ enabled: enableRoamingAP });
    }

    return (
        <ConfigPageLayout
            {...{
                isLoading,
                isSuccess,
                isError,
                title: <Trans>Community Roaming AP</Trans>,
            }}
        >
            <p>
                <Trans>Opens the "{apSsid}" AP in this node</Trans>
            </p>
            <p>
                <Trans>
                    The Community AP is present in every node allowing people to
                    move around the network territory without losing connection
                </Trans>
            </p>
            {wifiData?.community_ap?.community.enabled === false && (
                <p>
                    <Trans>It is disabled by default in {communityName}</Trans>
                </p>
            )}
            {wifiData?.community_ap?.community.enabled === true && (
                <p>
                    <Trans>It is enabled by default in {communityName}</Trans>
                </p>
            )}
            <RoamingAPForm {...{ wifiData, onSubmit, isSubmitting }} />
        </ConfigPageLayout>
    );
};

export default RoamingAPPage;
