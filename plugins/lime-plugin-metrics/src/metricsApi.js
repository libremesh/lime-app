import api from "utils/uhttpd.service";

export const getMetrics = (ip) =>
    api.call("lime-metrics", "get_metrics", { target: ip });

export const getGateway = () =>
    api.call("lime-metrics", "get_gateway", {}).then((res) => res.gateway);

export const getPath = () =>
    api.call("lime-metrics", "get_path", {}).then((res) => res.path);
