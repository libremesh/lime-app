import type { GeoJsonObject } from "geojson";

interface NodeData {
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

const isObject = (obj) => typeof obj === "object" && obj !== null;
const coordsToPoint = (coordinates, properties = {}) => ({
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: [Number(coordinates.lon), Number(coordinates.lat)],
    },
    properties,
});

const coordspairToLineString = (coordinates) => ({
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates,
    },
});

const pointIsIn = (lat, lon, point) => {
    const pointLat = point.geometry.coordinates[1];
    const pointLon = point.geometry.coordinates[0];
    return Number(pointLat) === Number(lat) && Number(pointLon) === Number(lon);
};

const removeDuplicates = (collection, getIdentifier) => {
    const identifierState = {};
    return collection.filter((value) => {
        const identifier = String(getIdentifier(value));
        if (identifierState[identifier]) {
            return false;
        }
        identifierState[identifier] = true;
        return true;
    });
};

export function getCommunityGeoJSON(
    nodesData: NodeData,
    keepClean = null
): GeoJsonObject {
    // nodes: {..., {hostname, coordinates, macs, links}} Nodes with potential links
    const nodes = Object.values(nodesData)
        .map((nodeData) => nodeData.data)
        .filter((n) => isObject(n)) // Filter completely corrupted nodes
        .filter(
            (n) =>
                !isNaN(Number(n.coordinates.lat)) ||
                !isNaN(Number(n.coordinates.lon))
        ) // Filter nodes without coordinates
        .filter((n) => n.macs.length); // Filter nodes without a macs list

    // geomac: {mac: [lat, lon]} Coordinates for each mac address
    const geomac_ = nodes.map((node) =>
        node.macs.map((mac) => [
            mac,
            [Number(node.coordinates.lon), Number(node.coordinates.lat)],
        ])
    );
    const geomac = Object.fromEntries(geomac_.flat());

    const macLinks_ = nodes.map((node) =>
        node.macs.map((mac) => [mac, node.links])
    );
    const macLinks = Object.fromEntries(macLinks_.flat());

    // geolink: [..., [[lat,lon], [lat,lon]]] All links as pair of coordinates
    let geolinks = nodes
        .map((node) =>
            node.links
                .filter((mac) => mac in geomac)
                //Keep only links if both nodes say there is a link
                .filter((mac) =>
                    node.macs.some(
                        (node_mac) => macLinks[mac].indexOf(node_mac) != -1
                    )
                )
                .map((mac) => [geomac[node.macs[0]], geomac[mac]].sort())
        )
        .flat();
    geolinks = removeDuplicates(geolinks, (l) => `${l[0]},${l[1]}`);

    // nodefeatures: [..., GeoJSONFeature:Point] All nodes to be shown
    let nodefeatures = nodes.map((node) =>
        coordsToPoint(node.coordinates, { name: node.hostname })
    );
    if (keepClean) {
        const [lon, lat] = keepClean;
        nodefeatures = nodefeatures.filter(
            (point) => !pointIsIn(lat, lon, point)
        );
    }

    // linksfeatures: [..., GeoJSONFeature:LineString]
    const linksfeatures = geolinks.map(coordspairToLineString);

    const features = [...nodefeatures, ...linksfeatures];

    const geoJSON = {
        type: "FeatureCollection",
        features,
    };
    return geoJSON as GeoJsonObject;
}
