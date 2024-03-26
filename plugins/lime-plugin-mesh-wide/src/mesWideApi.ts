import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide/src/mesWideQueriesKeys";

import api from "utils/uhttpd.service";

export const getMeshWideBatmanReference = () =>
    api.call(...meshUpgradeQueryKeys.batHostsRef);

export const getMeshWideBatman = () =>
    api.call(...meshUpgradeQueryKeys.batHosts);

export const getMeshWideLinksReference = () =>
    api.call(...meshUpgradeQueryKeys.wifiLinksInfoRef);

export const getMeshWideLinks = () =>
    api.call(...meshUpgradeQueryKeys.wifiLinksInfo);

export const getMeshWideNodesReference = () =>
    api.call(...meshUpgradeQueryKeys.meshWideNodesRef);

export const getMeshWideNodes = () =>
    api.call(...meshUpgradeQueryKeys.meshWideNodes);
