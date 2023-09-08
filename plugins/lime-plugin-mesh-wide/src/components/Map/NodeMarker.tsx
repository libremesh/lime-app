import { Trans } from "@lingui/macro";
import L from "leaflet";
import { VNode } from "preact";
import { Marker, Tooltip } from "react-leaflet";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { processNodeErrors } from "plugins/lime-plugin-mesh-wide/src/lib/nodes/processErrors";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import {
    INamedNodeInfo,
    INodeInfo,
    NodeErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import style from "./style.less";

const NodeMarker = ({
    name,
    actual,
    reference,
}: {
    name: string;
    reference: INodeInfo;
    actual: INodeInfo;
}) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();

    const errors = processNodeErrors(reference, actual);
    const hasErrors = errors.length > 0;
    const isDown = errors.includes(NodeErrorCodes.NODE_DOWN);

    const markerClasses = `${
        selectedMapFeature?.id === name && style.selectedMarker
    } ${hasErrors ? style.errorMarker : style.syncedMarker} ${
        isDown && style.notUpMarker
    }`;

    return (
        <Marker
            position={[
                reference.data.coordinates.lat,
                reference.data.coordinates.lon,
            ]}
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
                        feature: { ...reference, name },
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
    selectedFeature,
}: {
    selectedFeature: INamedNodeInfo;
}) => {
    const hasError: boolean = Math.random() < 0.5;
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
