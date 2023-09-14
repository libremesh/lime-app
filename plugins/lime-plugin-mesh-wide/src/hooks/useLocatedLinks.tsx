import { useMemo } from "preact/compat";

import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { mergeLinksAndCoordinates } from "plugins/lime-plugin-mesh-wide/src/lib/links/getLinksCoordinates";
import { compareLinks } from "plugins/lime-plugin-mesh-wide/src/lib/links/processLinkErrors";
import {
    useMeshWideLinks,
    useMeshWideLinksReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import {
    ILinkErrors,
    LocatedWifiLinkData,
    PointToPointLinkId,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const useLocatedLinks = () => {
    const { data: meshWideLinksReference } = useMeshWideLinksReference({});
    const { data: meshWideLinks } = useMeshWideLinks({});

    const { geolocatedNodesReference: meshWideNodesReference } = useNodes();

    const locatedLinksReference: LocatedWifiLinkData = useMemo(() => {
        if (meshWideNodesReference && meshWideLinksReference) {
            return mergeLinksAndCoordinates(
                meshWideNodesReference,
                meshWideLinksReference
            );
        }
    }, [meshWideNodesReference, meshWideLinksReference]);

    const locatedLinks: LocatedWifiLinkData = useMemo(() => {
        if (meshWideNodesReference && meshWideLinks) {
            return mergeLinksAndCoordinates(
                meshWideNodesReference,
                meshWideLinks
            );
        }
    }, [meshWideNodesReference, meshWideLinks]);

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

export const usePointToPointErrors = ({ id }: { id: PointToPointLinkId }) => {
    const { linksErrors } = useLocatedLinks();
    return { errors: linksErrors[id] };
};
