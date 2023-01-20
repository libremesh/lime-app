import { useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import { getGateway, getMetrics, getPath } from "./metricsApi";

export function useMetrics(ip, params) {
    return useQuery(["lime-metrics", "get_metrics", ip], () => getMetrics(ip), {
        retry: false,
        ...params,
    });
}

export const getAllMetrics = async (ips) => {
    const metrics = [];
    for (const ip of ips) {
        const metric = await queryCache.fetchQuery([
            "lime-metrics",
            "get_metrics",
            ip,
        ]);
        metrics.push({ ip: metric });
    }
    return metrics;
};

export function useAllMetrics(ips, params) {
    return useQuery(
        ["lime-metrics", "get_metrics", ips],
        (query) => getAllMetrics(query.queryKey[2]),
        {
            retry: false,
            ...params,
        }
    );
}

export function useGateway(params) {
    return useQuery(["lime-metrics", "get_gateway"], getGateway, params);
}

export function usePath(params) {
    return useQuery(["lime-metrics", "get_path"], getPath, params);
}
