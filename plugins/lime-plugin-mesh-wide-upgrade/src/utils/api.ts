import {
    MeshUpgradeApiErrorTypes,
    MeshWideRPCReturnTypes,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

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
        throw new MeshUpgradeApiError(res.error, res.code);
    }
    return res.code;
};

export class MeshUpgradeApiError extends Error {
    message: string;
    code: MeshUpgradeApiErrorTypes;
    constructor(message: string, code: MeshUpgradeApiErrorTypes) {
        super(message); // Pass the message to the Error constructor
        this.name = "MeshUpgradeApiError"; // Set the name of the error
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, MeshUpgradeApiError.prototype);
    }
}
