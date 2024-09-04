import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import {
    IBaseLink,
    ILinks,
    INodes,
    LinkType,
    LocatedLinkData,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

export const mergeLinksAndCoordinates = <T extends LinkType>(
    links: ILinks<T>,
    type: T,
    nodes?: INodes
): LocatedLinkData => {
    if (!links || isEmpty(links)) return {};

    const result: LocatedLinkData = {};
    // for every node check all links
    for (const actualNodeName in links) {
        if (
            isEmpty(links[actualNodeName]) ||
            typeof links[actualNodeName].links !== "object" // todo(kon): this is an error from the backend
        )
            continue;
        const srcLoc = links[actualNodeName].src_loc;
        for (const [linkKey, linkData] of Object.entries(
            links[actualNodeName].links
        )) {
            // Find destination link info from shared state
            let dest: IBaseLink<T>;
            for (const destNodeKey in links) {
                // Prevent empty objects crashing from shared state
                if (links[destNodeKey] && !isEmpty(links[destNodeKey]?.links)) {
                    const link = Object.entries(links[destNodeKey].links).find(
                        ([key]) =>
                            key === linkKey && destNodeKey !== actualNodeName
                    );
                    if (link) {
                        dest = { [destNodeKey]: link[1] };
                    }
                }
            }

            let destLoc = linkData?.dst_loc;
            // If destination coords are undefined, try to find it on other ways.
            if (!destLoc) {
                if (dest && links[Object.keys(dest)[0]].src_loc) {
                    // If we have destination link info, try to find the src_loc
                    destLoc = links[Object.keys(dest)[0]].src_loc;
                } else {
                    // Find the destination MAC between existing located nodes to get the position
                    const dstNode = Object.values(nodes).find((node) => {
                        return node.macs.find((mac) => {
                            return (
                                mac.toLowerCase() ===
                                linkData.dst_mac.toLowerCase()
                            );
                        });
                    });
                    if (dstNode) {
                        destLoc = dstNode.coordinates;
                    }
                }
            }

            // What happen if the destination link or location is undefined?
            // Maybe drawing somehow to the map and show the user that the link is not complete
            // For the moment lets ignore the link
            if (!destLoc) {
                continue;
            }

            // Get Geolink key to check if is already added
            const geoLinkKey = PontToPointLink.generateId(srcLoc, destLoc);

            // If the link PontToPointLink already exists and the link is already added, ignore it
            if (result[geoLinkKey] && result[geoLinkKey].linkExists(linkKey)) {
                continue;
            }

            // Instantiate new point to point link on the results array
            if (!result[geoLinkKey]) {
                result[geoLinkKey] = new PontToPointLink(srcLoc, destLoc);
            }

            // Add node names to the link data
            result[geoLinkKey].addNodes([
                actualNodeName,
                ...Object.keys(dest ?? ""), // If destination node is down, ignore node name
            ]);

            const entry = {
                [actualNodeName]: {
                    ...linkData,
                },
                ...dest,
            } as IBaseLink<T>;

            result[geoLinkKey].addLink(new MacToMacLink(linkKey, entry, type));
        }
    }

    return result;
};
