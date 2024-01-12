import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { StatusIcon, StatusIcons } from "components/icons/status";
import { ListItemCollapsible } from "components/list-material";

import { UpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
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

const NodeInfoDetail = ({ info }: { info: UpgradeInfo }) => {
    const nodeInfo =
        DetailedInfoStatusMessageMap[info.upgrade_state] ??
        DetailedInfoStatusMessageMap["DEFAULT"];
    return <NodeInfoBodyItem {...nodeInfo} />;
    // if (info.state === "UPDATED") {
    //     return (
    //         <NodeInfoBodyItem
    //             title={<Trans>Node updated</Trans>}
    //             description={
    //                 <Trans>The firmware is at the most updated version </Trans>
    //             }
    //         />
    //     );
    // }
    // return (
    //     <div>
    //         {info.state === "DOWNLOADING" && (
    //             <Item
    //                 title={<Trans>Downloading {info.new_version_info}</Trans>}
    //                 description={
    //                     <Trans>The node is downloading the new firmware</Trans>
    //                 }
    //             />
    //         )}
    //         {info.state === "DOWNLOADING" ||
    //             (info.state === "UPGRADE_AVAILABLE" && (
    //                 <Item
    //                     title={<Trans>New version available!</Trans>}
    //                     description={
    //                         <Trans>{info.new_version_info} is available!</Trans>
    //                     }
    //                 />
    //             ))}
    //         {info.state === "UPGRADE_READY" && (
    //             <Item
    //                 title={<Trans>Ready to upgrade</Trans>}
    //                 description={
    //                     <Trans>
    //                         {info.new_version_info} is downloaded successfully,
    //                         this node is ready for upgrade.
    //                     </Trans>
    //                 }
    //             />
    //         )}
    //         {info.state === "UPGRADE_SCHEDULED" && (
    //             <Item
    //                 title={<Trans>Upgrade scheduled</Trans>}
    //                 description={
    //                     <Trans>
    //                         The node will perform the upgrade at
    //                         {info.scheduled}.
    //                     </Trans>
    //                 }
    //             />
    //         )}
    //         <Item
    //             title={
    //                 info.safe_upgrade ? (
    //                     <Trans>Safe upgrade available</Trans>
    //                 ) : (
    //                     <Trans>Safe upgrade is not supported</Trans>
    //                 )
    //             }
    //             description={
    //                 info.safe_upgrade ? (
    //                     <Trans>
    //                         If the connectivity is lost during the upgrade it
    //                         will be reverted at the previous version
    //                     </Trans>
    //                 ) : (
    //                     <Trans>
    //                         If something went wrong during the upgrade it have
    //                         to be reverted manualy
    //                     </Trans>
    //                 )
    //             }
    //         />
    //     </div>
    // );
};

const NodeUpgradeInfoItem = ({
    info,
    name,
}: {
    info: UpgradeInfo;
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
