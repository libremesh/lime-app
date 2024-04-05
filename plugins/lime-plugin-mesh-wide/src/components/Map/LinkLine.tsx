import L from "leaflet";
import { Polyline } from "react-leaflet";

import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

interface ILinkLineProps {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}

export const LinkLine = ({ referenceLink, actualLink }: ILinkLineProps) => {
    const type = referenceLink.type;
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();
    const isSelected = selectedMapFeature?.id === referenceLink.id;
    const { linksErrors } = useLocatedLinks({ type });

    const hasError = linksErrors[referenceLink.id]?.hasErrors ?? false;
    const linkUp = linksErrors[referenceLink.id]?.linkUp ?? true;

    const _setSelectedFeature = () => {
        setSelectedMapFeature({
            id: referenceLink.id,
            feature: { reference: referenceLink, actual: actualLink },
            type: "link",
        });
    };

    const getPathOpts = (isSelected) => {
        return {
            color: hasError ? "#eb7575" : "#76bd7d",
            weight: isSelected ? 7 : 5,
            opacity: isSelected ? 1 : 0.8,
            dashArray: linkUp ? null : "7 10",
        };
    };

    const coordinates = referenceLink.coordinates.map((c) => [c.lat, c.long]);

    return (
        <Polyline
            positions={coordinates}
            pathOptions={getPathOpts(isSelected)}
            eventHandlers={{
                click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    _setSelectedFeature();
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
