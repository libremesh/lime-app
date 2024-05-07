import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "preact";
import { useMemo } from "preact/compat";
import { useContext } from "preact/hooks";

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

/**
 * Util hook to get located links and compare them with the reference links
 * @param type
 */
const useCalculateLocatedLinks = ({
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

// Define separate contexts for each type of link
const BatmanLinksContext = createContext<IUselocatedLinks | null>(null);
const MeshWideLinksContext = createContext<IUselocatedLinks | null>(null);

// Export a hook that return the proper context based on the type of link
export const useLocatedLinks = ({ type }: { type: LinkType }) => {
    let requestedContext = MeshWideLinksContext;
    if (type === "bat_links_info") {
        requestedContext = BatmanLinksContext;
    }

    const context = useContext(requestedContext);
    if (context === null) {
        throw new Error(
            `useLocatedLinks must be used within a provider for ${requestedContext} links`
        );
    }
    return context;
};

export const BatmanLinksProvider = ({ children }) => {
    const batmanLinksData = useCalculateLocatedLinks({
        type: "bat_links_info",
    });

    return (
        <BatmanLinksContext.Provider value={batmanLinksData}>
            {children}
        </BatmanLinksContext.Provider>
    );
};

export const MeshWideLinksProvider = ({ children }) => {
    const meshWideLinksData = useCalculateLocatedLinks({
        type: "wifi_links_info",
    });

    return (
        <MeshWideLinksContext.Provider value={meshWideLinksData}>
            {children}
        </MeshWideLinksContext.Provider>
    );
};
