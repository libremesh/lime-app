import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { StatusIcons } from "components/icons/status";
import NodeInfoListItem, {
    INodeInfoBodyItemProps,
} from "components/mesh-wide-wizard/NodeInfoListItem";
import { NodesListWrapper } from "components/mesh-wide-wizard/NodesListWrapper";

import { useMeshWideConfigState } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { meshConfigStateKey } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    ConfigUpdateState,
    MainNodeStatusType,
    MeshWideNodeConfigInfo,
    NodeMeshConfigInfo,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

const NodeConfigItem = ({
    info,
    name,
}: {
    info: MeshWideNodeConfigInfo;
    name: string;
}) => {
    const status: StatusIcons =
        info.transaction_state === "ERROR" ||
        info.transaction_state === "ABORTED"
            ? "warning"
            : "success";

    // Description under node name
    let descriptionMsg = InfoStatusMessageMap[info.transaction_state] ?? (
        <Trans>Error retrieving the status</Trans>
    );

    // Firt info when opening the accordion
    const nodeStatusInfo: INodeInfoBodyItemProps =
        detailedInfoStatusMessageMap(info)[info.transaction_state] ??
        detailedInfoStatusMessageMap()["DEFAULT"];

    // Main node status message
    const mainNodeStatusInfo = mainNodeStatusMessageMap[info.main_node];
    if (mainNodeStatusInfo) {
        descriptionMsg = <Trans>(Main Node) {descriptionMsg}</Trans>;
    }

    // Extra information from the state
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
            sharedStateUpdateTypes={[meshConfigStateKey]}
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

export const InfoStatusMessageMap: {
    [status in ConfigUpdateState]: ComponentChildren;
} = {
    DEFAULT: <Trans>No update in progres</Trans>,
    READY_FOR_APPLY: <Trans>Ready for apply</Trans>,
    RESTART_SCHEDULED: <Trans>Restart scheduled</Trans>,
    CONFIRMATION_PENDING: <Trans>Confirmation pending</Trans>,
    CONFIRMED: <Trans>Confirmed</Trans>,
    ERROR: <Trans>This node has an error</Trans>,
    ABORTED: <Trans>This node aborted successfully</Trans>,
};

type DetailedInfoStatusMessageMapType = {
    [status in ConfigUpdateState]: INodeInfoBodyItemProps;
};
export const detailedInfoStatusMessageMap = (
    nodeInfo?: NodeMeshConfigInfo
): DetailedInfoStatusMessageMapType => {
    return {
        DEFAULT: {
            title: <Trans>Everything is up to date!</Trans>,
            description: (
                <Trans>Mesh configuration is on the last version</Trans>
            ),
        },
        READY_FOR_APPLY: {
            title: <Trans>New configuration is on the node</Trans>,
            description: (
                <Trans>This node is awaiting to apply the configuration</Trans>
            ),
        },
        RESTART_SCHEDULED: {
            title: <Trans>The update is scheduled</Trans>,
            description: (
                <Trans>
                    After a time the new configuration will be installed and the
                    node will reboot
                </Trans>
            ),
        },
        CONFIRMATION_PENDING: {
            title: <Trans>Awaiting confirmation</Trans>,
            description: (
                <Trans>
                    The configuration seems to be updated successfully. Confirm
                    that the node is working properly or will be downgraded to
                    the previous version
                </Trans>
            ),
        },
        CONFIRMED: {
            title: <Trans>Configuration applied</Trans>,
            description: (
                <Trans>
                    Congratulations, this node has the new configuration working
                    on it
                </Trans>
            ),
        },
        ERROR: {
            title: <Trans>This node has an error!</Trans>,
            description: nodeInfo.error,
        },
        ABORTED: {
            title: <Trans>This node aborted</Trans>,
            description: (
                <Trans>Start mesh wide configuration update again</Trans>
            ),
        },
    };
};

type MainNodeInfoStatusMessageMapType = {
    [status in MainNodeStatusType]: INodeInfoBodyItemProps;
};

export const mainNodeStatusMessageMap: MainNodeInfoStatusMessageMapType = {
    NO: null,
    MAIN_NODE: {
        title: <Trans>This is a main node</Trans>,
        description: (
            <Trans>This node is sending new configuration to others</Trans>
        ),
    },
};

export default NodesListPage;
