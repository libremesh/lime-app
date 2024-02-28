import { MeshWideRPCReturnTypes } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

import api, { UhttpdService } from "utils/uhttpd.service";

export const meshUpgradeApiCall = async (
    method: string,
    customApi?: UhttpdService
) => {
    const httpService = customApi || api;
    const res = (await httpService.call(
        "lime-mesh-upgrade",
        method,
        {}
    )) as MeshWideRPCReturnTypes;
    if (res.error) {
        // todo(kon): handle errors with error code or whatever
        throw new Error(res.error);
    }
    return res.code;
};
