import { Trans } from "@lingui/macro";

import Loading from "components/loading";

import NodeUpgradeInfoItem from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nodeUpgradeInfo";
import { UpgradeState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { CenterFlex } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/divs";

export const NodesList = () => {
    const { data, isLoading } = useMeshUpgrade();

    if (isLoading) {
        return <Loading />;
    }

    if (!data || (data && Object.keys(data).length === 0)) {
        return (
            <CenterFlex>
                <UpgradeState
                    icon={null}
                    title={
                        <Trans>
                            No nodes present on the <br />
                            mesh wide upgrade state yet!
                        </Trans>
                    }
                />
            </CenterFlex>
        );
    }

    return (
        <>
            {data &&
                Object.entries(data).map(([key, nodeInfo], index) => {
                    return (
                        <NodeUpgradeInfoItem
                            key={index}
                            name={key}
                            info={nodeInfo}
                        />
                    );
                })}
        </>
    );
};
