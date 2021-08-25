import { h, Fragment } from 'preact';
import { useForm } from 'react-hook-form';
import { useToggleHotspot, useHotspotData } from './hotspotQueries';
import {
    ConnectionToThePhone,
    ConnectionToTheInternet
} from './components/testBoxes';
import { useEffect } from "preact/hooks";
import Loading from 'components/loading';
import { Collapsible } from 'components/collapsible';
import switchStyle from 'components/switch';
import I18n from 'i18n-js';

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
                        {I18n.t("Connect to a Mobile Hotspot")}
                    </label>
                </div>
            </form>
            <div class="d-flex">
                <div class="ml-auto">
                    {(!isSubmitting && !waitingRadioReset) &&
                        <button onClick={handleSubmit(onSubmit)} class="ml-auto" >
                            {I18n.t("Save")}
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

const CellPhoneInstructions = () => (
    <div>
        <ol>
            <li>{I18n.t('Get an additional cell phone to the one you are currently using' +
                ' that has a mobile data connection')}</li>
            <li>{I18n.t('With this second cell phone create an access point or hotspot' +
                ' with this data:')}
            </li>
        </ol>
        <div class='container-center'>
            <div><b>{I18n.t('Network Name: %{networkName}', { networkName: "internet" })}</b></div>
            <div><b>{I18n.t('Password: %{password}', { password: "internet" })}</b></div>
        </div>
    </div>
);

const WaitingRadioResetMessage = () => (
    <div class="d-flex flex-column text-right">
        <div>{I18n.t('The radio needs to be restarted...')}</div>
        <div>{I18n.t('Please stay connected to the wifi network')}</div>
    </div>
);

const SubmitError = ({ error }) => (
    <div>
        {error && error === 'hotspot ap not found' &&
            <span class="text-danger">
                {I18n.t("The hotspot couldn’t be found," +
                    " please review the instructions above.")}
            </span>
        }
        {error && error === 'radio has mesh ifaces' &&
            <span class="text-danger">
                {I18n.t("Cannot use Radio 0," +
                    " it's being used for mesh links")}
            </span>
        }
    </div>
)
const HotspotPage = () => {
    const { data: hotspotData, isLoading, refetch } = useHotspotData();
    const [toggle, { error, isLoading: isSubmitting }] = useToggleHotspot();
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

    if (isLoading) {
        return
    }

    return (
        <div class='d-flex flex-column container container-padded'>
            <p>{I18n.t('Share your mobile connection by connecting' +
                ' the node to a mobile hotspost')}</p>
            <Collapsible initCollapsed={true} title={I18n.t('Cellphone Instructions')}>
                <CellPhoneInstructions />
            </Collapsible>
            {error && <SubmitError error={error} />}
            <div class="mt-1"><HotspotPageForm {...{ hotspotData, onSubmit, isSubmitting, waitingRadioReset}} /></div>
            {waitingRadioReset && <WaitingRadioResetMessage />}
            {hotspotData?.enabled && !waitingRadioReset &&
                <div>
                    <div class="mt-1"><ConnectionToThePhone /></div>
                    <div class="mt-1"><ConnectionToTheInternet /></div>
                </div>
            }
        </div>
    )
}

export default HotspotPage;
