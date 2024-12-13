import {
    IGetInternetStatus,
    StatusResponse,
} from "plugins/lime-plugin-rx/src/rxTypes";

import api from "utils/uhttpd.service";

export const getNodeStatus = (): Promise<StatusResponse> =>
    api.call("lime-utils", "get_node_status", {});

export const getInternetStatus = (): Promise<IGetInternetStatus> =>
    api.call("lime-metrics", "get_internet_status", {});
