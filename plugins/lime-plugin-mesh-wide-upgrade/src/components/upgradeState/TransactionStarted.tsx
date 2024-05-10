import { Trans } from "@lingui/macro";

import { GlobeIcon } from "components/icons/globeIcon";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";

export const TransactionStarted = () => {
    const { someNodeDownloading } = useMeshUpgrade();

    return (
        <div className={"flex flex-col gap-6 text-center items-center"}>
            <GlobeIcon size={80} className={`fill-internet`} />
            <div className={"text-4xl text-internet font-bold"}>
                <Trans>Mesh wide upgrade started!</Trans>
            </div>
            {someNodeDownloading && (
                <div>
                    <Trans>
                        Some nodes are still downloading the firmware
                        <br />
                        check network page for more information
                    </Trans>
                </div>
            )}
        </div>
    );
};
