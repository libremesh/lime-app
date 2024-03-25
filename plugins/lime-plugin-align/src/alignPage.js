import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { List, ListItem } from "components/list";
import Loading from "components/loading";
import { SignalBar } from "components/signalbar";
import signalStyle from "components/signalbar/style.less";
import Tabs from "components/tabs";

import { useBatHost } from "utils/queries";

import { useAssocList, useMeshIfaces } from "./alignQueries";
import { SecondsAgo } from "./components/secondsAgo";
import style from "./style.less";
import { ifaceToRadioNumber } from "./utils";

export const AssocRow = ({ station, iface }) => {
    const {
        data: bathost,
        isLoading,
        isError,
    } = useBatHost(station.mac, iface);

    function goToAlignSingle() {
        route(`/align-single/${iface}/${station.mac}`);
    }

    const radioNumber = bathost?.iface && ifaceToRadioNumber(bathost.iface);
    return (
        <ListItem onClick={goToAlignSingle}>
            <div>
                {isLoading || isError ? (
                    <div
                        className={`${style.fetchingName} withLoadingEllipsis`}
                    >
                        <Trans>Fetching name</Trans>
                    </div>
                ) : (
                    <div className={style.stationHostname}>
                        {bathost.hostname}
                    </div>
                )}
                {bathost && bathost.iface && (
                    <div>
                        <Trans>On its radio {radioNumber}</Trans>
                    </div>
                )}
                {station.inactive >= 3000 && (
                    <div>
                        <div>
                            <Trans>Signal lost</Trans>
                        </div>
                        <div>
                            <Trans>Last packet</Trans>:{" "}
                            <SecondsAgo initialMs={station.inactive} isStatic />
                        </div>
                    </div>
                )}
            </div>
            {station.inactive >= 3000 ? (
                <div className={signalStyle.signal}>
                    X
                    <SignalBar signal={null} className={signalStyle.bar} />
                </div>
            ) : (
                <div className={signalStyle.signal}>
                    <div className="d-flex flex-grow-1 align-items-baseline">
                        <div>{station.signal}</div>
                        <div className={style.unit}>dBm</div>
                    </div>
                    <SignalBar
                        signal={station.signal}
                        className={signalStyle.bar}
                    />
                </div>
            )}
        </ListItem>
    );
};

export const AssocList = ({ iface }) => {
    const {
        data: assoclist,
        isLoading,
        isError,
    } = useAssocList(iface, {
        refetchInterval: 2000,
    });

    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    if (isError || !assoclist) {
        return (
            <div className="container container-center">
                <Trans>Error retrieving associated list</Trans>
            </div>
        );
    }

    return (
        <List>
            {assoclist.length > 0 && (
                <div className={style.assoclistHeader}>
                    <Trans>These are the nodes associated on this radio</Trans>
                </div>
            )}
            {assoclist.map((station) => (
                <AssocRow key={station.mac} station={station} iface={iface} />
            ))}
            {assoclist.length === 0 && (
                <div className="container-center">
                    <Trans>This radio is not associated with other nodes</Trans>
                </div>
            )}
        </List>
    );
};

export const Align = ({}) => {
    const [tabs, setTabs] = useState([]);
    const [selectedIface, setSelectedIface] = useState(null);
    const { data: ifaces, isLoading } = useMeshIfaces();

    useEffect(() => {
        if (!ifaces) return;
        const tabs = ifaces.sort().map((iface) => {
            const radioNumber = ifaceToRadioNumber(iface);
            return {
                key: iface,
                repr: <Trans>Radio {radioNumber}</Trans>,
            };
        });
        setTabs(tabs);
        if (ifaces.length > 0) {
            setSelectedIface(ifaces[0]);
        }
    }, [ifaces]);

    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    if (!ifaces || ifaces.length === 0) {
        return (
            <div className="container container-center">
                <Trans>The are not mesh interfaces available</Trans>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <Tabs
                tabs={tabs}
                current={selectedIface}
                onChange={setSelectedIface}
            />
            {selectedIface && <AssocList iface={selectedIface} />}
        </div>
    );
};

export default Align;
