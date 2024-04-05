import L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import { useNodeErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodeErrors";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import {
    INodeInfo,
    NodeMapFeature,
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

    const { hasErrors, isDown } = useNodeErrors({ actual, reference });

    const markerClasses = `${
        selectedMapFeature?.id === name && style.selectedMarker
    } ${hasErrors ? style.errorMarker : style.syncedMarker} ${
        isDown && style.notUpMarker
    }`;

    return (
        <Marker
            position={[reference.coordinates.lat, reference.coordinates.long]}
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
                        feature: { actual, reference, name } as NodeMapFeature,
                        type: "node",
                    });
                },
            }}
        >
            <Tooltip>{name}</Tooltip>
        </Marker>
    );
};

export default NodeMarker;
