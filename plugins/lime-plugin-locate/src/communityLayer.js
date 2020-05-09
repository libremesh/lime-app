const isObject = (obj) => typeof obj === 'object' && obj !== null;

const sameLocation = (coord1, coord2) => Number(coord1.lon) === Number(coord2.lon) && Number(coord1.lat) === Number(coord2.lat);

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

const coordsToPoint = ({ coordinates, hostname }) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [Number(coordinates.lon), Number(coordinates.lat)] }, properties: { name: hostname } });

const coordspairToLineString = (coordinates) => ({ type: 'Feature', geometry: { type: 'LineString', coordinates } });

export function getCommunityLayer(hostname, stationLocation, nodeshash) {
    //Run only if leaflet is loaded
    let nodes = Object.values(nodeshash)
        .filter(node => isObject(node))
        .filter(n => !isNaN(Number(n.coordinates.lat))); // Filter nodes without coordinates
    const thisnode = nodes.filter(n => n.hostname === hostname)
    if (thisnode) {
        thisnode[0].coordinates = stationLocation
    }
    // geomac being the hash of locations of nodes indexed by mac
    let geomac = nodes     // to those nodes
        .filter(n => n.macs) // that actually have a macs list
        .map(
            node => node.macs.filter(mac => mac) // only if value exists
                .map((mac) => [mac, [Number(node.coordinates.lon), Number(node.coordinates.lat)]])
        )                    // get their locations
        .reduce((all, macs) => [...all, ...macs], [])
        .reduce((hash, mac) => { hash[mac[0]] = mac[1]; return hash; }, {}); // and add it to a hash

    // geolinks is the list of pair of locations between nodes that are connected to each other
    let links = nodes
        .reduce((links, node) =>
            [
                ...links,
                ...(node.links.filter(mac => mac in geomac)     // for the links to macs that have geolocation
                    .map(mac => [node.macs[0], mac].sort())       // add the sorted tuple of that link
                )
            ], []);
    // TODO build map with links macs not in geomac
    links = removeDuplicates(links, l => l[0] + ',' + l[1]);

    let geolinks = links
        .map(macpair => [geomac[macpair[0]], geomac[macpair[1]]]); // turn the links mac list into a links geolocation list

    let nodefeatures = nodes
        .filter(n => ! sameLocation(n.coordinates, stationLocation))
        .map(coordsToPoint);

    let linksfeatures = geolinks.map(link => coordspairToLineString(link));

    let features = [...nodefeatures, ...linksfeatures];

    let geojsonFeature = {
        type: 'FeatureCollection',
        features
    };
    const layer = L.geoJSON(geojsonFeature,{
        onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
                layer.bindTooltip(feature.properties.name).openTooltip();
            }
        }
    })
    return layer
}
