import { MeshUpgradeApiErrorTypes } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

import api, { UhttpdService } from "utils/uhttpd.service";

export type ApiServiceParamsType = [string, string, object?];

// This a util function for standarizes API return calls
// During the development some methods are thought to have a specific return type:
// {
//    data: T;
//    error: number;
// }
// This is a wrapper function to do the calls to the methods that contains this return type
// Pass the array of arguments that api.call method needs.
export const standarizedApiCall = async <T>({
    apiService = api,
    args,
}: {
    apiService?: UhttpdService;
    args: ApiServiceParamsType;
}) => {
    if (args.length === 2) {
        args.push({});
    }
    const res = await apiService.call(...args);
    if (res?.error && res?.error !== "0" && res?.error !== 0) {
        throw new StandarizedApiError(res.error, res.code);
    }
    if (res.data) return res.data as T;
    // Fallback to return the response if there is no data
    return res as T;
};

export class StandarizedApiError extends Error {
    message: string;
    code: MeshUpgradeApiErrorTypes;

    constructor(message: string, code: MeshUpgradeApiErrorTypes) {
        super(message); // Pass the message to the Error constructor
        this.name = "MeshUpgradeApiError"; // Set the name of the error
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, StandarizedApiError.prototype);
    }
}
