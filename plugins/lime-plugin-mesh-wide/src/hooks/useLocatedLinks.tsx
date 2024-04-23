import { UseQueryResult } from "@tanstack/react-query";
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
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import {
    ILinkErrors,
    ILinkPtoPErrors,
    ILinks,
    LinkType,
    LocatedLinkData,
    PointToPointLinkId,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

interface getQueryByLinkTypeReturnType<T extends LinkType> {
    // state: (params) => UseQueryResult<ILinks<T>>;
    state: (params) => UseQueryResult<ILinks<T>>;
    reference: (params) => UseQueryResult<ILinks<T>>;
}
/**
 * Util function that returns the correct query based on the link type
 * @param type
 */
export const getQueryByLinkType = <T extends LinkType>(
    type: T
): getQueryByLinkTypeReturnType<T> => {
    if (type === "bat_links_info") {
        return {
            state: useMeshWideBatman,
            reference: useMeshWideBatmanReference,
        } as getQueryByLinkTypeReturnType<T>;
    }
    return {
        state: useMeshWideLinks,
        reference: useMeshWideLinksReference,
    } as getQueryByLinkTypeReturnType<T>;
};

interface IUselocatedLinks {
    locatedLinksReference: LocatedLinkData;
    linksErrors: ILinkErrors | undefined;
    locatedLinks: LocatedLinkData;
    linksLoaded: boolean;
    locatedNewLinks: LocatedLinkData;
}
export const useLocatedLinks = ({
    type,
}: {
    type: LinkType;
}): IUselocatedLinks => {
    const { state: fetchData, reference: fetchDataReference } =
        getQueryByLinkType(type);

    const { data: linksReference } = fetchDataReference({});
    const { data: links } = fetchData({});
    const {
        locatedNodes: { allLocatedNodes: meshWideNodes },
    } = useNodes();

    const locatedLinksReference: LocatedLinkData = useMemo(() => {
        if (meshWideNodes && linksReference) {
            return mergeLinksAndCoordinates(
                meshWideNodes,
                linksReference,
                type
            );
        }
    }, [meshWideNodes, linksReference, type]);

    const locatedLinks: LocatedLinkData = useMemo(() => {
        if (links && meshWideNodes) {
            return mergeLinksAndCoordinates(meshWideNodes, links, type);
        }
    }, [links, meshWideNodes, type]);

    const linksLoaded = !!locatedLinksReference && !!locatedLinks;

    const linksErrors: ILinkErrors = useMemo(() => {
        // If there are no links reference just drop no errors (because there are no links to compare with)
        if (locatedLinksReference && !isEmpty(locatedLinksReference)) {
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

    // This links are valid and not exists on the reference state
    let locatedNewLinks: LocatedLinkData = {};
    if (locatedLinks) {
        locatedNewLinks = Object.keys(locatedLinks).reduce((obj, key) => {
            if (!locatedLinksReference || !locatedLinksReference[key]) {
                obj[key] = locatedLinks[key];
            }
            return obj;
        }, {} as LocatedLinkData);
    }

    return {
        locatedLinks,
        locatedLinksReference,
        linksLoaded,
        linksErrors,
        locatedNewLinks,
    } as IUselocatedLinks;
};

export const usePointToPointErrors = ({
    id,
    type,
}: {
    id: PointToPointLinkId;
    type: LinkType;
}): { errors: ILinkPtoPErrors | undefined } => {
    const { linksErrors } = useLocatedLinks({ type });
    return { errors: linksErrors && linksErrors[id] };
};
