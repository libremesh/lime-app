import { FeatureCollection } from "geojson";
import L from "leaflet";
import { Marker, Polyline, Tooltip } from "react-leaflet";

import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { SelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import style from "./style.less";

export const CommunityLayer = ({
    geoJsonData,
}: {
    geoJsonData: FeatureCollection;
}) => {
    const { selectedMapFeature, setSelectedMapFeature } =
        useSelectedMapFeature();
    return (
        <>
            {geoJsonData &&
                geoJsonData.features.map((f, i) => {
                    const synced: boolean = Math.random() < 0.5;

                    if (f.geometry.type === "LineString") {
                        const lineColor =
                            selectedMapFeature?.id === i
                                ? "#f000ff"
                                : "#ff0000";
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
                                        setSelectedMapFeature({
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
                        const markerClasses = `${
                            selectedMapFeature?.id === i && style.selectedMarker
                        } ${
                            synced ? style.syncedMarker : style.notSyncedMarker
                        }`;
                        return (
                            <Marker
                                key={i}
                                position={f.geometry.coordinates.reverse()}
                                icon={L.divIcon({
                                    className: style.leafletDivCustomIcon,
                                    iconAnchor: [0, 24],
                                    popupAnchor: [0, -36],
                                    // html: `<span class="${style.selectedMarker} ${syncedClass} ${selected}" />`,
                                    // html: `<span class="${markerClasses}" />`,
                                    html: `<span class="${style.defaultMarker} ${markerClasses}" />`,
                                })}
                                eventHandlers={{
                                    click: (e) => {
                                        L.DomEvent.stopPropagation(e);
                                        setSelectedMapFeature({
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
