import { useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import { getAllMetrics, getGateway, getMetrics, getPath } from "./metricsApi";

/**
 * Util function to update query data of a single metrics ip using queryCache
 * Is used to set the {status: 'fetching'} or the metric itself from anywhere
 */
export function setMetricsQueryData(ip, data) {
    queryCache.setQueryData(["lime-metrics", "get_metrics", ip], data);
}

export function setMetricsQueryDataToFetching(ip) {
    setMetricsQueryData(ip, { status: "fetching" });
}

export function useMetrics(ip, params) {
    return useQuery(
        ["lime-metrics", "get_metrics", ip],
        () => getMetrics(ip),
        params
    );
}

export function useAllMetrics(ips, params) {
    return useQuery(
        ["lime-metrics", "get_metrics", ips],
        (query) => getAllMetrics(query.queryKey[2]),
        params
    );
}

export function useGateway(params) {
    return useQuery(["lime-metrics", "get_gateway"], getGateway, params);
}

export function usePath(params) {
    return useQuery(["lime-metrics", "get_path"], getPath, params);
}
