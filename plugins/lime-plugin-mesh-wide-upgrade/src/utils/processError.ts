import {
    MeshWideError,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

export const getMeshWideError = (
    thisNode: NodeMeshUpgradeInfo
): MeshWideError | undefined => {
    if (thisNode.upgrade_state !== "ERROR") return;
    return { errorMessage: thisNode.error, errorCode: thisNode.upgrade_state };
};
