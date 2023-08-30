import { Trans } from "@lingui/macro";
import L from "leaflet";
import { VNode } from "preact";
import { Marker, Tooltip } from "react-leaflet";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import {
    INamedNodeInfo,
    INodeInfo,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import style from "./style.less";

const NodeMarker = ({ name, info }: { name: string; info: INodeInfo }) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();
    const synced: boolean = Math.random() < 0.5;

    const markerClasses = `${
        selectedMapFeature?.id === name && style.selectedMarker
    } ${synced ? style.syncedMarker : style.notSyncedMarker}`;

    return (
        <Marker
            position={[info.coordinates.lat, info.coordinates.lon]}
            icon={L.divIcon({
                className: style.leafletDivCustomIcon,
                iconAnchor: [0, 24],
                popupAnchor: [0, -36],
                html: `<span class="${style.defaultMarker} ${markerClasses}" />`,
            })}
            eventHandlers={{
                click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    setSelectedMapFeature({
                        id: name,
                        feature: { ...info, name },
                        type: "node",
                    });
                },
            }}
        >
            <Tooltip>{name}</Tooltip>
        </Marker>
    );
};

export const NodeReferenceStatus = ({
    hasError,
    selectedFeature,
}: {
    hasError?: boolean;
    selectedFeature: INamedNodeInfo;
}) => {
    const txt: VNode = hasError ? (
        <Trans>In the reference state this node is on</Trans>
    ) : (
        <Trans>Same status as in the reference state</Trans>
    );
    return (
        <StatusAndButton
            isError={hasError}
            btn={hasError && <Trans>Update this node on reference state</Trans>}
        >
            {txt}
        </StatusAndButton>
    );
};

export default NodeMarker;
