import { Trans } from "@lingui/macro";
import { useCallback } from "react";

import { useToast } from "components/toast/toastProvider";

// Toast to inform cannot connect to a node
export const useErrrorConnectionToast = () => {
    const { showToast } = useToast();
    const show = useCallback(
        (nodeInfo: string) => {
            showToast({
                text: (
                    <Trans>Error connecting with {nodeInfo}, is node up?</Trans>
                ),
            });
        },
        [showToast]
    );
    return { show };
};
