/* eslint-disable no-undef */
import { Trans } from "@lingui/macro";
import L, { LatLngExpression, icon } from "leaflet";
import { useEffect, useRef, useState } from "preact/hooks";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Loading } from "components/loading";

import {
    loadLocation,
    loadLocationLinks,
    toogleEdit,
} from "plugins/lime-plugin-locate/src/locateActions";
import { changeLocation } from "plugins/lime-plugin-locate/src/locateApi";
import {
    getLat,
    getLon,
    isCommunityLocation,
} from "plugins/lime-plugin-locate/src/locateSelectors";

import { useBoardData } from "utils/queries";

import { getCommunityGeoJSON } from "./communityGeoJSON";
import { homeIcon, loadLeafLet } from "./leafletUtils";
import style from "./style.less";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

function getCommunityLayer(nodeHostname, stationLat, stationLon, nodesData) {
    /** Create a Leaflet layer with community nodes and links to be added to the map*/
    if (nodesData[nodeHostname]) {
        nodesData[nodeHostname].data.coordinates = {
            lat: stationLat,
            lon: stationLon,
        };
    }
    // Get community GeoJSON, filter out nodes in same location as station host.
    const geoJSON = getCommunityGeoJSON(nodesData, [stationLon, stationLat]);
    return L.geoJSON(geoJSON, {
        onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
                layer.bindTooltip(feature.properties.name).openTooltip();
            }
        },
    });
}

type LocatePageType = {
    editting: boolean;
    submitting: boolean;
    stationLat?: number;
    stationLon?: number;
    nodesData: any;
    isCommunityLocation: boolean;
    loadLocation?: () => void;
    loadLocationLinks?: () => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    changeLocation?: ({ lat, lon }: { lat: number; lon: number }) => {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    toogleEdit?: (b: boolean) => {};
};

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
}: LocatePageType) => {
    const { data: boardData } = useBoardData();
    const [loading, setLoading] = useState(true);
    const [assetError, setAssetError] = useState(false);
    const [nodeMarker, setNodeMarker] = useState<LatLngExpression>(null);
    const [communityLayer, setCommunityLayer] = useState(null);

    const mapRef = useRef<L.Map | null>();

    // Load third parties assests in component mount
    useEffect(() => {
        Promise.all([loadLeafLet()])
            .then(onAssetsLoad) // Setup the map
            .catch(onAssetsError)
            .then(loadLocation) // Load node location
            .then(loadLocationLinks); // Load community locations
    }, [loadLocation, loadLocationLinks]);

    // Set map position when map is available or location gets updated
    useEffect(() => {
        function updateNodeMarker(lat, lon) {
            setNodeMarker([lat, lon]);
        }
        const mapInstance = mapRef.current;

        if (!loading && mapInstance && stationLat) {
            mapInstance.setView([stationLat, stationLon], 13);
            updateNodeMarker(stationLat, stationLon);
        }
    }, [stationLat, stationLon, loading]);

    // Center the map on the node also when editting is turned on
    useEffect(() => {
        const map = mapRef.current;
        if (map && stationLat) {
            editting && map.setView([stationLat, stationLon], 13);
        }
    }, [mapRef, editting, stationLat, stationLon]);

    function onAssetsLoad() {
        // A promise to avoid raise condition between loadLocation and onAssetLoad
        return new Promise<void>((resolve) => {
            setLoading(false);
            resolve();
        });
    }

    function onAssetsError() {
        setLoading(false);
        setAssetError(true);
    }

    function onConfirmLocation() {
        const position = mapRef.current.getCenter();
        const lat = position.lat;
        const lon = position.lng;
        if (changeLocation) changeLocation({ lat, lon });
        if (communityLayer) {
            // Hide the community view, to avoid outdated links
            toogleCommunityLayer();
        }
    }

    function toogleCommunityLayer() {
        if (communityLayer) {
            mapRef.current.removeLayer(communityLayer);
            setCommunityLayer(null);
        } else {
            const layer = getCommunityLayer(
                boardData.hostname,
                stationLat,
                stationLon,
                nodesData
            );
            layer.addTo(mapRef.current);
            setCommunityLayer(layer);
        }
    }

    function isReady() {
        return !loading && typeof stationLat !== "undefined";
    }

    const hasLocation = stationLat && !isCommunityLocation;

    function toogleEdition() {
        if (toogleEdit) toogleEdit(!editting);
    }

    if (assetError) {
        return (
            <div id="map-container" className={style.hasAssetError}>
                <Trans>Cannot load map, check your internet connection</Trans>
            </div>
        );
    }

    return (
        <>
            {(!isReady() || submitting) && (
                <div id="loading-container" className={style.loadingContainer}>
                    <Loading />
                </div>
            )}
            {isReady() && (
                <MapContainer
                    center={[-30, -60]}
                    zoom={3}
                    scrollWheelZoom={true}
                    className={style.mapContainer}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution={openStreetMapAttribution}
                        url={openStreetMapTileString}
                    />
                    {nodeMarker && (
                        <Marker
                            position={nodeMarker}
                            icon={icon({ ...homeIcon })}
                        />
                    )}
                    {editting && (
                        <div
                            id="location-marker"
                            className={style.locationMarker}
                        />
                    )}
                </MapContainer>
            )}
            {isReady() && (
                <div id="edit-action" className={style.editAction}>
                    {editting && (
                        <button onClick={onConfirmLocation}>
                            <Trans>confirm location</Trans>
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

                    <button onClick={toogleEdition}>
                        {editting && <Trans>cancel</Trans>}
                        {!editting && hasLocation && (
                            <Trans>edit location</Trans>
                        )}
                        {!editting && !hasLocation && (
                            <Trans>locate my node</Trans>
                        )}
                    </button>
                </div>
            )}
        </>
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
