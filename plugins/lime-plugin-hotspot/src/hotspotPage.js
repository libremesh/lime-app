import { h, Fragment } from 'preact';
import style from './hotspotStyle.less';
import { useIsConnected, useEnableHotspot, useWaitForConnect, useWaitForInternet } from './hotspotQueries';
import { useQueryCache } from 'react-query';
import Loading from 'components/loading';
import I18n from 'i18n-js';
import { route } from 'preact-router';

const HotspostDisconnected = () => {
    const [enableHotspot, {
        isSuccess: enableHotspotSuccess,
        isLoading: isSubmitting
    }] = useEnableHotspot();
    const { isFetching, isError } = useWaitForConnect({
        enabled: enableHotspotSuccess
    });

    const isConnecting = isFetching || isSubmitting;
    return (
        <Fragment>
            <ol class="d-flex flex-grow-1 flex-column">
                <li>{I18n.t('Get an additional cell phone to the one you are currently using that has a mobile data connection')}</li>
                <li>
                    {I18n.t('With this second cell phone create an access point or hotspot with this data:')}
                    <div class={style.connectionData}>
                        <div>{I18n.t('Network Name: %{networkName}', {networkName: "internet"})}</div>
                        <div>{I18n.t('Password: %{password}', {password: "internet"})}</div>
                    </div>
                </li>
                <li>{I18n.t('When ready click on "Connect" to connect the node to the mobile hotspot')}</li>
            </ol>
            {!(isError || isConnecting) &&
                <button onClick={enableHotspot}>{I18n.t('Connect')}</button>
            }
            {isConnecting &&
                    <Loading />
            }
            {!isConnecting && isError &&
                <Fragment>
                    <p class="text-center text-error">
                        {I18n.t("Can't connect to the mobile hotspot")}
                    </p>
                    <button onClick={enableHotspot}>{I18n.t('Try Again')}</button>
                </Fragment>
            }
        </Fragment>
    )
}

const HotspotConnected = ({ nextPage }) => {
    const { data: connectionStatus } = useIsConnected({
        refetchInterval: 5000
    });
    const { isFetching, isError:internetError} = useWaitForInternet();
    const queryCache = useQueryCache();

    if (isFetching) {
        return <div class="container-center"><Loading /></div>
    }

    const onTryAgain = () => {
        queryCache.invalidateQueries('check_internet_wait_for_connected');
    }

    return (
        <div class="d-flex flex-grow-1 flex-column">
            <div class="container-center">
                <div class="d-flex justify-content">
                    {!internetError && 
                        <div class={`${style.symbol} bg-success`}>✔</div>
                    }
                    {internetError && 
                        <div class={`${style.symbol} bg-warning`}>!</div>
                    }
                </div>
                <div>{I18n.t('The node is connected to your hotspot')}</div>
                {internetError && 
                    <div>{I18n.t('But has no Internet connection')}</div>
                }
                <div>{I18n.t('Signal: %{signal} dBm', { signal: connectionStatus.signal })}</div>
            </div>
            {!internetError &&
                <button onClick={() => route('/'.concat(nextPage)) }>{I18n.t('Continue')}</button>
            }
            {internetError &&
                <button onClick={onTryAgain}>{I18n.t('Try Again')}</button>
            }
        </div>
    )
};

const Hotspot = ({ nextPage='rx' }) => {
    const { data: connectionStatus, isLoading } = useIsConnected();
    const isConnected = connectionStatus?.connected;

    if (isLoading) {
        return <div class="container container-centered"><Loading /></div>
    }

    return (
        <div class="container container-padded d-flex flex-column flex-grow-1">
            <h4>{I18n.t('Connect the node to a mobile hotspot')}</h4>
            {isConnected &&
                <HotspotConnected nextPage={nextPage} />
            }
            {!isConnected &&
                <HotspostDisconnected />
            }
        </div>
    );
}

export default Hotspot;
