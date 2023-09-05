import { useMemo } from "preact/compat";

import { mergeLinksAndCoordinates } from "plugins/lime-plugin-mesh-wide/src/lib/links/getLinksCoordinates";
import {
    useMeshWideLinks,
    useMeshWideLinksReference,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { LocatedWifiLinkData } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const useLocatedLinks = () => {
    const { data: meshWideLinksReference } = useMeshWideLinksReference({});
    const { data: meshWideLinks } = useMeshWideLinks({});
    const { data: meshWideNodesReference } = useMeshWideNodesReference({});

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

    return { locatedLinks, locatedLinksReference, linksLoaded };
};
