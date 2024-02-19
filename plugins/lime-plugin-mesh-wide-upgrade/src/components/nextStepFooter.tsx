import { Trans } from "@lingui/macro";
import { useMemo } from "preact/compat";

import { FooterStatus } from "components/status/footer";
import { IStatusAndButton } from "components/status/statusAndButton";

import { useScheduleUpgradeModal } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/modals";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/MeshWideUpgradeProvider";
import {
    ShowFooterStepperState,
    isShowFooterStepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

const NextStepFooter = () => {
    const {
        stepperState,
        becomeMainNode,
        startFwUpgradeTransaction,
        allNodesReadyForUpgrade: allNodesReady,
    } = useMeshUpgrade();

    const { toggleModal: toggleStartSchedule, showScheduleModal } =
        useScheduleUpgradeModal({
            allNodesReady,
            cb: () => {
                console.log("Schedule upgrade");
                // startFwUpgradeTransaction()
            },
        });

    const showFooter = isShowFooterStepperState(stepperState);

    const footerProps: IStatusAndButton | null = useMemo(() => {
        if (!showFooter) return null;
        switch (stepperState as ShowFooterStepperState) {
            case "UPDATE_AVAILABLE":
                return {
                    status: "success",
                    onClick: () => becomeMainNode(),
                    children: (
                        <Trans>
                            Download remote firmware
                            <br />
                            to start mesh upgrade
                        </Trans>
                    ),
                    btn: <Trans>Start mesh upgrade</Trans>,
                };
            case "DOWNLOADED_MAIN":
                return {
                    status: "success",
                    onClick: startFwUpgradeTransaction,
                    children: <Trans>Ready to start mesh wide upgrade</Trans>,
                    btn: <Trans>Start</Trans>,
                };
            case "TRANSACTION_STARTED":
                return {
                    status: allNodesReady ? "success" : "warning",
                    onClick: () => {
                        showScheduleModal();
                    },
                    children: allNodesReady ? (
                        <Trans>Ready to start mesh wide upgrade</Trans>
                    ) : (
                        <Trans>
                            Some nodes are not ready for upgrade <br />
                            Check node details for more info
                        </Trans>
                    ),
                    btn: <Trans>Schedule upgrade</Trans>,
                };
            case "CONFIRMATION_PENDING":
                return {
                    status: "success",
                    onClick: () => {},
                    children: (
                        <Trans>
                            All nodes upgraded,
                            <br />
                            awaiting confirmation
                        </Trans>
                    ),
                    btn: <Trans>Confirm</Trans>,
                };
            case "ERROR":
            default:
                return {
                    status: "warning",
                    onClick: () => {},
                    children: <Trans>Try last step again</Trans>,
                    btn: <Trans>Try again</Trans>,
                };
        }
    }, [becomeMainNode, showFooter, startFwUpgradeTransaction, stepperState]);

    return <>{showFooter && <FooterStatus {...footerProps} />}</>;
};

export default NextStepFooter;
