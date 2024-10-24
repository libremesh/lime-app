import { Trans } from "@lingui/macro";
import L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import { useSingleNodeErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useSingleNodeErrors";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import {
    INodeInfo,
    NodeMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import style from "./style.less";

const NodeMarker = ({
    name,
    actual,
    reference,
}: {
    name: string;
    reference?: INodeInfo | undefined;
    actual: INodeInfo;
}) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();

    const { hasErrors, isDown, isNewNode } = useSingleNodeErrors({
        actual,
        reference,
    });

    const markerClasses = `${
        selectedMapFeature?.id === name && style.selectedMarker
    }
    ${hasErrors ? style.errorMarker : style.syncedMarker}
    ${isDown && style.notUpMarker}`;

    // If node no reference is set, is a new node
    const nodeToShow = reference ?? actual;

    const newNodeTooltip = isNewNode ? <Trans>(new)</Trans> : "";

    return (
        <Marker
            position={[nodeToShow.coordinates.lat, nodeToShow.coordinates.long]}
            icon={L.divIcon({
                className: style.leafletDivCustomIcon,
                iconAnchor: [0, 24],
                popupAnchor: [0, -36],
                html: `<span class="${style.markerContainer}"><span class="${
                    style.defaultMarker
                } ${markerClasses}"/> <span class="${
                    isNewNode ? style.badge : ""
                }" /></span>`,
            })}
            eventHandlers={{
                click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    setSelectedMapFeature({
                        id: name,
                        feature: { actual, reference, name } as NodeMapFeature,
                        type: "node",
                    });
                },
            }}
        >
            <Tooltip className={"text-3xl"}>
                {name} {newNodeTooltip}
            </Tooltip>
        </Marker>
    );
};

export default NodeMarker;
