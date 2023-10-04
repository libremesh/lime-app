import {
    BaseMacToMacLink,
    Coordinates,
    ILocatedLink,
    LinkData,
    LinkType,
    MacToMacLinkId,
    PointToPointLinkId,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

/**
 * This class should store a group of links between the same geo coordinates.
 *
 * Could store two links between same geo but with different macs
 */
export class PontToPointLink {
    private _links: BaseMacToMacLink[] = [];
    public readonly id: PointToPointLinkId;
    public readonly coordinates: Coordinates[] = [];

    constructor(coord1: Coordinates, coord2: Coordinates) {
        this.id = PontToPointLink.generateId(coord1, coord2);
        this.coordinates.push(coord1, coord2);
    }

    addLink(link: typeof this._links[number]) {
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

    get type(): LinkType {
        return this._links[0].type;
    }
}

/**
 * Store link info between two macs
 */
export class MacToMacLink<T extends LinkType> {
    private _data: ILocatedLink<T>;
    private _id: MacToMacLinkId;
    public type: T;

    constructor(data: ILocatedLink<T>, type: T) {
        this._data = data;
        this._id = MacToMacLink.generateId(data);
        this.type = type;
    }

    /**
     * Deterministically generation of a unique id using the macs of this link. Concatenate the sorted macs that
     * are involved on this link
     * @param data
     */
    static generateId(data: ILocatedLink<LinkType>): MacToMacLinkId {
        return [
            ...Object.entries(data).map(([k, v]) => {
                return v.src_mac?.toLowerCase().replace(/:/g, "");
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

    linkByName(name: string): LinkData[T] {
        return this._data[name];
    }
}
