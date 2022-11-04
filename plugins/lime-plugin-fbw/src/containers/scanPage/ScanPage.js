import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { useState } from "preact/hooks";

import Toast from "components/toast";

import { useBoardData } from "utils/queries";

import { useScanStop } from "../../FbwQueries";
import { ScanList } from "./ScanList";
import { SelectForm } from "./SelectForm";

export const ScanPage = ({
    toggleForm,
    setExpectedHost,
    setExpectedNetwork,
}) => {
    const { data: boardData } = useBoardData();

    const [selectedNetwork, setSelectedNetwork] = useState({
        hostname: boardData?.hostname,
    });

    /* Used to dismiss previously selected network, ex: on back or rescan button */
    function _cancelSelectedNetwork() {
        setSelectedNetwork({
            ...selectedNetwork,
            file: "",
            apname: "",
            community: "",
        });
    }

    const {
        mutateAsync: scanStop,
        isError: stopError,
        isLoading: stoppingScan,
    } = useScanStop({
        onSuccess: () => {
            _cancelSelectedNetwork();
            toggleForm(null)();
        },
    });

    /* Cancel and go back */
    async function _cancel() {
        return await scanStop();
    }

    return (
        <Fragment>
            {selectedNetwork.apname ? (
                <SelectForm
                    toggleForm={toggleForm}
                    setExpectedHost={setExpectedHost}
                    setExpectedNetwork={setExpectedNetwork}
                    selectedNetwork={selectedNetwork}
                    setSelectedNetwork={setSelectedNetwork}
                    cancelSelectedNetwork={_cancelSelectedNetwork}
                    cancel={_cancel}
                />
            ) : (
                <ScanList
                    selectedNetwork={selectedNetwork}
                    setSelectedNetwork={setSelectedNetwork}
                    cancelSelectedNetwork={_cancelSelectedNetwork}
                    cancel={_cancel}
                />
            )}
            {stopError ? (
                <Toast text={<Trans>Error stopping scan</Trans>} />
            ) : null}
            {stoppingScan ? <Toast text={<Trans>Canceling</Trans>} /> : null}
        </Fragment>
    );
};
