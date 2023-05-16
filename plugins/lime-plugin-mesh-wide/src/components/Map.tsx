import { FeatureCollection } from "geojson";
import L from "leaflet";
import { useEffect, useRef, useState } from "preact/hooks";
import { MapContainer, TileLayer } from "react-leaflet";

import { getCommunityGeoJSON } from "plugins/lime-plugin-locate/src/communityGeoJSON";
import { CommunityLayer } from "plugins/lime-plugin-mesh-wide/src/components/Map/CommunityLayer";
import { useMeshWide } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { SelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";
import { radioDataResponse } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

export const MeshWideMap = () => {
    const [communityLayer, setCommunityLayer] =
        useState<FeatureCollection>(null);

    const [selectedFeature, setSelectedFeature] =
        useState<SelectedMapFeature | null>(null);

    const mapRef = useRef<L.Map | null>();

    useEffect(() => {
        if (mapRef) {
            mapRef.current.on("click", () => {
                if (selectedFeature !== null) {
                    setSelectedFeature(null);
                }
            });
        }
    }, [mapRef, selectedFeature]);

    useEffect(() => {
        console.log("SelectedFeature", selectedFeature);
    }, [selectedFeature]);

    const { data: meshWideStatus } = useMeshWide({
        onSuccess: (res) => {
            const geoJson = getCommunityGeoJSON(radioDataResponse.result); // todo(kon): the locate page makes a correction with the own node if is modified
            setCommunityLayer(geoJson as FeatureCollection);
        },
    });

    return (
        <MapContainer
            // center={center}2
            // center={[-30, -60]}
            // zoom={13}
            center={[-31.81854, -64.40097]}
            zoom={13}
            scrollWheelZoom={true}
            className={"w-screen h-screen sm:h-auto sm:pt-14 z-0"}
            ref={mapRef}
        >
            <TileLayer
                attribution={openStreetMapAttribution}
                url={openStreetMapTileString}
            />
            <CommunityLayer
                setSelectedFeature={setSelectedFeature}
                selectedFeature={selectedFeature}
                geoJsonData={communityLayer}
            />
        </MapContainer>
    );
};
