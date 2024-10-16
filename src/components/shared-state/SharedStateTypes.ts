import { MeshWideConfigState } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { MeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    IBabelLinks,
    IBatmanLinks,
    INodes,
    IWifiLinks,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export type MeshConfigTypes = {
    mesh_wide_config: MeshWideConfigState;
};

export type MeshUpgradeTypes = {
    mesh_wide_upgrade: MeshWideUpgradeInfo;
};

export type MeshWideMapTypes = {
    node_info: INodes;
    wifi_links_info: IWifiLinks;
    bat_links_info: IBatmanLinks;
    babel_links_info: IBabelLinks;
};

// Reference state types
type AppendRef<T> = {
    [K in keyof T as `${string & K}_ref`]: T[K];
};
export type MeshWideMapReferenceTypes = AppendRef<MeshWideMapTypes>;

export type AllSharedStateTypes = MeshWideMapTypes &
    MeshUpgradeTypes &
    MeshWideMapReferenceTypes &
    MeshConfigTypes;

export type SharedStateDataTypeKeys = keyof AllSharedStateTypes;

export type SharedStateDataTypes =
    AllSharedStateTypes[keyof AllSharedStateTypes];
export type SharedStateReturnType<T extends SharedStateDataTypes> = {
    data: T;
    error: number;
};
