import { StatusIcon, StatusIcons } from "components/icons/status";
import { ListItemCollapsible } from "components/list-material";

import { UpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

const NodeUpgradeInfo = ({
    info,
    name,
}: {
    info: UpgradeInfo;
    name: string;
}) => {
    const status: StatusIcons =
        info.state === "UPDATED" ? "success" : "warning";

    return (
        <ListItemCollapsible
            title={name}
            description={info.state}
            leftComponent={<StatusIcon status={status} />}
            rightText={"Info"}
        >
            helloworld
        </ListItemCollapsible>
    );
};

export default NodeUpgradeInfo;
