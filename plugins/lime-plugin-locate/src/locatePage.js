import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'preact/hooks';

import { loadLocation, changeLocation, loadLocationLinks, toogleEdit } from './locateActions';
import { getSelectedHost, getLat, getLon, isCommunityLocation } from './locateSelectors';
import { getCommunityLayer } from './communityLayer';
import { loadLeafLet, loadGoogleMapsApi, homeIcon } from './assetsUtils';

import { Loading } from '../../../src/components/loading';
import './style.less';

const openStreetMapTileString = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const openStreetMapAttribution = '&copy; <a href="http://osm.org/copyright">\
                                  OpenStreetMap</a> contributors'

function setupMap() {
    /** Initialize the leaflet map centered in the middle of the ocean*/
    const map = L.map('map-container').setView([0, 0], 13);
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

const LocatePage = ({ editting, submitting, stationHostname, stationLat, stationLon, nodeshash, isCommunityLocation, loadLocation, loadLocationLinks, changeLocation, toogleEdit }) => {
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

    // Center the map on node location when node location gets updated
    useEffect(() => {
        if (stationLat) {
            map.setView([stationLat, stationLon]);
            updateNodeMarker(stationLat, stationLon);
        }
    }, [stationLat, stationLon])

    // Center the map on the node also when editting is turned on
    useEffect(() => {
        editting && map.setView([stationLat, stationLon]);
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
        const { lat, lng, lat_neg, lng_neg } = map.getCenter();
        const lat = lat_neg ? lat * -1 : lat;
        const lon = lng_neg ? lng * -1 : lng;
        changeLocation({ lat, lon });
        if (communityLayer) {
            // Hide the community view, to avoid outdated links
            toogleCommunity()
        }
    }

    function updateNodeMarker(lat, lon) {
        if (nodeMarker) {
            nodeMarker.setLatLng([lat, lon]);
        } else {
            const marker = L.marker([lat, lon], { icon: L.icon(homeIcon) }).addTo(map);
            setNodeMarker(marker);
        }
    }

    function toogleCommunityLayer() {
        if (communityLayer) {
            map.removeLayer(communityLayer);
            setCommunityLayer(null);
        } else {
            const latlong = { lat: stationLat, lon: stationLon }
            const layer = getCommunityLayer(stationHostname, latlong, nodeshash, map);
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
                {editting && <div id="node-marker"></div>}
            </div>
            {isReady() &&
                <div id="edit-action">
                    {/* Actions while editting */}
                    {editting &&
                        <button onClick={onConfirmLocation}>Confirm Location</button>
                    }
                    {editting &&
                        <button onClick={() => toogleEdit(false)}>Cancel</button>
                    }
                    {/* Actions while not editting */}
                    {!editting && hasLocation &&
                        <button onClick={() => toogleEdit(true)}>Edit Location</button>
                    }
                    {!editting && !hasLocation &&
                        <button onClick={() => toogleEdit(true)}>Locate my node</button>
                    }
                    {!editting &&
                        <button onClick={() => toogleCommunityLayer()}>
                            {communityLayer ? 'Hide Community' : 'Show Community'}
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
    nodeshash: state.locate.nodeshash,
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
