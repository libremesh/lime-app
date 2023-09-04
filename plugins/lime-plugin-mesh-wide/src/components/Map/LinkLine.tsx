import L from "leaflet";
import { useEffect } from "preact/hooks";
import { Polyline } from "react-leaflet";

import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { compareLinks } from "plugins/lime-plugin-mesh-wide/src/lib/links/processErrors";
import {
    useLinkErrors,
    useSelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

interface ILinkLineProps {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}

const LinkPolyLine = ({ referenceLink, actualLink }: ILinkLineProps) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();
    const isSelected = selectedMapFeature?.id === referenceLink.id;
    const { data: linksErrors, setData: setLinkError } = useLinkErrors(
        referenceLink.id
    );

    const hasError: boolean = Math.random() < 0.5;

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
            dashArray: actualLink ? null : "7 10",
        };
    };

    useEffect(() => {
        if (referenceLink) {
            for (const l of Object.values(referenceLink.links)) {
                l.id;
            }
        }
    }, [actualLink, referenceLink]);

    const coordinates = referenceLink.coordinates.map((c) => [c.lat, c.lon]);

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

const LinkLine = ({ referenceLink, actualLink }: ILinkLineProps) => {
    const { data, setData: setLinkError } = useLinkErrors(referenceLink.id);

    useEffect(() => {
        if (referenceLink) {
            const errors = compareLinks({ referenceLink, actualLink });
            setLinkError(errors);
        }
    }, [referenceLink, actualLink, setLinkError]);

    return (
        <LinkPolyLine referenceLink={referenceLink} actualLink={actualLink} />
    );
};

export default LinkLine;
