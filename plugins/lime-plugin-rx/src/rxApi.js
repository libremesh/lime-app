import api from "utils/uhttpd.service";

export const getNodeStatus = () => {
    return api.call("lime-utils", "get_node_status", {});
};

export const getInternetStatus = () =>
    api.call("lime-metrics", "get_internet_status", {});
