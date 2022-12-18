import { useMutation, useQuery } from "@tanstack/react-query";

import {
    checkInternet,
    getBatHost,
    getBoardData,
    getChangesNeedReboot,
    getCommunitySettings,
    getSession,
    reboot,
    setChangesNeedReboot,
} from "./api";
import { DEFAULT_COMMUNITY_SETTINGS } from "./constants";
import queryCache from "./queryCache";
import api from "./uhttpd.service";

export function useSession() {
    return useQuery(["session", "get"], getSession, { staleTime: Infinity });
}

function login({ username, password }) {
    return api.login(username, password);
}

export function useLogin() {
    return useMutation(login, {
        onSuccess: (res) => {
            queryCache.setQueryData(["session", "get"], () => res.data);
        },
    });
}

export function useBoardData(config) {
    return useQuery(["system", "board"], getBoardData, config);
}

export function useCommunitySettings() {
    // @ts-ignore
    return useQuery(
        ["lime-utils", "get_community_settings"],
        getCommunitySettings,
        {
            initialData: DEFAULT_COMMUNITY_SETTINGS,
            initialStale: true,
        }
    );
}

export function useBatHost(mac, outgoingIface, queryConfig) {
    return useQuery(
        ["bat-hosts", "get_bathost", mac, outgoingIface],
        async () => getBatHost(mac, outgoingIface),
        {
            retry: 3,
            ...queryConfig,
        }
    );
}

export function useNeedReboot() {
    return useQuery(["changes-need-reboot"], getChangesNeedReboot);
}

export function useSetNeedReboot() {
    return useMutation(setChangesNeedReboot, {
        onSuccess: () => {
            queryCache.invalidateQueries({ queryKey: ["changes-need-reboot"] });
        },
    });
}

export function useReboot() {
    return useMutation(reboot, {
        onSuccess: () => {
            setChangesNeedReboot("no");
            queryCache.invalidateQueries({ queryKey: ["changes-need-reboot"] });
        },
    });
}

export function useCheckInternet() {
    return useQuery(["check-internet", "is_connected"], checkInternet);
}
