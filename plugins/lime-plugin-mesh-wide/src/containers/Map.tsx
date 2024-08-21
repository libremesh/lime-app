import L from "leaflet";
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import {
    LayerGroup,
    LayersControl,
    MapContainer,
    TileLayer,
} from "react-leaflet";

import { MeshWideMapTypes } from "components/shared-state/SharedStateTypes";

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

    // @ts-ignore
    const mapSupportedLayers: Record<
        keyof MeshWideMapTypes,
        { name: string; layer: ComponentChildren; checked: boolean }
    > = {
        node_info: { name: "Nodes", layer: <NodesLayer />, checked: nodes },
        wifi_links_info: {
            name: "Wifi Links",
            layer: <WifiLinksLayer />,
            checked: wifiLinks,
        },
        bat_links_info: {
            name: "Batman",
            layer: <BatmanLinksLayer />,
            checked: batmanLinks,
        },
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
                {Object.values(mapSupportedLayers).map(
                    ({ name, layer, checked }, k) => (
                        <LayersControl.Overlay
                            key={k}
                            name={name}
                            checked={checked}
                        >
                            <LayerGroup>{layer}</LayerGroup>
                        </LayersControl.Overlay>
                    )
                )}
            </LayersControl>
        </MapContainer>
    );
};
