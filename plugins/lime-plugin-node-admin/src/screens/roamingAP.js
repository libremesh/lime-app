import { h, Fragment } from 'preact';
import { useForm } from 'react-hook-form';
import { useWifiData, useSetupRoamingAP } from '../nodeAdminQueries';
import ConfigPageLayout from '../layouts/configPageLayout';
import Loading from 'components/loading';
import switchStyle from 'components/switch';
import { Trans } from '@lingui/macro';

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
                    <label htmlFor="enableRoamingAP"><Trans>Enable Community Roaming AP</Trans></label>
                </div>
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

const RoamingAPPage = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const [setupRoamingAP, { isLoading: isSubmitting, isSuccess, isError }] = useSetupRoamingAP();
    const apSsid = wifiData?.community_ap?.ssid;
    const communityName = wifiData?.community_ap.ssid;

    function onSubmit({ enableRoamingAP }) {
        return setupRoamingAP({ enabled: enableRoamingAP });
    };

    return (
        <ConfigPageLayout {...{
            isLoading, isSuccess, isError,
<<<<<<< HEAD
            title: <Trans>Community Roaming AP</Trans>
        }}>
            <p><Trans>Opens the "{apSsid}" AP in this node</Trans></p>
            <p>
                <Trans>
                    The Community AP is present in every node allowing people to
                    move around the network territory without losing connection
                </Trans>
            </p>
            {wifiData?.community_ap?.community.enabled === false &&
                <p>
                    <Trans>It is disabled by default in {communityName}</Trans>
                </p>
=======
            title: I18n.t("Community Roaming AP")
        }}>
            <p>{I18n.t('Opens the "%{ap_ssid}" AP in this node', { ap_ssid: wifiData?.ap?.node.ssid })}</p>
            <p>{I18n.t("This AP is the same in all nodes that enable it, allowing devices to move around the network territory without losing connection")}</p>
            {wifiData?.ap?.community.enabled === false &&
                <p>{I18n.t("It is disabled by default in %{communityName}", { communityName })}</p>
>>>>>>> chore(node admin): change texts, and add stories
            }
            {wifiData?.community_ap?.community.enabled === true &&
                <p>
                    <Trans>It is enabled by default in {communityName}</Trans>
                </p>
            }
<<<<<<< HEAD
            <RoamingAPForm {...{ wifiData, onSubmit, isSubmitting }} />
=======
            <RoamingAPForm {...{ wifiData, onSubmit, isSubmitting}} />
>>>>>>> chore(node admin): change texts, and add stories
        </ConfigPageLayout >
    )
}

export default RoamingAPPage;
