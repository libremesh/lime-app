import {
    Coordinates,
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
                return nodes[pid].macs.find(
                    (mac) =>
                        mac.toLowerCase() === wifiLinkData.dst_mac.toLowerCase()
                );
            });

            if (dstNodeName && dstNodeName !== wifiNodeName) {
                // Generate a unique id of the point to point link based on the coordinates
                const linkKey = PontToPointLink.generateId(
                    nodes[wifiNodeName].coordinates,
                    nodes[dstNodeName!].coordinates
                );

                // If this point to point link no exists, instantiate it
                if (!result[linkKey]) {
                    result[linkKey] = new PontToPointLink(
                        nodes[wifiNodeName].coordinates,
                        nodes[dstNodeName!].coordinates
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
                        coordinates: nodes[wifiNodeName].coordinates,
                    },
                    [dstNodeName]: {
                        tx_rate: destPointData.tx_rate,
                        dst_mac: destPointData.dst_mac,
                        chains: destPointData.chains,
                        src_mac: destPointData.src_mac,
                        rx_rate: destPointData.rx_rate,
                        signal: destPointData.signal,
                        coordinates: nodes[dstNodeName].coordinates,
                    },
                };
                result[linkKey].addLink(new LinkDetail(entry));
            }
        }
    }

    return result;
};

/**
 * This class should store a group of links between the same geo coordinates.
 */
export class PontToPointLink {
    private _links: LinkDetail[] = [];
    public readonly id: string;
    public readonly coordinates: Coordinates[] = [];

    constructor(coord1: Coordinates, coord2: Coordinates) {
        this.id = PontToPointLink.generateId(coord1, coord2);
        this.coordinates.push(coord1, coord2);
    }

    addLink(link: LinkDetail) {
        this.links.push(link);
    }

    /**
     * For a given two macs check if any of the links on the _links array contain a node with this macs. (which should
     * mean that the link is already added on the array).
     * @param mac1
     * @param mac2
     */
    linkExists(mac1: string, mac2: string) {
        for (const link of this._links) {
            // Just needed to check the first node of the link object becouse the other will have the same macs but reversed
            const node = link.data[Object.keys(link.data)[0]];
            if (
                node &&
                (node.dst_mac.toLowerCase() === mac1.toLowerCase() ||
                    node.src_mac.toLowerCase() === mac1.toLowerCase()) &&
                (node.dst_mac.toLowerCase() === mac2.toLowerCase() ||
                    node.src_mac.toLowerCase() === mac2.toLowerCase())
            ) {
                return true;
            }
        }
        return false;
    }

    get names(): string[] {
        return [
            ...this._links.reduce((acc, link) => {
                Object.keys(link).forEach((key) => acc.add(key));
                return acc;
            }, new Set()),
        ] as string[];
    }

    get links() {
        return this._links;
    }

    /**
     * Generate a deterministic unique id based on the coordinates of a node.
     * @param coord1
     * @param coord2
     */
    static generateId(coord1: Coordinates, coord2: Coordinates): string {
        const _prepareCoord = (coord: string) =>
            parseFloat(coord.replace("-", "").replace(".", ""));

        const allCoordinates = [
            _prepareCoord(coord1.lon),
            _prepareCoord(coord1.lat),
            _prepareCoord(coord2.lon),
            _prepareCoord(coord2.lat),
        ];

        return allCoordinates.sort((a, b) => a - b).toString();
    }
}

export class LinkDetail {
    private _data: ILocatedLink;
    private _id: string;

    constructor(data: ILocatedLink) {
        this._data = data;
        // this._id = LinkDetail.generateId(data);
        this._id = LinkDetail.generateId(data);
    }

    /**
     * Deterministically generation of a unique id using the macs of this link
     * @param data
     */
    static generateId(data: ILocatedLink): string {
        return [
            ...Object.entries(data).map(([k, v]) => {
                return v.src_mac.toLowerCase().replace(/:/g, "");
            }),
        ]
            .sort()
            .join("");
    }

    get id() {
        return this._id;
    }

    get data() {
        return this._data;
    }

    get names(): string[] {
        return [...Object.keys(this._data)];
    }
}
