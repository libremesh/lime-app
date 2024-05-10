import {
    MeshUpgradeApiErrorTypes,
    MeshWideUpgradeInfo,
    UpgradeStatusType,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

import { RemoteNodeCallError } from "utils/meshWideSyncCall";
import { login } from "utils/queries";
import { UhttpdService } from "utils/uhttpd.service";

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

/**
 * Wrapper to do calls to a remote node and returns the result or throws an error
 *
 * First it tries to login and if success do a specific call to the remote node
 * @param ip
 * @param apiMethod
 */
export async function callToRemoteNode<T>({
    ip,
    apiCall,
    username = "lime-app",
    password = "generic",
}: {
    ip: string;
    apiCall: (customApi: UhttpdService) => Promise<T>;
    username?: string;
    password?: string;
}) {
    const customApi = new UhttpdService(ip);
    try {
        await login({ username, password, customApi });
    } catch (error) {
        throw new RemoteNodeCallError(
            `Cannot login`,
            customApi.customIp,
            error
        );
    }
    try {
        return await apiCall(customApi);
    } catch (error) {
        let additionalInfo = "";
        if (error instanceof MeshUpgradeApiError) {
            additionalInfo = `: ${error.message}`;
        }
        throw new RemoteNodeCallError(
            `Cannot do remote call${additionalInfo}`,
            ip,
            error
        );
    }
}
