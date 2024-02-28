import { getMeshUpgradeNodeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeApi";
import { useMeshWideNodes } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

import {
    ParallelMutationError,
    useMeshWideSyncCall,
} from "utils/meshWideSyncCall";
import { login } from "utils/queries";
import { UhttpdService } from "utils/uhttpd.service";

async function startSafeUpgrade({ ip }: { ip: string }) {
    const customApi = new UhttpdService(ip);
    try {
        await login({ username: "lime-app", password: "generic", customApi });
    } catch (error) {
        throw new ParallelMutationError(`Cannot login for ${ip}`, ip, error);
    }
    try {
        // return await meshUpgradeApiCall("start_safe_upgrade");
        return await getMeshUpgradeNodeStatus();
    } catch (error) {
        throw new ParallelMutationError(
            `Cannot startSafeUpgrade for ${ip}`,
            ip,
            error
        );
    }
}

export const useStartSafeUpgrade = () => {
    // State to store the errors
    const { data: nodes } = useMeshWideNodes({});
    const ips = Object.entries(nodes || {}).map(
        // @ts-ignore
        ([_, node]) => node?.ipv4 ?? ""
    );
    return useMeshWideSyncCall(startSafeUpgrade, ips);
};
