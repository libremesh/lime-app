import {
    Coordinates,
    ILocatedLink,
    INodes,
    IWifiLinks,
    LocatedWifiLinkData,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const mergeLinksAndCoordinates = (
    nodes: INodes,
    links: IWifiLinks
): LocatedWifiLinkData => {
    if (!nodes || !links) return {};
    const result: LocatedWifiLinkData = {};

    for (const pointId in links) {
        for (const data of links[pointId].data) {
            const dstPointId = Object.keys(nodes).find((pid) => {
                return nodes[pid].macs.filter((nodeMac) =>
                    nodeMac.toLowerCase().includes(data.dst_mac.toLowerCase())
                );
            });

            if (dstPointId && dstPointId !== pointId) {
                const linkKey = PontToPointLink.generateId(
                    nodes[pointId].coordinates,
                    nodes[dstPointId!].coordinates
                );

                if (!result[linkKey]) {
                    result[linkKey] = new PontToPointLink(
                        nodes[pointId].coordinates,
                        nodes[dstPointId!].coordinates
                    );
                }

                const entry: ILocatedLink = {
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
                result[linkKey].addLink(entry);
            }
        }
    }

    return result;
};

/**
 * This class should store a group of links between the same geo coordinates.
 */
export class PontToPointLink {
    private _links: ILocatedLink[] = [];
    public readonly id: string;
    public readonly coordinates: Coordinates[] = [];

    constructor(coord1: Coordinates, coord2: Coordinates) {
        this.id = PontToPointLink.generateId(coord1, coord2);
        this.coordinates.push(coord1, coord2);
    }

    addLink(link: ILocatedLink) {
        this.links.push(link);
    }

    get links() {
        return this._links;
    }

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
