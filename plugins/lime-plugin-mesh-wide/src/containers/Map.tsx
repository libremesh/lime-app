import L from "leaflet";
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import {
    LayerGroup,
    LayersControl,
    MapContainer,
    TileLayer,
} from "react-leaflet";

import {
    useLoadLeaflet,
    useLocation,
} from "plugins/lime-plugin-locate/src/locateQueries";
import {
    BatmanLinksLayer,
    WifiLinksLayer,
} from "plugins/lime-plugin-mesh-wide/src/containers/MapLayers/LinksLayers";
import NodesLayer from "plugins/lime-plugin-mesh-wide/src/containers/MapLayers/NodesLayer";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { DataTypes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

const openStreetMapTileString = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors';

interface ILayersChecked {
    nodes?: boolean;
    wifiLinks?: boolean;
    batmanLinks?: boolean;
}

export const MeshWideMap = ({
    nodes = true,
    wifiLinks = true,
    batmanLinks = false,
}: ILayersChecked) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();

    const { isLoading: assetsLoading, data: leafletData } = useLoadLeaflet({
        refetchOnWindowFocus: false,
    });

    const { data: nodeLocation, isLoading: isLoadingLocation } = useLocation({
        enabled: !!leafletData,
    });

    const mapRef = useRef<L.Map | null>();
    const loading = assetsLoading || isLoadingLocation;

    useEffect(() => {
        if (mapRef) {
            mapRef.current.on("click", () => {
                if (selectedMapFeature !== null) {
                    setSelectedMapFeature(null);
                }
            });
        }
    }, [mapRef, selectedMapFeature, setSelectedMapFeature]);

    // Set map position when map is available or location gets updated
    useEffect(() => {
        const mapInstance = mapRef.current;
        if (
            !loading &&
            mapInstance &&
            nodeLocation &&
            nodeLocation.location &&
            (nodeLocation.location.lat !== "FIXME" ||
                nodeLocation.location.lon !== "FIXME")
        ) {
            mapInstance.setView(
                [+nodeLocation.location.lat, +nodeLocation.location.lon],
                13
            );
        }
    }, [loading, nodeLocation]);

    const mapSupportedLayers: Record<
        DataTypes,
        { name: string; layer: ComponentChildren }
    > = {
        node_info: { name: "Nodes", layer: <NodesLayer /> },
        wifi_links_info: { name: "Wifi Links", layer: <WifiLinksLayer /> },
        bat_links_info: { name: "Batman", layer: <BatmanLinksLayer /> },
    };

    return (
        <MapContainer
            center={[-30, -60]}
            zoom={3}
            scrollWheelZoom={true}
            className={"w-screen h-screen sm:h-auto sm:pt-14 z-0"}
            ref={mapRef}
        >
            <TileLayer
                attribution={openStreetMapAttribution}
                url={openStreetMapTileString}
            />
            <LayersControl position="topright">
                {Object.values(mapSupportedLayers).map(({ name, layer }, k) => (
                    <LayersControl.Overlay key={k} checked={true} name={name}>
                        <LayerGroup>{layer}</LayerGroup>
                    </LayersControl.Overlay>
                ))}
            </LayersControl>
        </MapContainer>
    );
};
