import { useMemo } from "preact/compat";

import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { mergeLinksAndCoordinates } from "plugins/lime-plugin-mesh-wide/src/lib/links/getLinksCoordinates";
import { compareLinks } from "plugins/lime-plugin-mesh-wide/src/lib/links/processLinkErrors";
import {
    useMeshWideBatman,
    useMeshWideBatmanReference,
    useMeshWideLinks,
    useMeshWideLinksReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import {
    ILinkErrors,
    LinkType,
    LocatedLinkData,
    PointToPointLinkId,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const useLocatedLinks = ({ type }: { type: LinkType }) => {
    const fetchData = type === "batman" ? useMeshWideBatman : useMeshWideLinks;
    const fetchDataReference =
        type === "batman"
            ? useMeshWideBatmanReference
            : useMeshWideLinksReference;

    const { data: linksReference } = fetchDataReference({});
    const { data: links } = fetchData({});

    const {
        locatedNodes: { locatedNodesReference: meshWideNodesReference },
    } = useNodes();

    const locatedLinksReference: LocatedLinkData = useMemo(() => {
        if (meshWideNodesReference && linksReference) {
            return mergeLinksAndCoordinates(
                meshWideNodesReference,
                linksReference,
                type
            );
        }
    }, [meshWideNodesReference, linksReference, type]);

    const locatedLinks: LocatedLinkData = useMemo(() => {
        if (links && meshWideNodesReference) {
            return mergeLinksAndCoordinates(
                meshWideNodesReference,
                links,
                type
            );
        }
    }, [links, meshWideNodesReference, type]);

    const linksLoaded = !!locatedLinksReference && !!locatedLinks;

    const linksErrors: ILinkErrors = useMemo(() => {
        if (locatedLinksReference) {
            const errors: ILinkErrors = {};
            Object.entries(locatedLinksReference).forEach(
                ([k, referenceLink]) => {
                    let actualLink: PontToPointLink;
                    if (locatedLinks) {
                        actualLink = Object.values(locatedLinks).find(
                            (value) => value.id === referenceLink.id
                        );
                    }
                    errors[referenceLink.id] = compareLinks({
                        referenceLink,
                        actualLink,
                    });
                }
            );
            return errors;
        }
    }, [locatedLinksReference, locatedLinks]);

    return { locatedLinks, locatedLinksReference, linksLoaded, linksErrors };
};

export const usePointToPointErrors = ({
    id,
    type,
}: {
    id: PointToPointLinkId;
    type: LinkType;
}) => {
    const { linksErrors } = useLocatedLinks({ type });
    return { errors: linksErrors[id] };
};
