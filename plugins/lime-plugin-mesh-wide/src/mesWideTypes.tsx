import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";

/**
 * Describe a link with a coordinates
 */
export type LinkData = { wifi: IWifiLinkData; batman: IBatManLinkData };
export type LinkType = keyof LinkData;
export type ILocatedLink<T extends LinkType> = {
    [key: string]: LinkData[T] & {
        coordinates: Coordinates;
    };
};
export type BaseMacToMacLink = MacToMacLink<LinkType>;

/**
 * List of located links.
 *
 * Are grouped by id based on their coordinates
 *
 * The array of classes contain an indeterminated number of links that are from certain point to another.
 */
export type LocatedLinkData = {
    [key: string]: PontToPointLink;
};

type MacPair = {
    dst_mac: string;
    src_mac: string;
};

/**
 * Link info retrieved from the API with the wifi data
 */
export type IWifiLinkData = {
    tx_rate: number;
    chains: number[];
    signal: number;
    rx_rate: number;
} & MacPair;

/**
 * Link info retrieved from the API with the batman data
 */
export type IBatManLinkData = {
    hard_ifindex: number;
    last_seen_msecs: number;
    iface: string;
} & MacPair;

/**
 * List of Link info retrieved from the API
 */
// export interface ILinks<T extends IBatManLinkData[] | IWifiLinkData[]> {
export interface ILinks<T extends LinkType> {
    [key: string]: {
        bleachTTL: number;
        data: Array<LinkData[T]>;
        author: string;
    };
}

export type IWifiLinks = ILinks<"wifi">;
export type IBatmanLinks = ILinks<"batman">;

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

export type InvalidNodes = Set<string>;

type FeatureMap = {
    node: NodeMapFeature;
    link: LinkMapFeature;
    invalidNodes: InvalidNodes;
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
 * Type to store the link detail id, created deterministically by the
 * two macs of this link
 */
export type MacToMacLinkId = string;

/**
 * Type to store a point to point link detail id, created deterministically by the
 * two geo points of this link
 */
export type PointToPointLinkId = string;
