import { QueryKey } from "@tanstack/react-query";

import {
    MeshWideMapReferenceTypes,
    MeshWideMapTypes,
} from "components/shared-state/SharedStateTypes";

import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";

/**
 * Describe a link with a coordinates
 */

export type LinkDataTypes = {
    wifi_links_info: IWifiLinkData;
    bat_links_info: IBatManLinkData;
};
export type LinkType = keyof LinkDataTypes;
export type IBaseLink<T extends LinkType> = {
    [linkKey: string]: LinkDataTypes[T] & {
        dst_mac: string;
        src_mac: string;
        dst_loc?: Coordinates;
    };
};

export type BaseMacToMacLink = MacToMacLink<LinkType>;

/**
 * List of located links.
 *
 * Are grouped by id based on their coordinates
 *
 * The array of classes contains an indeterminated number of links that are from certain point to another.
 */
export type LocatedLinkData = {
    [key: string]: PontToPointLink;
};

/**
 * Link info retrieved from the API with the wifi data
 */
export type IWifiLinkData = {
    tx_rate: number;
    chains: number[];
    signal: number;
    rx_rate: number;
    channel: number;
};

/**
 * Link info retrieved from the API with the batman data
 */
export type IBatManLinkData = {
    hard_ifindex: number;
    last_seen_msecs: number;
    iface: string;
};

/**
 * List of Link info retrieved from the API
 */
export interface ILinks<T extends LinkType> {
    [nodeKey: string]: {
        src_loc: Coordinates;
        links: IBaseLink<T>;
    };
}

export type IWifiLinks = ILinks<"wifi_links_info">;
export type IBatmanLinks = ILinks<"bat_links_info">;

export type Coordinates = {
    lat: string;
    long: string;
};

export interface INodeInfo {
    bleachTTL: number;
    author: string;
    coordinates?: Coordinates; // Coordinates may not be set
    board: string;
    device: string;
    macs: string[];
    hostname: string;
    ipv4: string;
    ipv6: string;
    firmware_version: string;
    uptime: number;
}

export type INodes = { [key: string]: INodeInfo };

export type LinkMapFeature = {
    actual: PontToPointLink;
    reference: PontToPointLink;
};

export type NodeMapFeature = {
    actual: INodeInfo;
    reference: INodeInfo;
    name: string;
};

export type MeshWideDataError = {
    queryKey: QueryKey;
    error?: unknown;
    nodeNames?: string[];
};

export type InvalidNodes = Set<string>;
export type ErrorsDetails = {
    invalidNodes: Set<string>;
    meshWideDataErrors: MeshWideDataError[];
    dataNotSetErrors: MeshWideDataError[];
};

type FeatureMap = {
    node: NodeMapFeature;
    link: LinkMapFeature;
    errorsDetails: ErrorsDetails;
};

type FeatureType = keyof FeatureMap;

export type SelectedMapFeature = {
    [T in FeatureType]: {
        feature: FeatureMap[T];
        type: T;
        id: number | string;
    };
}[FeatureType];

export interface IMeshWideSection {
    name: string;
    options: { [key: string]: string };
}

export type IMeshWideConfig = IMeshWideSection[];

export enum WifiLinkErrorCodes {
    LINK_DOWN = "LINK_DOWN",
    SIGNAL_LOSS = "SIGNAL_LOSS",
    CHAIN_LOSS = "CHAIN_LOSS",
}

export enum BatmanLinkErrorCodes {
    LINK_DOWN = "LINK_DOWN",
}

export enum NodeErrorCodes {
    NODE_DOWN = "NODE_DOWN",
    MACS_MISSMATCH = "MACS_MISSMATCH",
}

/**
 * Store the error for every wifi node data. Use the ids for the point to point and mac to mac as dictionary
 */
export type ILinkMtoMErrors = {
    linkErrors: {
        [nodeName: string]: WifiLinkErrorCodes[] | BatmanLinkErrorCodes[];
    };
    hasErrors: boolean;
    linkUp: boolean;
};

export type ILinkPtoPErrors = {
    macToMacErrors: {
        [macToMacKey: MacToMacLinkId]: ILinkMtoMErrors;
    };
    hasErrors: boolean;
    linkUp: boolean;
};

export type ILinkErrors = {
    [pointToPointKey: MacToMacLinkId]: ILinkPtoPErrors;
};

/**
 * Type to store the link detail id
 */
export type MacToMacLinkId = string;

/**
 * Type to store a point to point link detail id, created deterministically by the
 * two geo points of this link
 */
export type PointToPointLinkId = string;

/**
 * Query keys types
 */
type AllMeshWideMapTypes = MeshWideMapTypes & MeshWideMapReferenceTypes;
export type MeshWideMapDataTypeKeys = keyof AllMeshWideMapTypes;
// Util in order to iterate over the keys of the DataTypeMap
type CompleteDataTypeKeys = { [K in MeshWideMapDataTypeKeys]: true };
const completeDataTypeKeys: CompleteDataTypeKeys = {
    node_info: true,
    wifi_links_info: true,
    bat_links_info: true,
    node_info_ref: true,
    wifi_links_info_ref: true,
    bat_links_info_ref: true,
};
export const getMeshWideMapTypes = () => {
    return Object.keys(completeDataTypeKeys) as MeshWideMapDataTypeKeys[];
};
