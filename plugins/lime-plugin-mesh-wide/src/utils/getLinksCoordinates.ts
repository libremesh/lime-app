import {
    INodes,
    IWifiLinks,
    LocatedWifiLinkData,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const mergeLinksAndCoordinates = (nodes: INodes, links: IWifiLinks) => {
    if (!nodes || !links) return [];
    const result: LocatedWifiLinkData[] = [];

    for (const pointId in links) {
        for (const data of links[pointId].data) {
            const dstPointId = Object.keys(nodes).find((pid) => {
                return nodes[pid].macs.filter((str) =>
                    str.toLowerCase().includes(data.dst_mac.toLowerCase())
                );
            });
            if (dstPointId) {
                const entry: LocatedWifiLinkData = {
                    [pointId]: {
                        ...data,
                        coordinates: nodes[pointId].coordinates,
                    },
                    [dstPointId!]: {
                        tx_rate: data.tx_rate,
                        dst_mac: data.src_mac,
                        chains: data.chains,
                        src_mac: data.dst_mac,
                        rx_rate: data.rx_rate,
                        signal: data.signal,
                        coordinates: nodes[dstPointId!].coordinates,
                    },
                };
                result.push(entry);
            }
        }
    }

    return result;
};
