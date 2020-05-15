import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'preact/hooks';

import { loadLocation, changeLocation, loadLocationLinks, toogleEdit } from './locateActions';
import { getSelectedHost, getLat, getLon, isCommunityLocation } from './locateSelectors';
import { getCommunityGeoJSON } from './communityGeoJSON';
import { loadLeafLet, loadGoogleMapsApi, homeIcon } from './assetsUtils';

import { Loading } from '../../../src/components/loading';
import './style.less';

const openStreetMapTileString = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const openStreetMapAttribution = '&copy; <a href="http://osm.org/copyright">\
                                  OpenStreetMap</a> contributors'

function setupMap() {
    /** Initialize the leaflet map */
    const map = L.map('map-container');
    window.map = map;
    // Load layers
    require('leaflet.gridlayer.googlemutant');
    const satellite = L.gridLayer.googleMutant({ type: 'satellite' });
    const hybrid = L.gridLayer.googleMutant({ type: 'hybrid' });
    const osm = L.tileLayer(openStreetMapTileString, { attribution: openStreetMapAttribution })
    // Add layers controller on bottom right corner
    L.control.layers({
        'Open Street Map': osm,
        'Google Maps Satellite': satellite,
        'Google Maps Hybrid': hybrid
    }, {}, { position: 'bottomright' }).addTo(map);
    // Setup Open Street Map as base layer
    osm.addTo(map);
    return map
}

function getCommunityLayer(stationHostname, stationLat, stationLon, nodesData) {
    /** Create a Leaflet layer with community nodes and links to be added to the map*/
    if (stationHostname in nodesData) {
        // Override station coordinates in nodesData
        nodesData[stationHostname].data.coordinates = { lat: stationLat, lon: stationLon };
    }
    // Get community GeoJSON, filter out nodes in same location as station host.
    let geoJSON = getCommunityGeoJSON(nodesData, [stationLon, stationLat]);
    const layer = L.geoJSON(geoJSON, {
        onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
                layer.bindTooltip(feature.properties.name).openTooltip();
            }
        }
    })
    return layer;
}

const LocatePage = ({ editting, submitting, stationHostname, stationLat, stationLon, nodesData,
    isCommunityLocation, loadLocation, loadLocationLinks, changeLocation, toogleEdit }) => {
    const [loading, setLoading] = useState(true);
    const [assetError, setAssetError] = useState(false);
    const [map, setMap] = useState(null);
    const [nodeMarker, setNodeMarker] = useState(null);
    const [communityLayer, setCommunityLayer] = useState(null);

    // Load third parties assests in component mount
    useEffect(() => {
        Promise.all([
            loadLeafLet(),
            loadGoogleMapsApi()
        ])
        .then(onAssetsLoad) // Setup the map
        .catch(onAssetsError)
        .then(loadLocation) // Load node location
        .then(loadLocationLinks) // Load community locations
    }, []);

    // Set map position when map is available or location gets updated
    useEffect(() => {
        if (map && stationLat) {
            map.setView([stationLat, stationLon], 13);
            updateNodeMarker(stationLat, stationLon);
        } else if (map){
            map.setView([-30, -60], 3)
        }
    }, [stationLat, stationLon, map])

    // Center the map on the node also when editting is turned on
    useEffect(() => {
        if (map && stationLat){
            editting && map.setView([stationLat, stationLon], 13);
        }
    }, [editting])

    function onAssetsLoad() {
        // A promise to avoid raise condition between loadLocation and onAssetLoad
        return new Promise((resolve) => {
            const map = setupMap();
            setLoading(false);
            setMap(map);
            resolve();
        })
    }

    function onAssetsError() {
        setLoading(false);
        setAssetError(true);
    }

    function onConfirmLocation() {
        const position = map.getCenter();
        const lat = position.lat_neg ? position.lat * -1 : position.lat;
        const lon = position.lng_neg ? position.lng * -1 : position.lng;
        changeLocation({ lat, lon });
        if (communityLayer) {
            // Hide the community view, to avoid outdated links
            toogleCommunityLayer()
        }
    }

    function updateNodeMarker(lat, lon) {
        if (nodeMarker) {
            nodeMarker.setLatLng([lat, lon]);
        } else {
            const marker = L.marker([lat, lon], { icon: L.icon(homeIcon), alt:"node marker"}).addTo(map);
            setNodeMarker(marker);
        }
    }

    function toogleCommunityLayer() {
        if (communityLayer) {
            map.removeLayer(communityLayer);
            setCommunityLayer(null);
        } else {
            const layer = getCommunityLayer(stationHostname, stationLat, stationLon, nodesData);
            layer.addTo(map);
            setCommunityLayer(layer);
        }
    }

    function isReady() {
        return !loading && typeof (stationLat) !== 'undefined';
    }

    const hasLocation = stationLat && !isCommunityLocation;

    return (
        <div>
            <div id='map-container'>
                {(!isReady() || submitting) &&
                    <div id='loading-container'>
                        <Loading></Loading>
                    </div>
                }
                {assetError && 'Cannot load map, check your internet connection'}
                {editting && <div id="location-marker"></div>}
            </div>
            {isReady() &&
                <div id="edit-action">
                    {/* Actions while editting */}
                    {editting &&
                        <button onClick={onConfirmLocation}>confirm location</button>
                    }
                    {editting &&
                        <button onClick={() => toogleEdit(false)}>cancel</button>
                    }
                    {/* Actions while not editting */}
                    {!editting && hasLocation &&
                        <button onClick={() => toogleEdit(true)}>edit location</button>
                    }
                    {!editting && !hasLocation &&
                        <button onClick={() => toogleEdit(true)}>locate my node</button>
                    }
                    {!editting &&
                        <button onClick={() => toogleCommunityLayer()}>
                            {communityLayer ? 'hide community' : 'show community'}
                        </button>
                    }
                </div>
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    stationLat: getLat(state),
    stationLon: getLon(state),
    stationHostname: getSelectedHost(state),
    isCommunityLocation: isCommunityLocation(state),
    nodesData: state.locate.nodesData,
    submitting: state.locate.submitting,
    editting: state.locate.editting,
});

const mapDispatchToProps = (dispatch) => ({
    loadLocation: bindActionCreators(loadLocation, dispatch),
    loadLocationLinks: bindActionCreators(loadLocationLinks, dispatch),
    changeLocation: bindActionCreators(changeLocation, dispatch),
    toogleEdit: bindActionCreators(toogleEdit, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocatePage);
