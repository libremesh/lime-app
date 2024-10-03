import { Trans } from "@lingui/macro";

import { StatusIcons } from "components/icons/status";
import NodeInfoListItem, {
    INodeInfoBodyItemProps,
} from "components/mesh-wide-wizard/NodeInfoListItem";
import { NodesListWrapper } from "components/mesh-wide-wizard/NodesListWrapper";

import { useMeshWideConfigState } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { MeshWideNodeConfigInfo } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import {
    InfoStatusMessageMap,
    mainNodeStatusMessageMap,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/upgradeStatusMessages";

const NodeConfigItem = ({
    info,
    name,
}: {
    info: MeshWideNodeConfigInfo;
    name: string;
}) => {
    const status: StatusIcons = info.error ? "warning" : "success";
    const nodeStatusInfo: INodeInfoBodyItemProps = {
        title: info.state,
        description: `info.state description`,
    };

    let descriptionMsg = InfoStatusMessageMap[info.state] ?? (
        <Trans>Error retrieving the status, is this node outdated?</Trans>
    );

    const mainNodeStatusInfo = mainNodeStatusMessageMap[info.main_node];
    if (mainNodeStatusInfo) {
        descriptionMsg = <Trans>(Main Node) {descriptionMsg}</Trans>;
    }

    const extraInfoItems: Array<INodeInfoBodyItemProps> = [
        nodeStatusInfo,
        ...(mainNodeStatusInfo ? [mainNodeStatusInfo] : []),
        {
            title: <Trans>Ip</Trans>,
            description: <Trans>{info.node_ip}</Trans>,
        },
    ];
    return (
        <NodeInfoListItem
            extraInfoItems={extraInfoItems}
            status={status}
            name={name}
            descriptionMsg={descriptionMsg}
            ip={info.node_ip}
            sharedStateUpdateTypes={["mesh_wide_upgrade"]}
        />
    );
};

const NodesListPage = () => {
    const { data, isLoading } = useMeshWideConfigState({});
    return (
        <NodesListWrapper
            data={data}
            isLoading={isLoading}
            NodeInfoComponent={NodeConfigItem}
        />
    );
};

export default NodesListPage;
