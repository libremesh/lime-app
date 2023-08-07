import { Feature, GeometryObject } from "geojson";

export interface IWifiLinkData {
    tx_rate: number;
    dst_mac: string;
    chains: number[];
    signal: number;
    rx_rate: number;
    src_mac: string;
}

export interface IWifiLinks {
    [key: string]: {
        bleachTTL: number;
        data: IWifiLinkData[];
        author: string;
    };
}

export interface INodeInfo {
    coordinates: {
        lat: string;
        lon: string;
    };
    macs: string[];
    ipv4: string;
    ipv6: string;
    firmware_version: string;
    uptime: string;
    device: string;
}

export type INodes = { [key: string]: INodeInfo };

export interface SelectedMapFeature {
    feature: Feature<GeometryObject, { [p: string]: any }>;
    id: number;
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
