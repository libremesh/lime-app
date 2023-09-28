import { t } from "@lingui/macro";
import L from "leaflet";
import { useEffect, useRef } from "preact/hooks";
import {
    LayerGroup,
    LayersControl,
    MapContainer,
    TileLayer,
} from "react-leaflet";

import { FloatingAlert } from "plugins/lime-plugin-mesh-wide/src/components/Map/FloatingAlert";
import {
    BatmanLinksLayer,
    WifiLinksLayer,
} from "plugins/lime-plugin-mesh-wide/src/containers/MapLayers/LinksLayers";
import NodesLayer from "plugins/lime-plugin-mesh-wide/src/containers/MapLayers/NodesLayer";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const openStreetMapTileString = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors';

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
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name={t`Wifi Links`}>
                        <LayerGroup>
                            <WifiLinksLayer />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name={t`Batman`}>
                        <LayerGroup>
                            <BatmanLinksLayer />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name={t`Nodes`}>
                        <LayerGroup>
                            <NodesLayer />
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </>
    );
};
