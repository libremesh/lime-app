import { MutationKey } from "@tanstack/query-core/src/types";
import {
    UseMutationOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import { SupportedPortRoles } from "plugins/lime-plugin-rx/src/rxTypes";

import {
    SetPortRoleArgs,
    getInternetStatus,
    getNodeStatus,
    setPortRole,
} from "./rxApi";

const refetchInterval = 2000;

export function useNodeStatus(params?) {
    return useQuery(["lime-rx", "node-status"], getNodeStatus, {
        enabled: true,
        refetchInterval,
        ...params,
    });
}

export function useInternetStatus(params?) {
    return useQuery(["lime-rx", "internet-status"], getInternetStatus, {
        placeholderData: {
            IPv4: { working: null },
            IPv6: { working: null },
            DNS: { working: null },
        },
        enabled: true,
        refetchInterval,
        ...params,
    });
}

export const useSetPortRole = (
    options?: Omit<
        UseMutationOptions<boolean, Error, SetPortRoleArgs>,
        "mutationFn" | "mutationKey"
    >
) => {
    return useMutation<boolean, Error, SetPortRoleArgs>({
        mutationFn: setPortRole,
        mutationKey: ["useSetPortRole"] as MutationKey,
        ...options,
    });
};
