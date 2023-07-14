import { useQuery } from "@tanstack/react-query";

import { getMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/firmwareUpgradeMocks";
import { UpgradeNodesInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

export function useMeshWideUpgradeInfo(params) {
    return useQuery<UpgradeNodesInfo>(
        ["lime-meshwideupgrade", "get_upgrade_info"],
        getMeshWideUpgradeInfo,
        {
            ...params,
        }
    );
}
