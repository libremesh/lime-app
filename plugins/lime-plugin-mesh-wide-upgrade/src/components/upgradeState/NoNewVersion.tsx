import { Trans } from "@lingui/macro";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";

import { useBoardData } from "utils/queries";

export const NoNewVersionAvailable = () => {
    const { data: boardData } = useBoardData();
    const { data: newVersion } = useNewVersion();

    return (
        <div className="text-center ">
            <div className="text-9xl text-primary-light">✓</div>
            <div className="text-4xl">
                <Trans>No new version available!</Trans>
            </div>
        </div>
    );
};
