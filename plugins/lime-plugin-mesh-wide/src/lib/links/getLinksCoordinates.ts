import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import {
    ILinks,
    ILocatedLink,
    INodes,
    LinkType,
    LocatedLinkData,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

export const mergeLinksAndCoordinates = <T extends LinkType>(
    nodes: INodes,
    links: ILinks<T>,
    type: T
): LocatedLinkData => {
    if (!nodes || isEmpty(nodes) || !links || isEmpty(links)) return {};

    const result: LocatedLinkData = {};

    // for every node check all links
    for (const linkNodeName in links) {
        if (isEmpty(links[linkNodeName])) continue;
        for (const [linkKey, linkData] of Object.entries(links[linkNodeName])) {
            if (!linkData.dst_mac) continue;
            // Get the nodeName of the destination node
            const dstNodeName = Object.keys(nodes).find((pid) => {
                return nodes[pid].macs.find(
                    (mac) =>
                        mac.toLowerCase() === linkData.dst_mac.toLowerCase()
                );
            });

            // Is possible that the destination node is not on the list of links,
            // just ignore it
            if (!dstNodeName || !links[dstNodeName]) continue;

            // If the destination node is not the same as the link node
            // and the destination node is on the list of nodes
            // and the link is not already added
            if (
                dstNodeName &&
                dstNodeName !== linkNodeName &&
                nodes[linkNodeName]
            ) {
                // Generate a unique id of the point to point link based on the coordinates to check if already exists
                const linkKey = PontToPointLink.generateId(
                    nodes[linkNodeName].coordinates,
                    nodes[dstNodeName].coordinates
                );

                // If this point to point link no exists, instantiate it
                if (!result[linkKey]) {
                    result[linkKey] = new PontToPointLink(
                        nodes[linkNodeName],
                        nodes[dstNodeName]
                    );
                }
                // If the link PontToPointLink already exists and the link is already added, ignore it
                else if (
                    result[linkKey].linkExists(
                        linkData.src_mac,
                        linkData.dst_mac
                    ) ||
                    !links[dstNodeName]
                ) {
                    continue;
                }

                // Find destination link info from shared state
                const destPointData = links[dstNodeName][linkKey];

                const entry = {
                    [linkNodeName]: {
                        ...linkData,
                        coordinates: nodes[linkNodeName].coordinates,
                    },
                    [dstNodeName]: {
                        ...destPointData,
                        coordinates: nodes[dstNodeName].coordinates,
                    },
                } as ILocatedLink<T>;

                result[linkKey].addLink(new MacToMacLink(linkKey, entry, type));
            }
        }
    }

    return result;
};
