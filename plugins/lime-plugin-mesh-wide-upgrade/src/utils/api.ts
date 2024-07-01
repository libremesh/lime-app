import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

/**
 * From a MeshWideUpgradeInfo nodes it returns the ips of the nodes that match the condition defined on the function
 * @param nodes the nodes to check
 * @param condition function that receives a NodeMeshUpgradeInfo and returns a boolean
 */
export const getNodeIpsByCondition = (
    nodes: MeshWideUpgradeInfo,
    // status: UpgradeStatusType
    condition: (node: NodeMeshUpgradeInfo) => boolean
) => {
    if (!nodes) return [];
    return Object.values(nodes)
        .filter(
            (node) =>
                node.node_ip !== null &&
                node.node_ip !== undefined &&
                node.node_ip.trim() !== "" &&
                condition(node)
        )
        .map((node) => node.node_ip as string); // 'as string' is safe here due to the filter condition
};
