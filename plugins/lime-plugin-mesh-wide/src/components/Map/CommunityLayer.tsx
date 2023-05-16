import { FeatureCollection } from "geojson";
import L from "leaflet";
import { Marker, Polyline, Tooltip } from "react-leaflet";

import { SelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import style from "./style.less";

export const CommunityLayer = ({
    geoJsonData,
    setSelectedFeature,
    selectedFeature,
}: {
    geoJsonData: FeatureCollection;
    setSelectedFeature: (layer: SelectedMapFeature | null) => void;
    selectedFeature: SelectedMapFeature;
}) => {
    return (
        <>
            {geoJsonData &&
                geoJsonData.features.map((f, i) => {
                    if (f.geometry.type === "LineString") {
                        const lineColor =
                            selectedFeature?.id === i ? "#f000ff" : "#ff0000";
                        return (
                            <Polyline
                                key={i}
                                positions={f.geometry.coordinates.map((p) =>
                                    [...p].reverse()
                                )}
                                pathOptions={{
                                    color: lineColor,
                                    weight: 5,
                                    opacity: 0.65,
                                }}
                                eventHandlers={{
                                    click: (e) => {
                                        L.DomEvent.stopPropagation(e);
                                        setSelectedFeature({
                                            id: i,
                                            feature: f,
                                        });
                                    },
                                    mouseover: (e) => {
                                        const l = e.target;
                                        l.setStyle({
                                            color: "#0000ff",
                                        });
                                    },
                                    mouseout: (event) => {
                                        const l = event.target;
                                        l.setStyle({
                                            color: lineColor,
                                        });
                                    },
                                }}
                            />
                        );
                    } else if (f.geometry.type === "Point") {
                        const selected = `${
                            selectedFeature?.id === i && style.activeMarker
                        }`;
                        return (
                            <Marker
                                key={i}
                                position={f.geometry.coordinates.reverse()}
                                icon={L.divIcon({
                                    iconAnchor: [0, 24],
                                    popupAnchor: [0, -36],
                                    html: `<span class="${style.defaultMarker} ${selected}" />`,
                                })}
                                eventHandlers={{
                                    click: (e) => {
                                        L.DomEvent.stopPropagation(e);
                                        setSelectedFeature({
                                            id: i,
                                            feature: f,
                                        });
                                    },
                                }}
                            >
                                <Tooltip>{f.properties.name}</Tooltip>
                            </Marker>
                        );
                    }
                })}
        </>
    );
};
