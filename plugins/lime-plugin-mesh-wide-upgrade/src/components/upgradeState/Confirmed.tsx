import { Trans } from "@lingui/macro";

import { GlobeIcon } from "components/icons/globeIcon";

import { useParallelConfirmUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const Confirmed = () => {
    const { errors } = useParallelConfirmUpgrade();

    return (
        <div className={"flex flex-col gap-4 items-center"}>
            <GlobeIcon size={80} className={`fill-internet`} />

            <div className="text-4xl font-bold">
                <Trans>Confirmed!</Trans>
            </div>
            <div className="text-2xl mb-6">
                <Trans>Mesh upgrade confirmed successfully</Trans>
            </div>
        </div>
    );
};
