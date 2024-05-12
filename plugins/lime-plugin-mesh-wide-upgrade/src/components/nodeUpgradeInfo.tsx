import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { StatusIcon, StatusIcons } from "components/icons/status";
import { ListItemCollapsible } from "components/list-material";

import { MeshWideNodeUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    InfoStatusMessageMap,
    detailedInfoStatusMessageMap,
    mainNodeStatusMessageMap,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/upgradeStatusMessages";
import UpdateNodeInfoBtn from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/UpdateNodeInfoBtn";

export interface INodeInfoBodyItemProps {
    title: ComponentChildren;
    description: ComponentChildren;
}

const NodeInfoBodyItem = ({ title, description }: INodeInfoBodyItemProps) => (
    <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="text-gray-600">{description}</div>
    </div>
);

const NodeUpgradeInfoItem = ({
    info,
    name,
}: {
    info: MeshWideNodeUpgradeInfo;
    name: string;
}) => {
    const status: StatusIcons =
        info.upgrade_state === "ERROR" ? "warning" : "success";

    const nodeStatusInfo =
        detailedInfoStatusMessageMap(info)[info.upgrade_state] ??
        detailedInfoStatusMessageMap()["DEFAULT"];

    const mainNodeStatusInfo = mainNodeStatusMessageMap[info.main_node];
    let descriptionMsg = InfoStatusMessageMap[info.upgrade_state] ?? (
        <Trans>Error retrieving the status, is this node outdated?</Trans>
    );
    if (mainNodeStatusInfo) {
        descriptionMsg = <Trans>(Main Node) {descriptionMsg}</Trans>;
    }
    return (
        <ListItemCollapsible
            title={name}
            description={descriptionMsg}
            leftComponent={<StatusIcon status={status} />}
            rightText={
                <UpdateNodeInfoBtn
                    updateOnMount={false}
                    ip={info.node_ip}
                    nodeName={name}
                />
            }
        >
            <NodeInfoBodyItem {...nodeStatusInfo} />
            {mainNodeStatusInfo && <NodeInfoBodyItem {...mainNodeStatusInfo} />}
            <NodeInfoBodyItem
                title={<Trans>Board</Trans>}
                description={<Trans>{info.board_name}</Trans>}
            />
            <NodeInfoBodyItem
                title={<Trans>Firmware version</Trans>}
                description={<Trans>{info.current_fw}</Trans>}
            />
            <NodeInfoBodyItem
                title={<Trans>Ip</Trans>}
                description={<Trans>{info.node_ip}</Trans>}
            />
        </ListItemCollapsible>
    );
};

export default NodeUpgradeInfoItem;
