import L from "leaflet";
import { Polyline } from "react-leaflet";

import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";

interface ILinkLineProps {
    referenceLink?: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}

export const LinkLine = ({ referenceLink, actualLink }: ILinkLineProps) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();

    const linkToShow = referenceLink ?? actualLink;
    let isNewNode = false;
    if (!referenceLink) {
        isNewNode = true;
    }

    const type = linkToShow.type;
    const isSelected = selectedMapFeature?.id === linkToShow.id;

    const { linksErrors } = useLocatedLinks({ type });

    let hasError = false;
    let linkUp = true;

    if (!isNewNode && linksErrors && linksErrors[referenceLink.id]) {
        hasError = linksErrors[referenceLink.id].hasErrors;
        linkUp = linksErrors[referenceLink.id].linkUp;
    }

    const _setSelectedFeature = () => {
        setSelectedMapFeature({
            id: linkToShow.id,
            feature: { reference: linkToShow, actual: actualLink },
            type: "link",
        });
    };

    const getPathOpts = (isSelected) => {
        return {
            color: hasError ? "#eb7575" : "#76bd7d",
            weight: isSelected ? 7 : 5,
            opacity: isSelected ? 1 : 0.8,
            dashArray: isNewNode || !linkUp ? "7 10" : null, // Show dash array also when is a new node
        };
    };

    const coordinates = linkToShow.coordinates.map((c) => [c.lat, c.long]);

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
