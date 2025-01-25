import {
    IGetInternetStatus,
    StatusResponse,
    SupportedPortRoles,
    SwitchStatus,
} from "plugins/lime-plugin-rx/src/rxTypes";

import api from "utils/uhttpd.service";

export const getNodeStatus = (): Promise<StatusResponse> =>
    api.call("lime-utils", "get_node_status", {});

export const getInternetStatus = (): Promise<IGetInternetStatus> =>
    api.call("lime-metrics", "get_internet_status", {});

export type SetPortRoleArgs = { role: SupportedPortRoles } & Omit<
    SwitchStatus,
    "role"
>;

export const setPortRole = async (
    newStatus: SetPortRoleArgs
): Promise<boolean> => {
    console.log("Setting port role", newStatus);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return true;
};
