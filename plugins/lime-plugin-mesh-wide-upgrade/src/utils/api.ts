import {
    MeshUpgradeApiErrorTypes,
    MeshWideRPCReturnTypes,
    MeshWideUpgradeInfo,
    UpgradeStatusType,
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

/**
 * From a MeshWideUpgradeInfo nodes it returns the ips of the nodes that are in certain status provided
 * @param nodes the nodes to check
 * @param status the status to check the criteria
 */
export const getNodeIpsByStatus = (
    nodes: MeshWideUpgradeInfo,
    status: UpgradeStatusType
) => {
    if (!nodes) return [];
    return Object.values(nodes)
        .filter(
            (node) =>
                node.node_ip !== null &&
                node.node_ip !== undefined &&
                node.node_ip.trim() !== "" &&
                node.upgrade_state === status
        )
        .map((node) => node.node_ip as string); // 'as string' is safe here due to the filter condition
};
