import L from "leaflet";
import { useEffect, useRef } from "preact/hooks";
import { MapContainer, TileLayer } from "react-leaflet";

import { FloatingAlert } from "plugins/lime-plugin-mesh-wide/src/components/Map/FloatingAlert";
import { LinksLayer } from "plugins/lime-plugin-mesh-wide/src/containers/MapLayers/LinksLayer";
import NodesLayer from "plugins/lime-plugin-mesh-wide/src/containers/MapLayers/NodesLayer";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

export const MeshWideMap = () => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
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

    // const { data: meshWideStatus } = useMeshWide({
    //     onSuccess: (res) => {
    //         const geoJson = getCommunityGeoJSON(res.result); // todo(kon): the locate page makes a correction with the own node if is modified
    //         setCommunityLayer(geoJson as FeatureCollection);
    //     },
    // });

    return (
        <>
            <FloatingAlert />
            <MapContainer
                // center={center}
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
                <LinksLayer />
                <NodesLayer />
            </MapContainer>
        </>
    );
};
