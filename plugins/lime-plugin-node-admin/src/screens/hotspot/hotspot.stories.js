import Hotspot from "./src/hotspotPage";

export default {
    title: "Containers/Node Configuration/Hotspot",
};

export const disabled = () => <Hotspot />;
disabled.args = {
    queries: [
        [
            ["lime-utils", "hotspot_wwan_get_status"],
            { enabled: false, connected: false },
        ],
        [["check-internet", "is_connected"], { connected: true }],
    ],
};

export const connected = () => <Hotspot />;
connected.args = {
    queries: [
        [
            ["lime-utils", "hotspot_wwan_get_status"],
            { enabled: true, connected: true, signal: -45 },
        ],
        [["check-internet", "is_connected"], { connected: true }],
    ],
};

export const disconnected = () => <Hotspot />;
disconnected.args = {
    queries: [
        [
            ["lime-utils", "hotspot_wwan_get_status"],
            { enabled: true, connected: false },
        ],
        [["check-internet", "is_connected"], { connected: false }],
    ],
};

export const connectedButNoInternet = () => <Hotspot />;
connectedButNoInternet.args = {
    queries: [
        [
            ["lime-utils", "hotspot_wwan_get_status"],
            { enabled: true, connected: true, signal: -47 },
        ],
        [["check-internet", "is_connected"], { connected: false }],
    ],
};
