import { Trans } from "@lingui/macro";

import { StatusIcons } from "components/icons/status";
import NodeInfoListItem, {
    INodeInfoBodyItemProps,
} from "components/mesh-wide-wizard/NodeInfoListItem";

import { meshUpgradeSharedStateKey } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueriesKeys";
import { MeshWideNodeUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    InfoStatusMessageMap,
    detailedInfoStatusMessageMap,
    mainNodeStatusMessageMap,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/upgradeStatusMessages";

const NodeUpgradeInfoItem = ({
    info,
    name,
}: {
    info: MeshWideNodeUpgradeInfo;
    name: string;
}) => {
    const status: StatusIcons =
        info.upgrade_state === "ERROR" ? "warning" : "success";

    const nodeStatusInfo: INodeInfoBodyItemProps =
        detailedInfoStatusMessageMap(info)[info.upgrade_state] ??
        detailedInfoStatusMessageMap()["DEFAULT"];

    let descriptionMsg = InfoStatusMessageMap[info.upgrade_state] ?? (
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
            title: <Trans>Board</Trans>,
            description: <Trans>{info.board_name}</Trans>,
        },
        {
            title: <Trans>Firmware version</Trans>,
            description: <Trans>{info.current_fw}</Trans>,
        },
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
            sharedStateUpdateTypes={[meshUpgradeSharedStateKey]}
        />
    );
};

export default NodeUpgradeInfoItem;
