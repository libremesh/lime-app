import { from } from "rxjs";

export const getNodeStauts = (api) =>
    api.call("lime-utils", "get_node_status", {});

export const getStationTraffic = (api, node) => {
    if (typeof node === "undefined") return from([]);
    return api.call("lime-metrics", "get_station_traffic", {
        station_mac: node.station_mac,
        iface: node.iface,
    });
};

export const getStationSignal = (api, node) => {
    if (typeof node === "undefined") return [];
    return api.call("iwinfo", "assoclist", {
        device: node.iface,
        mac: node.station_mac,
    });
};

export const getInternetStatus = (api) =>
    api.call("lime-metrics", "get_internet_status", {});
