import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/utils/getLinksCoordinates";

/**
 * Describe a link with a coordinates
 */
export type ILocatedLink = {
    [key: string]: IWifiLinkData & {
        coordinates: Coordinates;
    };
};

/**
 * List of located links. Are grouped by id based on their coordinates
 *
 * The array of classes contain an indeterminated number of links that are from certain point to another.
 */
export type LocatedWifiLinkData = {
    [key: string]: PontToPointLink;
};

/**
 * Link info retrieved from the API
 */
export interface IWifiLinkData {
    tx_rate: number;
    dst_mac: string;
    chains: number[];
    signal: number;
    rx_rate: number;
    src_mac: string;
}

/**
 * List of Link info retrieved from the API
 */
export interface IWifiLinks {
    [key: string]: {
        bleachTTL: number;
        data: IWifiLinkData[];
        author: string;
    };
}

export type Coordinates = {
    lat: string;
    lon: string;
};

export interface INodeInfo {
    coordinates: Coordinates;
    macs: string[];
    ipv4: string;
    ipv6: string;
    firmware_version: string;
    uptime: string;
    device: string;
}

export type INodes = { [key: string]: INodeInfo };

export interface SelectedMapFeature {
    // feature: Feature<GeometryObject, { [p: string]: any }>;
    feature: INodeInfo | IWifiLinkData;
    id: number | string;
}

// export interface MeshWideStatus {
//     [key: string]: {
//         bleachTTL: number;
//         data: {
//             hostname: string;
//             coordinates: {
//                 lon: string;
//                 lat: string;
//             };
//             macs: string[];
//             links: string[];
//         };
//         author: string;
//     };
// }
//
// export interface IMeshWideStatusResponse {
//     result: MeshWideStatus;
// }

// export interface INodeDetailFeature {
//     name: string;
//     uptime: string;
//     firmware: string;
//     ipv6: string;
//     ipv4: string;
//     device: string;
// }
//
// export interface ILinkDetailFeature {
//     name: string;
//     gain: string;
//     linkType: string;
// }

export interface IMeshWideSection {
    name: string;
    options: { [key: string]: string };
}

export type IMeshWideConfig = IMeshWideSection[];
