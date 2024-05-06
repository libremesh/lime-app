import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import Toast from "components/toast";

import { isValidHostname, slugify } from "utils/isValidHostname";

import { useSetNetwork } from "../../FbwQueries";
import { BackButton, CancelButton } from "./components/buttons";

export const SelectForm = ({
    toggleForm,
    setExpectedHost,
    setExpectedNetwork,
    selectedNetwork,
    setSelectedNetwork,
    cancelSelectedNetwork,
    cancel,
}) => {
    const [validHostnameError, setValidHostnameError] = useState(false); // Scan status

    const {
        mutate: setNetwork,
        isLoading: isSetNetworkSubmitting,
        isError: isSetNetworkError,
    } = useSetNetwork({
        onSuccess: () => {
            setExpectedHost(selectedNetwork.hostname);
            setExpectedNetwork(selectedNetwork.community);
            toggleForm("setting")();
        },
    });

    /* Validate selectedNetwork and set network in the router */
    function _setNetwork() {
        if (
            selectedNetwork.apname &&
            isValidHostname(selectedNetwork.hostname, true)
        ) {
            setNetwork({
                file: selectedNetwork.file,
                hostname: selectedNetwork.hostname,
            });
        } else {
            setValidHostnameError(true);
            setTimeout(() => {
                setValidHostnameError(false);
            }, 2000);
        }
    }

    /* Input to selectedNetwork function*/
    function _changeHostName(e) {
        const end = e.type === "change";
        e.target.value = slugify(e.target.value.toLocaleLowerCase(), end);
        setSelectedNetwork({
            ...selectedNetwork,
            hostname: e.target.value || "",
        });
        return e;
    }

    return (
        <div className="container container-padded">
            <div>
                <div>
                    {selectedNetwork.apname ? (
                        <div>
                            <div className="container">
                                <div>
                                    <h4>
                                        <Trans>Join the mesh</Trans>
                                    </h4>
                                    <label>
                                        <Trans>Selected network to join</Trans>
                                    </label>
                                    <input
                                        type="text"
                                        disabled={true}
                                        className="u-full-width"
                                        value={selectedNetwork.apname}
                                    />
                                    <label htmlFor="hostname">
                                        <Trans>
                                            Choose a name for this node
                                        </Trans>
                                    </label>
                                    <input
                                        id="hostname"
                                        type="text"
                                        placeholder={`Host name`}
                                        className="u-full-width"
                                        value={selectedNetwork.hostname}
                                        onInput={_changeHostName}
                                    />
                                </div>
                                <button
                                    onClick={_setNetwork}
                                    disabled={
                                        !isValidHostname(
                                            selectedNetwork.hostname
                                        ) || isSetNetworkSubmitting
                                    }
                                    className="u-full-width"
                                >
                                    <Trans>Set network</Trans>
                                </button>
                                <div className="row">
                                    <div className="six columns">
                                        <CancelButton cancel={cancel} />
                                    </div>
                                    <div className="six columns">
                                        <BackButton
                                            goBack={cancelSelectedNetwork}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        false
                    )}
                </div>
            </div>
            {isSetNetworkError && (
                <Toast text={<Trans>Error setting network</Trans>} />
            )}
            {validHostnameError && (
                <Toast text={<Trans>Must select a valid hostname</Trans>} />
            )}
        </div>
    );
};
