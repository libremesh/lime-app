import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import Loading from "components/loading";

import { useReboot, useSetNeedReboot } from "utils/queries";

const RebootPage = () => {
    const { mutate: setReboot, isLoading, isSuccess } = useReboot();
    const { mutate: setNeedReboot } = useSetNeedReboot();

    function cancel() {
        setNeedReboot("no");
        route("/");
    }

    function reboot() {
        setReboot();
    }

    if (isSuccess) {
        return (
            <div className={`container container-padded container-center`}>
                <h3>
                    <Trans>Rebooting</Trans>
                </h3>
                <span>
                    <Trans>
                        Please wait while the device reboots, and reload the app
                    </Trans>
                </span>
            </div>
        );
    }

    return (
        <div className={`container container-padded container-center`}>
            <p>
                <Trans>Are you sure you want to reboot?</Trans>
            </p>
            <button onClick={reboot}>
                <Trans>Yes</Trans>
            </button>
            <button onClick={cancel}>
                <Trans>No, cancel</Trans>
            </button>
            {isLoading && (
                <div>
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default RebootPage;
