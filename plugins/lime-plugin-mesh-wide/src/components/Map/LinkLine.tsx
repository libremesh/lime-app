import { Trans } from "@lingui/macro";
import L from "leaflet";
import { Polyline, Tooltip } from "react-leaflet";

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
    const linkId = linkToShow.id;
    let isNewLink = false;
    if (!referenceLink) {
        isNewLink = true;
    }

    const type = linkToShow.type;
    const isSelected = selectedMapFeature?.id === linkToShow.id;

    const { linksErrors } = useLocatedLinks({ type });

    let hasError = false;
    let linkUp = true;

    if (linksErrors && linksErrors[linkId]) {
        hasError = linksErrors[linkId].hasErrors;
        linkUp = linksErrors[linkId].linkUp;
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
            stroke: true,
            weight: isSelected ? 7 : 5,
            opacity: isSelected ? 1 : 0.8,
            dashArray: isNewLink ? "1,6" : !linkUp ? "7 10" : null, // Show dot line when new and dashed line when link is down
        };
    };

    if (linkToShow.hasInValidCoordinates()) return <></>;
    console.log("LinkToShow", linkToShow);
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
        >
            {isNewLink && (
                <Tooltip className={"text-3xl"}>
                    <Trans>New link</Trans>
                </Tooltip>
            )}
        </Polyline>
    );
};

export default LinkLine;
