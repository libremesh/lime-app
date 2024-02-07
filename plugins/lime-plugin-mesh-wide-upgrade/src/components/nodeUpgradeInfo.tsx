import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { StatusIcon, StatusIcons } from "components/icons/status";
import { ListItemCollapsible } from "components/list-material";

import { MeshWideNodeUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import {
    DetailedInfoStatusMessageMap,
    InfoStatusMessageMap,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/upgradeStatusMessages";

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

const NodeInfoDetail = ({ info }: { info: MeshWideNodeUpgradeInfo }) => {
    const nodeInfo =
        DetailedInfoStatusMessageMap(info.error)[info.upgrade_state] ??
        DetailedInfoStatusMessageMap()["DEFAULT"];
    return <NodeInfoBodyItem {...nodeInfo} />;
};

const NodeUpgradeInfoItem = ({
    info,
    name,
}: {
    info: MeshWideNodeUpgradeInfo;
    name: string;
}) => {
    const status: StatusIcons =
        info.upgrade_state === "ERROR" ? "warning" : "success";

    const descriptionMsg = InfoStatusMessageMap[info.upgrade_state] ?? (
        <Trans>Error retrieving the status, is this node outdated?</Trans>
    );

    return (
        <ListItemCollapsible
            title={name}
            description={descriptionMsg}
            leftComponent={<StatusIcon status={status} />}
            rightText={"Info"}
        >
            <NodeInfoDetail info={info} />
        </ListItemCollapsible>
    );
};

export default NodeUpgradeInfoItem;
