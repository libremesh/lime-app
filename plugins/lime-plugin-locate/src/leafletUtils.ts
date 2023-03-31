import { DivIconOptions, IconOptions } from "leaflet";

const leafletVersion = "1.9.3";

function loadLeafletScript() {
    return new Promise((res, rej) => {
        if (document.getElementById("leaflet-script")) {
            // @ts-ignore
            res();
        } else {
            const script = document.createElement("script");
            script.onload = res;
            script.onerror = rej;
            script.src = `https://unpkg.com/leaflet@${leafletVersion}/dist/leaflet.js`;
            script.id = "leaflet-script";
            document.body.appendChild(script);
        }
    });
}

function loadLeafletStylesheet() {
    return new Promise((res, rej) => {
        if (document.getElementById("leaflet-style")) {
            // @ts-ignore
            res();
        } else {
            const style = document.createElement("link");
            style.onload = res;
            style.onerror = rej;
            style.rel = "stylesheet";
            style.href = `https://unpkg.com/leaflet@${leafletVersion}/dist/leaflet.css`;
            style.id = "leaflet-style";
            document.head.appendChild(style);
        }
    });
}

export function loadLeafLet() {
    // Leaflet script must be loaded after leaflet stylesheet
    return loadLeafletStylesheet().then(loadLeafletScript);
}

export function loadGoogleMapsApi() {
    return new Promise((res, rej) => {
        if (document.getElementById("googlemaps-script")) {
            // @ts-ignore
            res();
        } else {
            const key = "AIzaSyBS0M7H7Ltk1ipjwqi8r9_WQJOzWfav4Ok";
            const script = document.createElement("script");
            script.onload = res;
            script.onerror = rej;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
            script.id = "googlemaps-script";
            document.body.appendChild(script);
        }
    });
}

export const homeIcon: IconOptions = {
    iconUrl:
        "data:image/png;base64,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",
    iconSize: [25, 41],
    iconAnchor: [13, 40],
    popupAnchor: [0, -45],
};
