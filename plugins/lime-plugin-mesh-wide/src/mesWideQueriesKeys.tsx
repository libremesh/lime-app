import { QueryKey } from "@tanstack/react-query";

interface MeshWideQueryKeysProps {
    [key: string]: QueryKey;
}

const MeshWideQueryKeys: MeshWideQueryKeysProps = {
    meshWideNodes: [{ data_type: "node_info" }],
    wifiLinksInfo: [{ data_type: "wifi_links_info" }],
    batHosts: [{ data_type: "bat-hosts" }],
};

const getFromSharedState = ["shared-state", "getFromSharedState"];
const getFromSharedStateMultiWriter = [
    "shared-state",
    "getFromSharedStateMultiWriter",
];
const getFromSharedStateAsync = ["shared-state-async", "get"];

export const meshUpgradeQueryKeys = {
    meshWideNodes: [...getFromSharedState, ...MeshWideQueryKeys.meshWideNodes],
    meshWideNodesRef: [
        ...getFromSharedStateMultiWriter,
        ...MeshWideQueryKeys.meshWideNodes,
    ],
    wifiLinksInfo: [...getFromSharedState, ...MeshWideQueryKeys.wifiLinksInfo],
    wifiLinksInfoRef: [
        ...getFromSharedStateMultiWriter,
        ...MeshWideQueryKeys.wifiLinksInfo,
    ],
    batHosts: [...getFromSharedStateAsync, ...MeshWideQueryKeys.batHosts],
    batHostsRef: [
        ...getFromSharedStateMultiWriter,
        ...MeshWideQueryKeys.batHosts,
    ],
};
