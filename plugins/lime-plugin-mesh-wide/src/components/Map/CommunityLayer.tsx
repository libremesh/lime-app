import * as geojson from "geojson";
import L, { Layer } from "leaflet";
import { GeoJSON, Marker } from "react-leaflet";

import style from "./style.less";

export const CommunityLayer = ({
    geoJsonData,
    setSelectedLayer,
}: {
    geoJsonData: geojson.GeoJsonObject;
    setSelectedLayer: (layer: Layer | null) => void;
}) => {
    const pointToLayer = (feature: any, latlng: any) => {
        const marker = L.marker(latlng, {
            icon: L.divIcon({
                // className: style.defaultMarker,
                iconAnchor: [0, 24],
                // labelAnchor: [-6, 0],
                popupAnchor: [0, -36],
                // html: `<span />`,
                html: `<span class="${style.defaultMarker}" />`,
            }),
        });

        const featureGroup = L.featureGroup([marker]);

        marker.on("click", function (e) {
            const markerTemp = L.marker(e.latlng, {
                icon: L.divIcon({
                    iconAnchor: [0, 24],
                    popupAnchor: [0, -36],
                    html: `<span class="${style.defaultMarker} ${style.activeMarker} "  />`,
                }),
            }).addTo(featureGroup);

            // markerTemp.on("mouseout", function (e) {
            //     markerTemp.remove();
            // });
        });
        return featureGroup;
    };

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindTooltip(feature.properties.name).openTooltip();
        }
        layer.on({
            click: (event) => {
                // if (selectedLayer) {
                //     selectedLayer.setStyle(defaultStyle);
                // }
                // layer.setStyle(selectedStyle);
                L.DomEvent.stopPropagation(event);
                console.log("clicked! ", layer, feature);
                // layer.setStyle(selectedStyle);
                setSelectedLayer(layer);
            },
            mouseover: (event: any) => {
                const l = event.target;
                const type: string = event.target.feature.geometry.type;
                if (type === "LineString") {
                    l.setStyle({
                        color: "#0000ff",
                    });
                } else if (type === "Point") {
                }
            },
            mouseout: (event: any) => {
                const l = event.target;
                const type: string = l.feature.geometry.type;
                if (type === "LineString") {
                    l.setStyle(geoJsonStyle);
                } else if (type === "Point") {
                }
            },
        });
    };

    return (
        <GeoJSON
            data={geoJsonData}
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer}
            style={geoJsonStyle}
        />
    );
};

const geoJsonStyle = {
    color: "#ff0000", // red
    weight: 5,
    opacity: 0.65,
};

const markerStyle = `
  background-color: #583470;
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const markerStyle2 = `
  background-color: #fff;
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

// const markerDefault = `
//     ${marker}
//     background-color: #583470;
// `;
