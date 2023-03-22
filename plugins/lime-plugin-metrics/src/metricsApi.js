import api from "utils/uhttpd.service";

export const getMetrics = (ip) => {
    return api.call("lime-metrics", "get_metrics", { target: ip });
};

export const getGateway = () =>
    api.call("lime-metrics", "get_gateway", {}).then((res) => res.gateway);

export const getPath = async () =>
    api.call("lime-metrics", "get_path", {}).then((res) => res.path);

export const getLoss = async (ip) =>
    api
        .call("lime-metrics", "get_loss", { target: ip })
        .then((res) => +res.loss);
