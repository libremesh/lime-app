import { useMutation, useQuery } from "@tanstack/react-query";

import { setChangesNeedReboot } from "utils/api";
import queryCache from "utils/queryCache";

import {
    changeApNamePassword,
    changeHostname,
    getAPsData,
    getAdminApsData,
    setupRoamingAP,
} from "./nodeAdminApi";

export const useChangeHostname = () =>
    useMutation(changeHostname, {
        onSuccess: () => {
            setChangesNeedReboot("yes");
            queryCache.invalidateQueries("changes-need-reboot");
        },
    });

export const useWifiData = () =>
    useQuery(["lime-utils", "get_wifi_data"], getAPsData);

export const useAdminWifiData = () =>
    useQuery(["lime-utils-admin", "get_wifi_data"], getAdminApsData);

export const useChangeAPPassword = () =>
    useMutation(changeApNamePassword, {
        onSuccess: () => {
            setChangesNeedReboot("yes");
            queryCache.invalidateQueries("changes-need-reboot");
            queryCache.invalidateQueries(["lime-utils", "get_wifi_data"]);
            queryCache.invalidateQueries(["lime-utils-admin", "get_wifi_data"]);
        },
    });

export const useSetupRoamingAP = () =>
    useMutation(setupRoamingAP, {
        onSuccess: () => {
            setChangesNeedReboot("yes");
            queryCache.invalidateQueries("changes-need-reboot");
            queryCache.invalidateQueries(["lime-utils", "get_wifi_data"]);
            queryCache.invalidateQueries(["lime-utils-admin", "get_wifi_data"]);
        },
    });
