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
        defaultValues: { enableRoamingAP: wifiData.community_ap.enabled }
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
                    <label htmlFor="enableRoamingAP">{I18n.t("Enable Community Roaming AP")}</label>
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
            isLoading, isSuccess, isError,
            title: I18n.t("Community Roaming AP")
        }}>
            <p>{I18n.t('Opens the "%{ap_ssid}" AP in this node', { ap_ssid: wifiData?.community_ap?.ssid })}</p>
            <p>{I18n.t("This AP is the same in all nodes that enable it, allowing devices to move around the network territory without losing connection")}</p>
            {wifiData?.community_ap?.community.enabled === false &&
                <p>{I18n.t("It is disabled by default in %{communityName}", { communityName })}</p>
            }
            {wifiData?.community_ap?.community.enabled === true &&
                <p>{I18n.t("It is enabled by default in %{communityName}", { communityName })}</p>
            }
            <RoamingAPForm {...{ wifiData, onSubmit, isSubmitting}} />
        </ConfigPageLayout >
    )
}

export default RoamingAPPage;
