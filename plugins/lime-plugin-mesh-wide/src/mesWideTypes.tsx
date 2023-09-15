import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";

/**
 * Describe a link with a coordinates
 */
export type ILocatedLink = {
    [key: string]: IWifiLinkData & {
        coordinates: Coordinates;
    };
};

/**
 * List of located links.
 *
 * Are grouped by id based on their coordinates
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
    bleachTTL: number;
    author: string;
    data: {
        coordinates?: Coordinates; // Coordinates may not be set
        board: string;
        device: string;
        macs: string[];
        hostname: string;
        ipv4: string;
        ipv6: string;
        firmware_version: string;
        uptime: number;
    };
}

export type INamedNodeInfo = {
    name: string;
} & INodeInfo;

export type INodes = { [key: string]: INodeInfo };

type FeatureType = "node" | "link" | "invalidNodes";

export type LinkMapFeature = {
    actual: PontToPointLink;
    reference: PontToPointLink;
};

export type NodeMapFeature = {
    actual: INodeInfo;
    reference: INodeInfo;
    name: string;
};

export type InvalidNodes = Set<string>;

type MapFeature = NodeMapFeature | LinkMapFeature | InvalidNodes;

export interface SelectedMapFeature {
    feature: MapFeature;
    type: FeatureType;
    id: number | string;
}

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

export enum NodeErrorCodes {
    NODE_DOWN = "NODE_DOWN",
    MACS_MISSMATCH = "MACS_MISSMATCH",
}

/**
 * Store the error for every wifi node data. Use the ids for the point to point and mac to mac as dictionary
 */
export type ILinkMtoMErrors = {
    linkErrors: {
        [nodeName: string]: WifiLinkErrorCodes[];
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
 * Type to store the link detail id, created deterministically by the
 * two macs of this link
 */
export type MacToMacLinkId = string;

/**
 * Type to store a point to point link detail id, created deterministically by the
 * two geo points of this link
 */
export type PointToPointLinkId = string;
