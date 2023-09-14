import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import {
    ILocatedLink,
    INodes,
    IWifiLinks,
    LocatedWifiLinkData,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const mergeLinksAndCoordinates = (
    nodes: INodes,
    wifiLinks: IWifiLinks
): LocatedWifiLinkData => {
    if (!nodes || !wifiLinks) return {};
    const result: LocatedWifiLinkData = {};

    // for every node check all links
    for (const wifiNodeName in wifiLinks) {
        for (const wifiLinkData of wifiLinks[wifiNodeName].data) {
            // Get the nodeName of the destination node
            const dstNodeName = Object.keys(nodes).find((pid) => {
                return nodes[pid].data.macs.find(
                    (mac) =>
                        mac.toLowerCase() === wifiLinkData.dst_mac.toLowerCase()
                );
            });

            if (
                dstNodeName &&
                dstNodeName !== wifiNodeName &&
                nodes[wifiNodeName] // If is the link for a non geolocated node
            ) {
                // Generate a unique id of the point to point link based on the coordinates
                const linkKey = PontToPointLink.generateId(
                    nodes[wifiNodeName].data.coordinates,
                    nodes[dstNodeName!].data.coordinates
                );

                // If this point to point link no exists, instantiate it
                if (!result[linkKey]) {
                    result[linkKey] = new PontToPointLink(
                        nodes[wifiNodeName].data.coordinates,
                        nodes[dstNodeName!].data.coordinates
                    );
                }
                // Else if the link is not already added don't do it.
                else if (
                    result[linkKey].linkExists(
                        wifiLinkData.src_mac,
                        wifiLinkData.dst_mac
                    ) ||
                    !wifiLinks[dstNodeName]
                ) {
                    continue;
                }

                // Get the destination link info
                const destPointData = wifiLinks[dstNodeName].data.find(
                    (data) =>
                        data.dst_mac.toLowerCase() ===
                            wifiLinkData.src_mac.toLowerCase() &&
                        data.src_mac.toLowerCase() ===
                            wifiLinkData.dst_mac.toLowerCase()
                );

                const entry: ILocatedLink = {
                    [wifiNodeName]: {
                        ...wifiLinkData,
                        coordinates: nodes[wifiNodeName].data.coordinates,
                    },
                    [dstNodeName]: {
                        tx_rate: destPointData?.tx_rate,
                        dst_mac: destPointData?.dst_mac,
                        chains: destPointData?.chains,
                        src_mac: destPointData?.src_mac,
                        rx_rate: destPointData?.rx_rate,
                        signal: destPointData?.signal,
                        coordinates: nodes[dstNodeName].data.coordinates,
                    },
                };
                result[linkKey].addLink(new MacToMacLink(entry));
            }
        }
    }

    return result;
};
