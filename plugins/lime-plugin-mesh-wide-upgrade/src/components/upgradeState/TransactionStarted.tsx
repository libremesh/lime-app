import { Trans } from "@lingui/macro";

import { UpgradeState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";

export const TransactionStarted = () => {
    const { someNodeDownloading } = useMeshUpgrade();
    const title = (
        <div className={"text-internet"}>
            <Trans>Mesh wide upgrade started!</Trans>
        </div>
    );

    return (
        <UpgradeState title={title}>
            {someNodeDownloading && (
                <div>
                    <Trans>
                        Some nodes are still downloading the firmware
                        <br />
                        check network page for more information
                    </Trans>
                </div>
            )}
        </UpgradeState>
    );
};
