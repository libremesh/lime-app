import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide/src/mesWideQueriesKeys";
import {
    IBatmanLinks,
    INodes,
    IWifiLinks,
    SharedStateReturnType,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import api from "utils/uhttpd.service";

/**
 * Map the query keys to a specific type
 */
interface MeshUpgradeQueryKeyTypes {
    meshWideNodes: INodes;
    meshWideNodesRef: INodes;
    wifiLinksInfo: IWifiLinks;
    wifiLinksInfoRef: IWifiLinks;
    batHosts: IBatmanLinks;
    batHostsRef: IBatmanLinks;
}

const sharedStateApiCall = async <K extends keyof typeof meshUpgradeQueryKeys>(
    queryKey: K
) => {
    const res = (await api.call(
        ...meshUpgradeQueryKeys[queryKey]
    )) as SharedStateReturnType<MeshUpgradeQueryKeyTypes[K]>;
    if (res.error !== 0 && res.error !== 404) {
        throw Error(`Shared state error: ${res.error}`);
    }
    return res.data;
};

export const getMeshWideBatmanReference = () =>
    sharedStateApiCall("batHostsRef");

export const getMeshWideBatman = () => sharedStateApiCall("batHosts");

export const getMeshWideLinksReference = () =>
    sharedStateApiCall("wifiLinksInfoRef");

export const getMeshWideLinks = () => sharedStateApiCall("wifiLinksInfo");

export const getMeshWideNodesReference = () =>
    sharedStateApiCall("meshWideNodesRef");

export const getMeshWideNodes = async () => sharedStateApiCall("meshWideNodes");
