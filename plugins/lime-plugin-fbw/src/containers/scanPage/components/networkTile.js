import { SignalBar } from 'components/signalbar';
import signalStyle from 'components/signalbar/style.less';
import { ListItem } from 'components/list';
import style from '../../../style.less';
import { Trans } from '@lingui/macro';


export const NetworkTile = ({ 
    station, 
    network,
    expandedAps, 
    setExpandedAps,
    status,
    onSelect, 
}) => {
    let hostname = network.ap; // Hostname got from config file
    let listKey =
        station.bssid.replaceAll(":", "_"); // Used as key to expand the card

    const setExpanded = () => {
        if (expandedAps.includes(listKey)) {
        setExpandedAps([...expandedAps.filter((v) => v !== listKey)]);
        } else {
        setExpandedAps([...expandedAps, listKey]);
        }
    };

    const statusMessage = () => {
        // console.debug(station, station?.status, hostname, status)
        // Case no scanned status or scanned is true but scan end
        if ((station.status == null 
            || (station?.status?.code === "downloaded_config" && hostname === undefined)
            || (station?.status?.code === "downloading_config" )) 
            && status === "scanned") {
        return (
            <div class={`${style.fetchingName}`}>
            <Trans>Error reaching hostname!</Trans>
            </div>
        );
        }
        // Case configuration download not started yet
        else if (station.status == null) {
        return (
            <div class={`${style.fetchingName} withLoadingEllipsis`}>
            <Trans>Connection attempt not yet started</Trans>
            </div>
        );
        }
        // Case scan retval is false
        else if (station.status.retval === false) {
        let msg;
        switch (station.status.code) {
            case "error_download_lime_community":
            msg = <Trans>Error downloading lime community</Trans>;
            break;
            case "error_not_configured":
            msg = (
                <Trans>Error destination network is not configured yet</Trans>
            );
            break;
            case "error_download_lime_assets":
            msg = <Trans>Error downloading lime assets</Trans>;
            break;
        }
        return <div class={`${style.fetchingName}`}>{msg}</div>;
        }
        // Case scan retval is true
        else if (station.status.retval === true) {
        // Is downloading
        if (station.status.code == "downloading_config") {
            return (
            <div class={`${style.fetchingName} withLoadingEllipsis`}>
                <Trans>Fetching name</Trans>
            </div>
            );
        }
        // Has hostname
        else if (station.status.code === "downloaded_config" && hostname) {
            return (
            <span>
                <div style={"font-size: 2rem;"}>{hostname}</div>
                <div style={"font-size: 1.5rem; padding-right: 10px;"}>
                {`(${  network.config.wifi.ap_ssid  })`}
                </div>
            </span>
            );
        }
        }
        return (
        <div class={`${style.fetchingName}`}>
            <Trans>Unknown error</Trans>
        </div>
        );
    };

    return (
        <ListItem
        onClick={setExpanded}
        style={"padding-left: 0.5em; padding-right:0.5em;"}
        key={listKey}
        data-testid={listKey}
        >
        <div>
            {
            statusMessage()
            }
            <div
            class={
                expandedAps.includes(listKey)
                ? style.itemActive
                : style.itemHidden
            }
            >
            <div>{station.bssid}</div>
            <div>
                <Trans>Channel</Trans>: {station.channel}
            </div>
            </div>
        </div>
        <div class={`${style.netItemRight} d-flex`}>
            {hostname && station?.status?.code == "downloaded_config" && (
            <button
                onClick={() => onSelect(network.index)}
            >
                <Trans>Select</Trans>
            </button>
            )}

            <div class={signalStyle.signal} style={"margin-bottom:auto;"}>
            <div class="d-flex flex-grow-1 align-items-baseline">
                <div>{station.signal}</div>
            </div>
            <SignalBar signal={station.signal} className={signalStyle.bar} />
            </div>
        </div>
        </ListItem>
    );
};
	
