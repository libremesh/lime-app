import { h, Fragment } from 'preact';
import { useForm } from 'react-hook-form';
import { useToggleHotspot, useHotspotData } from './hotspotQueries';
import {
    ConnectionToThePhone,
    ConnectionToTheInternet
} from './components/testBoxes';
import ConfigPageLayout from '../../../layouts/configPageLayout';
import { useEffect } from "preact/hooks";
import Loading from 'components/loading';
import { Collapsible } from 'components/collapsible';
import switchStyle from 'components/switch';
import { Trans } from '@lingui/macro';

const HotspotPageForm = ({ hotspotData, onSubmit, isSubmitting, waitingRadioReset }) => {
    const { enabled } = hotspotData;
    const { register, handleSubmit } = useForm({
        defaultValues: { enabled }
    });
    return (
        <Fragment>
            <form class="flex-grow-1">
                <div class={switchStyle.toggles}>
                    <input type="checkbox"
                        name="enabled"
                        id="enabled"
                        ref={register()}
                    />
                    <label htmlFor="enabled">
                        <Trans>Connect to a Mobile Hotspot</Trans>
                    </label>
                </div>
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {(!isSubmitting && !waitingRadioReset) &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" >
                            <Trans>Save</Trans>
                        </button>
                    }
                    {(isSubmitting || waitingRadioReset) &&
                        <Loading />
                    }
                </div>
            </div>
        </Fragment>
    )
}

const CellPhoneInstructions = () => {
    const ssid = 'internet';
    const password = 'internet';
    const encryptionMethod = 'WPA2 PSK';
    return (
        <div>
            <ol>
                <li>
                    <Trans>
                        Get an additional cell phone to the one you are currently using
                        that has a mobile data connection
                    </Trans>
                </li>
                <li>
                    <Trans>
                        With this second cell phone create an access point or hotspot
                        with this data:
                    </Trans>
                </li>
            </ol>
            <div class='container-center'>
                <div><b><Trans>Network Name: {ssid}</Trans></b></div>
                <div><b><Trans>Password: {password}</Trans></b></div>
                <div><b><Trans>Encryption: {encryptionMethod}</Trans></b></div>
            </div>
        </div>
    );
};

const WaitingRadioResetMessage = () => (
    <div class="d-flex flex-column text-right">
        <div><Trans>The radio needs to be restarted...</Trans></div>
        <div><Trans>Please stay connected to the wifi network</Trans></div>
    </div>
);

const SubmitError = ({ error }) => (
    <div>
        {error && error === 'hotspot ap not found' &&
            <span class="text-danger">
                <Trans>
                    The hotspot couldn’t be found,
                    please review the instructions above.
                </Trans>
            </span>
        }
        {error && error === 'radio has mesh ifaces' &&
            <span class="text-danger">
                <Trans>
                    Cannot use Radio 0, it's being used for mesh links
                </Trans>
            </span>
        }
    </div>
)
const HotspotPage_ = ({ submitError, hotspotData, onSubmit, isSubmitting, waitingRadioReset }) => (
    <div class='d-flex flex-column container container-padded'>
        <p>
            <Trans>
                Share your mobile connection by connecting
                the node to a mobile hotspost
            </Trans>
        </p>
        <Collapsible initCollapsed={true} title={<Trans>Cellphone Instructions</Trans>}>
            <CellPhoneInstructions />
        </Collapsible>
        {submitError && <SubmitError error={submitError} />}
        <div class="mt-1"><HotspotPageForm {...{ hotspotData, onSubmit, isSubmitting, waitingRadioReset }} /></div>
        {waitingRadioReset && <WaitingRadioResetMessage />}
        {hotspotData?.enabled && !waitingRadioReset &&
            <div>
                <div class="mt-1"><ConnectionToThePhone /></div>
                <div class="mt-1"><ConnectionToTheInternet /></div>
            </div>
        }
    </div>
)

const HotspotPage = () => {
    const { data: hotspotData, isLoading, refetch } = useHotspotData();
    const [toggle, { error: submitError, isError, isLoading: isSubmitting, isSuccess }] = useToggleHotspot();
    const waitingRadioReset = hotspotData?.waitingForRadioReset;

    useEffect(() => {
        if (waitingRadioReset) {
            setTimeout(() => {
                refetch();
            }, 10000);
        }
    }, [waitingRadioReset])

    function onSubmit({ enabled }) {
        return toggle(enabled);
    };

    return (
        <ConfigPageLayout {...{
            isLoading, isSuccess, isError,
            title: <Trans>Connect to a Mobile Hotspot</Trans>
        }}>
            <HotspotPage_ {...{ submitError, hotspotData, onSubmit, isSubmitting, waitingRadioReset }} />
        </ConfigPageLayout >
    )
}
export default HotspotPage;
