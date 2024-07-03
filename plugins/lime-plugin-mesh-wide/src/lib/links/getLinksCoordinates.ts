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
    // if (!nodes || isEmpty(nodes) || !links || isEmpty(links)) return {};
    if (!links || isEmpty(links)) return {};

    const result: LocatedLinkData = {};
    console.log("--------------------");
    console.log("LINKS & NODES", links, nodes);

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
            // If destination mac or locations are not defined, ignore the link
            // todo(kon): what happen if the destination mac or location is undefined?
            // if (!linkData.dst_mac || !linkData.dst_loc) continue;

            // Get the nodeName of the destination node
            // const dstNodeName = Object.keys(nodes).find((pid) => {
            //     return nodes[pid].macs.find(
            //         (mac) =>
            //             mac.toLowerCase() === linkData.dst_mac.toLowerCase()
            //     );
            // });

            // Is possible that the destination node is not on the list of links,
            // just ignore it
            // if (!dstNodeName || !links[dstNodeName]) continue;

            // If the destination node is not the same as the link node
            // and the destination node is on the list of nodes
            // and the link is not already added
            // if (
            //     dstNodeName &&
            //     dstNodeName !== linkNodeName &&
            //     nodes[linkNodeName]
            // ) {
            // Generate a unique id of the point to point link based on the coordinates to check if already exists
            // const geoLinkKey = PontToPointLink.generateId(
            //     nodes[linkNodeName].coordinates,
            //     nodes[dstNodeName].coordinates
            // );

            // If this point to point link no exists, instantiate it
            // if (!result[geoLinkKey]) {
            //     // result[geoLinkKey] = new PontToPointLink(
            //     //     nodes[linkNodeName],
            //     //     nodes[dstNodeName]
            //     // );
            // }

            // Find destination link info from shared state
            let dest: IBaseLink<T>;
            for (const destNodeKey in links) {
                const link = Object.entries(links[destNodeKey].links).find(
                    ([key]) => key === linkKey && destNodeKey !== actualNodeName
                );
                if (link) {
                    dest = { [destNodeKey]: link[1] };
                }
            }

            let destLoc = linkData?.dst_loc;
            // If destination coords are undefined, try to find it on other ways.
            if (!destLoc) {
                console.log("Destination loc not found");
                if (dest && links[Object.keys(dest)[0]].src_loc) {
                    // If we have destination link info, try to find the src_loc
                    destLoc = links[Object.keys(dest)[0]].src_loc;
                    console.log(
                        "Destination loc found via dest link mac",
                        dest
                    );
                } else {
                    // Find the destination MAC between existing located nodes to get the position
                    const dstNode = Object.values(nodes).find((node) => {
                        return node.macs.find((mac) => {
                            console.log("NININNINININNI", linkData);
                            return (
                                mac.toLowerCase() ===
                                linkData.dst_mac.toLowerCase()
                            );
                        });
                    });
                    if (dstNode) {
                        destLoc = dstNode.coordinates;
                        console.log("Destination loc found via dest node");
                    }
                }
            }

            // todo(kon): what happen if the destination link or location is undefined?
            // Maybe drawing somehow to the map and show the user that the link is not complete
            // For the moment lets ignore the link
            if (!destLoc) {
                console.log("LINK NOT SHOWN, NOT ENUGH INFO", dest, destLoc);
                continue;
            }

            if (!dest) {
                dest = {
                    node_down: {
                        dst_loc: destLoc,
                    },
                } as IBaseLink<T>;
            }

            // Get Geolink key to check if is already added
            const geoLinkKey = PontToPointLink.generateId(srcLoc, destLoc);

            // If the link PontToPointLink already exists and the link is already added, ignore it
            if (result[geoLinkKey] && result[geoLinkKey].linkExists(linkKey)) {
                continue;
            }

            console.log("NEW GEOLINK", geoLinkKey, linkData);
            // Instantiate new point to point link on the results array
            if (!result[geoLinkKey]) {
                result[geoLinkKey] = new PontToPointLink(srcLoc, destLoc);
            }

            // Add node names to the link data
            result[geoLinkKey].addNodes([actualNodeName, ...Object.keys(dest)]);

            // const entry = {
            //     [linkNodeName]: {
            //         ...linkData,
            //         coordinates: nodes[linkNodeName].coordinates,
            //     },
            //     [dstNodeName]: {
            //         ...destLinkData,
            //         coordinates: nodes[dstNodeName].coordinates,
            //     },
            // } as IBaseLink<T>;
            const entry = {
                [actualNodeName]: {
                    ...linkData,
                },
                ...dest,
            } as IBaseLink<T>;

            result[geoLinkKey].addLink(new MacToMacLink(linkKey, entry, type));
        }
        // }
    }

    return result;
};
