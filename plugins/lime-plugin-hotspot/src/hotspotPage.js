import { h, Fragment } from 'preact';
import { useForm } from 'react-hook-form';
import { useToggleHotspot, useHotspotData } from './hotspotQueries';
import {
    ConnectionToThePhone,
    ConnectionToTheInternet
} from './components/testBoxes';
import Loading from 'components/loading';
import { Collapsible } from 'components/collapsible';
import switchStyle from 'components/switch';
import I18n from 'i18n-js';

const HotspotPageForm = ({ hotspotData, onSubmit, isSubmitting }) => {
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

const HotspotPage = () => {
    const { data: hotspotData, isLoading } = useHotspotData();
    const [toggle, { isSuccess, isError, isSubmitting }] = useToggleHotspot();

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
            <div class="mt-1"><HotspotPageForm {...{ hotspotData, onSubmit, isSubmitting }} /></div>
            {hotspotData?.enabled && 
                <div>
                    <div class="mt-1"><ConnectionToThePhone /></div>
                    <div class="mt-1"><ConnectionToTheInternet /></div>
                </div>
            }
        </div>
    )
}

export default HotspotPage;
