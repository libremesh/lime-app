import api from "utils/uhttpd.service";

export const getLocation = () => api.call("lime-location", "get", {});

export const getNodesandlinks = async () =>
    api.call("lime-location", "all_nodes_and_links", {});

export const changeLocation = async (location) => {
    return await api.call("lime-location", "set", {
        lat: location.lat.toFixed(5),
        lon: location.lon.toFixed(5),
    });
};
