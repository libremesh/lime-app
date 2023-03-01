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

export const getAllLoose = async (path) => {
    const queryKey = ["lime-metrics", "get_loose", path];
    let newData = path;
    for (const node of path) {
        const loose = await getLoose(node.ip);
        newData = await queryCache.setQueryData(queryKey, (oldData) => {
            const data = oldData.slice() ?? path.slice();
            data.map((oldNode) => {
                if (oldNode.ip === node.ip) {
                    node["loose"] = loose.loose;
                }
            });
            return data.slice();
        });
        if (loose.loose < 100) return newData;
    }
    return newData;
};

export function usePathLoose(path, params) {
    console.log("usePathLoose", path);
    return useQuery(
        ["lime-metrics", "get_loose", path],
        (query) => getAllLoose(query.queryKey[2]),
        {
            retry: false,
            placeholderData: path,
            ...params,
        }
    );
}
