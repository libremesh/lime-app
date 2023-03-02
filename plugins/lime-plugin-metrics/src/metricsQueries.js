import { useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import { getGateway, getLoose, getMetrics, getPath } from "./metricsApi";

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

export function useLoose(ip, params) {
    return useQuery(["lime-metrics", "get_loose", ip], () => getLoose(ip), {
        retry: false,
        ...params,
    });
}

export const getAllLoose = async (nodes) => {
    let looses = [];
    for (const node of nodes) {
        // @ts-ignore
        const { loose } = await queryCache.fetchQuery([
            "lime-metrics",
            "get_loose",
            node.ip,
        ]);

        looses = await queryCache.setQueryData(
            ["lime-metrics", "get_loose", nodes],
            (oldData) => {
                const data = oldData?.slice() ?? nodes.slice();
                return data.map((oldNode) => {
                    if (oldNode.ip === node.ip) {
                        oldNode.loose = loose;
                    }
                    return oldNode;
                });
            }
        );
        // if (loose < 100) break;
    }
    return looses.slice();
};

export function usePathLoose(nodes, params) {
    return useQuery(
        ["lime-metrics", "get_loose", nodes],
        (query) => getAllLoose(query.queryKey[2]),
        {
            retry: false,
            ...params,
        }
    );
}
