import L from "leaflet";
import { Polyline } from "react-leaflet";

import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const LinkLine = ({
    referenceLink,
    actualLink,
}: {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();
    const isSelected = selectedMapFeature?.id === referenceLink.id;

    const synced: boolean = Math.random() < 0.5;

    const getPathOpts = (isSelected) => {
        return {
            color: synced ? "#76bd7d" : "#eb7575",
            weight: isSelected ? 7 : 5,
            opacity: isSelected ? 1 : 0.8,
            dashArray: actualLink ? null : "7 10",
        };
    };

    const coordinates = referenceLink.coordinates.map((c) => [c.lat, c.lon]);

    return (
        <Polyline
            positions={coordinates}
            pathOptions={getPathOpts(isSelected)}
            eventHandlers={{
                click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    setSelectedMapFeature({
                        id: referenceLink.id,
                        feature: referenceLink,
                        type: "link",
                    });
                },
                mouseover: (e) => {
                    const l = e.target;
                    l.setStyle(getPathOpts(true));
                },
                mouseout: (event) => {
                    const l = event.target;
                    l.setStyle(getPathOpts(isSelected));
                },
            }}
        />
    );
};

export default LinkLine;
