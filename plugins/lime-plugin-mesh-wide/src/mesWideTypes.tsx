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
