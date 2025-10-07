import { Trans } from "@lingui/macro";
import { useMemo, useState } from "preact/hooks";

import Loading from "components/loading";
import { usePublishAll } from "components/shared-state/SharedStateQueries";
import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";

import style from "plugins/lime-plugin-mesh-wide/src/containers/style.less";
import { useLocateNode } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocateNode";
import {
    getLocationQueryKey,
    useChangeLocation,
    useLocation,
} from "plugins/lime-plugin-mesh-wide/src/locateNodeQueries";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";

import queryCache from "utils/queryCache";

const LocateNode = ({}) => {
    const { editingLocation, setEditingLocation, mapRef } = useLocateNode();
    const { data: selectedMapFeature } = useSelectedMapFeature();
    const { data: nodeLocation, isLoading: isLoadingNodeLocation } =
        useLocation({});
    const [isLoading, setIsLoading] = useState(false);

    // Code to force to update shared state with new location
    const { data: node } = useNodeStatus();
    const ip = useMemo(() => {
        if (!node) return null;
        return node?.ips
            .find((ip) => ip.version === "4")
            ?.address?.split("/")[0];
    }, [node]);
    const { mutateAsync: publishAll } = usePublishAll({
        ip,
    });

    const onNewLocationSet = async () => {
        try {
            await queryCache.invalidateQueries(getLocationQueryKey);
            await publishAll({ ip });
            await queryCache.invalidateQueries(
                sharedStateQueries.getFromSharedState("node_info")
            );
        } finally {
            toogleEdition();
            setIsLoading(false);
        }
    };

    const { mutate: changeLocation } = useChangeLocation({
        onSettled: onNewLocationSet,
    });

    let stationLat = null;
    if (nodeLocation.location.lat !== "FIXME")
        stationLat = nodeLocation.location.lat;
    let stationLon = null;
    if (nodeLocation.location.lon !== "FIXME") {
        stationLon = nodeLocation.location.lon;
    }

    const hasLocation = stationLat && stationLon;
    const loaded = !isLoadingNodeLocation && typeof stationLat !== "undefined";

    const toogleEdition = () => {
        setEditingLocation((prev) => !prev);
    };

    const confirmLocation = async () => {
        setIsLoading(true);
        const position = mapRef.current.getCenter();
        changeLocation({ lat: position.lat, lon: position.lng });
    };

    if (!loaded || selectedMapFeature) {
        return null;
    }

    if (isLoading) {
        return (
            <div id="edit-action" className={style.editAction}>
                <Loading />
            </div>
        );
    }

    return (
        <div id="edit-action" className={style.editAction}>
            {editingLocation && (
                <button onClick={confirmLocation}>
                    <Trans>confirm location</Trans>
                </button>
            )}
            <button onClick={toogleEdition}>
                {editingLocation && <Trans>cancel</Trans>}
                {!editingLocation && hasLocation && (
                    <Trans>edit location</Trans>
                )}
                {!editingLocation && !hasLocation && (
                    <Trans>locate my node</Trans>
                )}
            </button>
        </div>
    );
};

export default LocateNode;
