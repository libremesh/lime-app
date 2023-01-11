import { useQuery } from "@tanstack/react-query";

import { getGateway, getMetrics, getPath } from "./metricsApi";

export function useMetrics(ip, params) {
    return useQuery(
        ["lime-metrics", "get_metrics", ip],
        () => getMetrics(ip),
        params
    );
}

export function useGateway(params) {
    return useQuery(["lime-metrics", "get_gateway"], getGateway, params);
}

export function usePath(params) {
    return useQuery(["lime-metrics", "get_path"], getPath, params);
}
