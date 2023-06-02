import { Feature, GeometryObject } from "geojson";

export interface MeshWideStatus {
    [key: string]: {
        bleachTTL: number;
        data: {
            hostname: string;
            coordinates: {
                lon: string;
                lat: string;
            };
            macs: string[];
            links: string[];
        };
        author: string;
    };
}

export interface IMeshWideStatusResponse {
    result: MeshWideStatus;
}

export interface SelectedMapFeature {
    feature: Feature<GeometryObject, { [p: string]: any }>;
    id: number;
}

export interface INodeDetailFeature {
    name: string;
    uptime: string;
    firmware: string;
    ipv6: string;
    ipv4: string;
    device: string;
}

export interface ILinkDetailFeature {
    name: string;
    gain: string;
    linkType: string;
}

export interface IMeshWideSection {
    name: string;
    options: { [key: string]: string };
}

export type IMeshWideConfig = [IMeshWideSection];
