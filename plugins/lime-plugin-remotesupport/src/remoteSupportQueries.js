import { useMutation, useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import { closeSession, getSession, openSession } from "./remoteSupportApi";

export function useSession(queryConfig) {
    return useQuery(["tmate", "get_session"], getSession, queryConfig);
}

export function useOpenSession() {
    return useMutation(openSession, {
        onSuccess: () => queryCache.invalidateQueries(["tmate", "get_session"]),
        onError: () => queryCache.setQueryData(["tmate", "get_session"], null),
    });
}

export function useCloseSession() {
    return useMutation(closeSession, {
        onSuccess: () => queryCache.invalidateQueries(["tmate", "get_session"]),
    });
}
