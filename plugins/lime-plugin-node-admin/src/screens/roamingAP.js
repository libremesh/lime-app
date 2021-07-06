import { h, Fragment } from 'preact';
import { useForm } from 'react-hook-form';
import { useWifiData, useSetupRoamingAP } from '../nodeAdminQueries';
import ConfigPageLayout from '../layouts/configPageLayout';
import Loading from 'components/loading';
import switchStyle from 'components/switch';
import I18n from 'i18n-js';
import { useCommunityName } from 'utils/queries';

const RoamingAPForm = ({ wifiData, onSubmit, isSubmitting }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { enableRoamingAP: wifiData.ap.node.enabled }
    });
    return (
        <Fragment>
            <form class="flex-grow-1">
                <div class={switchStyle.toggles}>
                    <input type="checkbox"
                        name="enableRoamingAP"
                        id="enableRoamingAP"
                        ref={register()}
                    />
                    <label htmlFor="enableRoamingAP">{I18n.t("Enable Roaming AP")}</label>
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

const RoamingAPPage = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const { data: communityName } = useCommunityName();
    const [setupRoamingAP, { isLoading: isSubmitting, isSuccess, isError }] = useSetupRoamingAP();

    function onSubmit({ enableRoamingAP }) {
        return setupRoamingAP({ enabled: enableRoamingAP });
    };

    return (
        <ConfigPageLayout {...{
            isLoading,
            // isLoading, isSuccess, isError,
            title: I18n.t("Community Roaming AP")
        }}>
            <p>{I18n.t("Opens the %{ap_ssid} AP in this node", { ap_ssid: wifiData?.ap?.node.ssid })}</p>
            <p>{I18n.t("When enabled it allows devices to connect to any node as they move around the network territory.")}</p>
            {wifiData?.ap?.community.enabled === false &&
                <p>{I18n.t("It is disabled by default in %{communityName}", { communityName })}</p>
            }
            {wifiData?.ap?.community.enabled === true &&
                <p>{I18n.t("It is enabled by default in %{communityName}", { communityName })}</p>
            }
            {/* <RoamingAPForm {...{wifiData, onSubmit, isSubmitting}} /> */}
            <RoamingAPForm {...{ wifiData, onSubmit, isSubmitting:false}} />
        </ConfigPageLayout >
    )
}

export default RoamingAPPage;
