import { Trans } from "@lingui/macro";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";

import { useBoardData } from "utils/queries";

export const NewVersionAvailable = ({
    readyForUpgrade,
}: {
    readyForUpgrade?: boolean;
}) => {
    const { data: boardData } = useBoardData();
    const { data: newVersion } = useNewVersion();

    return (
        <div className="text-center">
            <div className="text-4xl">
                {readyForUpgrade ? (
                    <Trans>Start Mesh Wide Transaction</Trans>
                ) : (
                    <Trans>New version available!</Trans>
                )}
            </div>
            <div className="text-2xl">
                <Trans>This node version:</Trans>
                <br />
                {boardData && boardData.release.description}
            </div>
            <div className="text-2xl">
                <Trans>New available version:</Trans>
                <br />
                {newVersion && newVersion.version}
            </div>
            {readyForUpgrade && (
                <div className="text-2xl">
                    <Trans>Is ready for upgrade!</Trans>
                    <br />
                </div>
            )}
        </div>
    );
};
