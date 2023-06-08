import { FeatureCollection } from "geojson";
import L from "leaflet";
import { Marker, Polyline, Tooltip } from "react-leaflet";

import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

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
                        const isSelected = selectedMapFeature?.id === i;
                        const getPathOpts = (isSelected) => {
                            return {
                                color: synced ? "#76bd7d" : "#eb7575",
                                weight: isSelected ? 7 : 5,
                                opacity: isSelected ? 1 : 0.8,
                            };
                        };
                        return (
                            <Polyline
                                key={i}
                                positions={f.geometry.coordinates.map((p) =>
                                    [...p].reverse()
                                )}
                                pathOptions={getPathOpts(isSelected)}
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
                                        l.setStyle(getPathOpts(true));
                                    },
                                    mouseout: (event) => {
                                        const l = event.target;
                                        l.setStyle(getPathOpts(isSelected));
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
