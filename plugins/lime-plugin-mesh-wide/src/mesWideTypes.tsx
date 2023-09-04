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
    coordinates: Coordinates;
    macs: string[];
    ipv4: string;
    ipv6: string;
    firmware_version: string;
    uptime: string;
    device: string;
}

export type INamedNodeInfo = {
    name: string;
} & INodeInfo;

export type INodes = { [key: string]: INodeInfo };

type FeatureType = "node" | "link";

export type LinkMapFeature = {
    actual: PontToPointLink;
    reference: PontToPointLink;
};

type MapFeature = INamedNodeInfo | LinkMapFeature;

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

/**
 * Store the error for every wifi node data. Use the ids for the point to point and mac to mac as dictionary
 */
export type ILinkErrors = {
    [macToMacKey: MacToMacLinkId]: {
        [nodeName: string]: WifiLinkErrorCodes[];
    };
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
