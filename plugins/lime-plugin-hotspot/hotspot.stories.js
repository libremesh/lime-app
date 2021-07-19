import Hotspot from './src/hotspotPage';

export default {
    title: 'Containers/hotspot'
}

export const connected = () => <Hotspot />;
connected.args = {
    queries: [
        [['lime-utils-admin', 'hotspot_wwan_is_connected'], {connected: true, signal: -45}]
    ]
}

export const disconnected = () => <Hotspot />;
disconnected.args = {
    queries: [
        [['lime-utils-admin', 'hotspot_wwan_is_connected'], {connected: false}]
    ]
}
