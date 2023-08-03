import { FeatureCollection } from "geojson";
import L from "leaflet";
import { useEffect, useRef, useState } from "preact/hooks";
import { MapContainer, TileLayer } from "react-leaflet";

import { getCommunityGeoJSON } from "plugins/lime-plugin-locate/src/communityGeoJSON";
import { CommunityLayer } from "plugins/lime-plugin-mesh-wide/src/components/Map/CommunityLayer";
import {
    useMeshWide,
    useSelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

export const MeshWideMap = () => {
    const [communityLayer, setCommunityLayer] =
        useState<FeatureCollection>(null);

    // const [selectedFeature, setSelectedFeature] =
    //     useState<SelectedMapFeature | null>(null);

    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        // const { data: selectedMapFeature, mutate: setSelectedMapFeature} =
        useSelectedMapFeature();

    const mapRef = useRef<L.Map | null>();

    useEffect(() => {
        if (mapRef) {
            mapRef.current.on("click", () => {
                if (selectedMapFeature !== null) {
                    setSelectedMapFeature(null);
                }
            });
        }
    }, [mapRef, selectedMapFeature]);

    useEffect(() => {
        console.log("SelectedFeature", selectedMapFeature);
    }, [selectedMapFeature]);

    const { data: meshWideStatus } = useMeshWide({
        onSuccess: (res) => {
            const geoJson = getCommunityGeoJSON(res.result); // todo(kon): the locate page makes a correction with the own node if is modified
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
            <CommunityLayer geoJsonData={communityLayer} />
        </MapContainer>
    );
};
