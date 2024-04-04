import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide/src/mesWideQueriesKeys";

import api from "utils/uhttpd.service";

const sharedStateApiCall = async (queryKey) => {
    try {
        return await api.call(...queryKey);
    } catch (e) {
        // Prevent the whole page from crashing if the API call fails
        // It can happen either because the package is not installed or reference state is not available
        console.error(e);
        return {};
    }
};

export const getMeshWideBatmanReference = () =>
    sharedStateApiCall(meshUpgradeQueryKeys.batHostsRef);

export const getMeshWideBatman = () =>
    sharedStateApiCall(meshUpgradeQueryKeys.batHosts);

export const getMeshWideLinksReference = () =>
    sharedStateApiCall(meshUpgradeQueryKeys.wifiLinksInfoRef);

export const getMeshWideLinks = () =>
    sharedStateApiCall(meshUpgradeQueryKeys.wifiLinksInfo);

export const getMeshWideNodesReference = () =>
    sharedStateApiCall(meshUpgradeQueryKeys.meshWideNodesRef);

export const getMeshWideNodes = () =>
    sharedStateApiCall(meshUpgradeQueryKeys.meshWideNodes);
