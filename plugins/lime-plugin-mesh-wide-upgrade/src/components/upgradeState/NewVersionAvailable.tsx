import { Trans } from "@lingui/macro";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";

import { useBoardData } from "utils/queries";

export const NewVersionAvailable = () => {
    const { data: boardData } = useBoardData();
    const { data: newVersion } = useNewVersion();

    return (
        <div className="text-center">
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
            <div className="text-4xl">
                <Trans>New version available!</Trans>
            </div>
        </div>
    );
};
