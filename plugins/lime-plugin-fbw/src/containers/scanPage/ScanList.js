import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";

import { List } from "components/list";
import { Loading } from "components/loading";
import Toast from "components/toast";

import { useFbwStatus, useScanRestart, useScanStart } from "../../FbwQueries";
import style from "../../style.less";
import { CancelButton, RescanButton } from "./components/buttons";
import { NetworkTile } from "./components/networkTile";

export const ScanList = ({
    selectedNetwork,
    setSelectedNetwork,
    cancelSelectedNetwork,
    cancel,
}) => {
    const [expandedAps, setExpandedAps] = useState([]); // Expand scanned lists
    const [pollingInterval, setPollingInterval] = useState(null);

    const {
        mutate: scanStart,
        isLoading: isStarting,
        isError: startError,
    } = useScanStart({ onSuccess: () => setPollingInterval(1000) });

    const {
        mutate: scanRestart,
        isLoading: isRestarting,
        isError: restartError,
    } = useScanRestart({
        onSuccess: () => {
            setPollingInterval(1000);
            refetchScanResults();
        },
    });

    const {
        data: scanResults,
        isError: scanStatusError,
        remove: removeScanStatus,
        isLoading: isLoadingScans,
        refetch: refetchScanResults,
    } = useFbwStatus({
        enabled: pollingInterval !== null && !startError && !restartError,
        refetchInterval: pollingInterval,
        onSuccess: (data) => {
            if (data.status === "scanned") setPollingInterval(null);
        },
    });

    const status = scanResults?.status || null; // Scan status
    const networks = scanResults?.networks || []; // Configuration files downloaded
    const scanned = scanResults?.scanned || []; // Scanned AP's
    const isLoading = isStarting || isRestarting || isLoadingScans;

    useEffect(() => {
        if (scanResults === undefined) scanStart();
    }, []);

    function _rescan() {
        cancelSelectedNetwork();
        scanRestart();
    }

    async function _cancel() {
        if (await cancel()) {
            removeScanStatus();
        }
    }

    function selectNetwork(netIdx) {
        const { config, file } = networks[netIdx];
        setSelectedNetwork({
            ...selectedNetwork,
            file,
            apname: config.wifi.apname_ssid.split("/%H")[0],
            community: config.wifi.ap_ssid,
        });
    }

    const getNetworkFromBssid = (bssid) => {
        for (let i = 0; i < networks.length; i++) {
            if (networks[i].bssid === bssid)
                return { ...networks[i], index: i };
        }
        return "";
    };

    const NetworksList = () => {
        return (
            <List>
                {scanned.length > 0 && (
                    <div class={style.assoclistHeader}>
                        <Trans>Choose a mesh node to join it's network:</Trans>
                    </div>
                )}
                {scanned.length > 0 &&
                    scanned.map((station) => (
                        <NetworkTile
                            key={station.mac}
                            station={station}
                            network={getNetworkFromBssid(station.bssid)}
                            expandedAps={expandedAps}
                            setExpandedAps={setExpandedAps}
                            status={status}
                            onSelect={(idx) => {
                                selectNetwork(idx);
                            }}
                        />
                    ))}
            </List>
        );
    };

    return (
        <div class="container container-padded">
            <div>
                <div>
                    {(status === "scanning" && !selectedNetwork?.apname) ||
                    isLoading ? (
                        <div style="margin: 20px;">
                            <Loading />
                        </div>
                    ) : (
                        false
                    )}
                    {scanned.length === 0 && status === "scanned" ? (
                        <span>
                            <h3 className="container-center">
                                <Trans>No scan result</Trans>
                            </h3>
                        </span>
                    ) : (
                        false
                    )}
                    {!selectedNetwork?.apname ? (
                        <span>
                            <NetworksList />
                        </span>
                    ) : null}
                    <div class="row" style="min-height: 200px;">
                        <div class="six columns">
                            <RescanButton rescan={_rescan} />
                        </div>
                        <div class="six columns">
                            <CancelButton cancel={_cancel} />
                        </div>
                    </div>
                </div>
            </div>
            {startError ||
                (restartError && (
                    <Toast text={<Trans>Error scanning networks</Trans>} />
                ))}
            {scanStatusError && (
                <Toast text={<Trans>Error getting scan results</Trans>} />
            )}
            {(status === "scanning" || isLoading) && (
                <Toast text={<Trans>Scanning for existing networks</Trans>} />
            )}
        </div>
    );
};
