import { Trans } from "@lingui/macro";

import Loading from "components/loading";

export const DownloadingMain = () => {
    return (
        <div className="text-center">
            <Loading />
            <div className="text-4xl">
                <Trans>Downloading</Trans>
            </div>
        </div>
    );
};
