import { useMemo } from "preact/compat";

import LinkLine from "plugins/lime-plugin-mesh-wide/src/components/Map/LinkLine";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { mergeLinksAndCoordinates } from "plugins/lime-plugin-mesh-wide/src/lib/links/getLinksCoordinates";
import {
    useMeshWideLinks,
    useMeshWideLinksReference,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { LocatedWifiLinkData } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const LinksLayer = () => {
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

    return (
        <>
            {linksLoaded &&
                Object.entries(locatedLinksReference).map(
                    (referenceLink, i) => {
                        let actualLink: PontToPointLink;
                        if (locatedLinks) {
                            actualLink = Object.values(locatedLinks).find(
                                (value) => value.id === referenceLink[0]
                            );
                        }
                        return (
                            <LinkLine
                                key={i}
                                referenceLink={referenceLink[1]}
                                actualLink={actualLink}
                            />
                        );
                    }
                )}
        </>
    );
};
