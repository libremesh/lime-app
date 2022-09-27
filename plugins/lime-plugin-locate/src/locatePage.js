/* eslint-disable no-undef */
import { Trans } from "@lingui/macro";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Loading } from "components/loading";

import { useBoardData } from "utils/queries";

import { homeIcon, loadGoogleMapsApi, loadLeafLet } from "./assetsUtils";
import { getCommunityGeoJSON } from "./communityGeoJSON";
import {
    changeLocation,
    loadLocation,
    loadLocationLinks,
    toogleEdit,
} from "./locateActions";
import { getLat, getLon, isCommunityLocation } from "./locateSelectors";
import style from "./style";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

function setupMap() {
    /** Initialize the leaflet map */
    const map = L.map("map-container");
    window.map = map;
    // Load layers
    require("leaflet.gridlayer.googlemutant");
    const satellite = L.gridLayer.googleMutant({ type: "satellite" });
    const hybrid = L.gridLayer.googleMutant({ type: "hybrid" });
    const osm = L.tileLayer(openStreetMapTileString, {
        attribution: openStreetMapAttribution,
    });
    // Add layers controller on bottom right corner
    L.control
        .layers(
            {
                "Open Street Map": osm,
                "Google Maps Satellite": satellite,
                "Google Maps Hybrid": hybrid,
            },
            {},
            { position: "bottomright" }
        )
        .addTo(map);
    // Setup Open Street Map as base layer
    osm.addTo(map);
    return map;
}

function getCommunityLayer(nodeHostname, stationLat, stationLon, nodesData) {
    /** Create a Leaflet layer with community nodes and links to be added to the map*/
    if (nodesData[nodeHostname]) {
        nodesData[nodeHostname].data.coordinates = {
            lat: stationLat,
            lon: stationLon,
        };
    }
    // Get community GeoJSON, filter out nodes in same location as station host.
    let geoJSON = getCommunityGeoJSON(nodesData, [stationLon, stationLat]);
    const layer = L.geoJSON(geoJSON, {
        onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
                layer.bindTooltip(feature.properties.name).openTooltip();
            }
        },
    });
    return layer;
}

export const LocatePage = ({
    editting,
    submitting,
    stationLat,
    stationLon,
    nodesData,
    isCommunityLocation,
    loadLocation,
    loadLocationLinks,
    changeLocation,
    toogleEdit,
}) => {
    const { data: boardData } = useBoardData();
    const [loading, setLoading] = useState(true);
    const [assetError, setAssetError] = useState(false);
    const [map, setMap] = useState(null);
    const [nodeMarker, setNodeMarker] = useState(null);
    const [communityLayer, setCommunityLayer] = useState(null);

    // Load third parties assests in component mount
    useEffect(() => {
        Promise.all([loadLeafLet(), loadGoogleMapsApi()])
            .then(onAssetsLoad) // Setup the map
            .catch(onAssetsError)
            .then(loadLocation) // Load node location
            .then(loadLocationLinks); // Load community locations
    }, [loadLocation, loadLocationLinks]);

    // Set map position when map is available or location gets updated
    useEffect(() => {
        function updateNodeMarker(lat, lon) {
            if (nodeMarker) {
                nodeMarker.setLatLng([lat, lon]);
            } else {
                const marker = L.marker([lat, lon], {
                    icon: L.icon(homeIcon),
                    alt: "node marker",
                }).addTo(map);
                setNodeMarker(marker);
            }
        }

        if (map && stationLat) {
            map.setView([stationLat, stationLon], 13);
            updateNodeMarker(stationLat, stationLon);
        } else if (map) {
            map.setView([-30, -60], 3);
        }
    }, [stationLat, stationLon, map, nodeMarker]);

    // Center the map on the node also when editting is turned on
    useEffect(() => {
        if (map && stationLat) {
            editting && map.setView([stationLat, stationLon], 13);
        }
    }, [map, editting, stationLat, stationLon]);

    function onAssetsLoad() {
        // A promise to avoid raise condition between loadLocation and onAssetLoad
        return new Promise((resolve) => {
            const map = setupMap();
            setLoading(false);
            setMap(map);
            resolve();
        });
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
            toogleCommunityLayer();
        }
    }

    function toogleCommunityLayer() {
        if (communityLayer) {
            map.removeLayer(communityLayer);
            setCommunityLayer(null);
        } else {
            const layer = getCommunityLayer(
                boardData.hostname,
                stationLat,
                stationLon,
                nodesData
            );
            layer.addTo(map);
            setCommunityLayer(layer);
        }
    }

    function isReady() {
        return !loading && typeof stationLat !== "undefined";
    }

    const hasLocation = stationLat && !isCommunityLocation;

    function toogleEditFalse() {
        toogleEdit(false);
    }

    function toogleEditTrue() {
        toogleEdit(true);
    }

    if (assetError) {
        return (
            <div id="map-container" className={style.hasAssetError}>
                <Trans>Cannot load map, check your internet connection</Trans>
            </div>
        );
    }

    return (
        <div>
            <div id="map-container" className={style.mapContainer}>
                {(!isReady() || submitting) && (
                    <div
                        id="loading-container"
                        className={style.loadingContainer}
                    >
                        <Loading />
                    </div>
                )}
                {editting && (
                    <div
                        id="location-marker"
                        className={style.locationMarker}
                    />
                )}
            </div>
            {isReady() && (
                <div id="edit-action" className={style.editAction}>
                    {/* Actions while editting */}
                    {editting && (
                        <button onClick={onConfirmLocation}>
                            <Trans>confirm location</Trans>
                        </button>
                    )}
                    {editting && (
                        <button onClick={toogleEditFalse}>
                            <Trans>cancel</Trans>
                        </button>
                    )}
                    {/* Actions while not editting */}
                    {!editting && hasLocation && (
                        <button onClick={toogleEditTrue}>
                            <Trans>edit location</Trans>
                        </button>
                    )}
                    {!editting && !hasLocation && (
                        <button onClick={toogleEditTrue}>
                            <Trans>locate my node</Trans>
                        </button>
                    )}
                    {!editting && (
                        <button onClick={toogleCommunityLayer}>
                            {communityLayer ? (
                                <Trans>hide community</Trans>
                            ) : (
                                <Trans>show community</Trans>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    stationLat: getLat(state),
    stationLon: getLon(state),
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
