import L, { Layer } from "leaflet";
import { useEffect, useRef, useState } from "preact/hooks";
import { MapContainer, TileLayer } from "react-leaflet";

import { getCommunityGeoJSON } from "plugins/lime-plugin-locate/src/communityGeoJSON";
import { CommunityLayer } from "plugins/lime-plugin-mesh-wide/src/components/Map/CommunityLayer";
import { useMeshWide } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { radioDataResponse } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

export const MeshWideMap = () => {
    const [communityLayer, setCommunityLayer] = useState(null);

    const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);

    const mapRef = useRef<L.Map | null>();

    useEffect(() => {
        if (mapRef) {
            mapRef.current.on("click", () => {
                console.log("map click!");
                setSelectedLayer(null);
            });
        }
    }, [mapRef]);

    useEffect(() => {
        console.log("SELECTED LAYER", selectedLayer);
    }, [selectedLayer]);

    const { data: meshWideStatus } = useMeshWide({
        onSuccess: (res) => {
            const geoJson = getCommunityGeoJSON(radioDataResponse.result); // todo(kon): the locate page makes a correction with the own node if is modified
            setCommunityLayer(geoJson);
        },
    });

    return (
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
            {communityLayer && (
                <CommunityLayer
                    geoJsonData={communityLayer}
                    setSelectedLayer={setSelectedLayer}
                />
            )}
        </MapContainer>
    );
};
