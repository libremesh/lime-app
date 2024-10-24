import { Trans } from "@lingui/macro";
import { useMemo } from "react";

import { useDisclosure } from "components/Modal/useDisclosure";
import { FooterStatus } from "components/status/footer";
import { IStatusAndButton } from "components/status/statusAndButton";

import {
    AbortModal,
    ConfirmModal,
    ScheduleUpgradeModal,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/modals";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelScheduleUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";
import { StepperState } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

export type ShowFooterStepperState = Extract<
    StepperState,
    | "UPDATE_AVAILABLE"
    | "DOWNLOADED_MAIN"
    | "TRANSACTION_STARTED"
    | "UPGRADE_SCHEDULED"
    | "CONFIRMATION_PENDING"
    | "ERROR"
>;

export function isShowFooterStepperState(
    value: string
): value is ShowFooterStepperState {
    return [
        "UPDATE_AVAILABLE",
        "DOWNLOADED_MAIN",
        "TRANSACTION_STARTED",
        "UPGRADE_SCHEDULED",
        "CONFIRMATION_PENDING",
        "ERROR",
    ].includes(value);
}

function isShowAbortButtonState(
    value: string
): value is ShowFooterStepperState {
    return [
        "TRANSACTION_STARTED",
        "UPGRADE_SCHEDULED",
        "CONFIRMATION_PENDING",
        "ERROR",
    ].includes(value);
}

const NextStepFooter = () => {
    const {
        stepperState,
        becomeMainNode,
        startFwUpgradeTransaction,
        allNodesReadyForUpgrade,
        abort,
    } = useMeshUpgrade();

    const { errors: scheduleErrors } = useParallelScheduleUpgrade();

    const {
        open: showScheduleModal,
        onOpen: openScheduleModal,
        onClose: closeScheduleModal,
    } = useDisclosure();

    const {
        open: showConfirmationModal,
        onOpen: openConfirmationModal,
        onClose: closeConfirmationModal,
    } = useDisclosure();

    const {
        open: showAbort,
        onOpen: openAbort,
        onClose: closeAbort,
    } = useDisclosure();

    const showFooter = isShowFooterStepperState(stepperState);

    const step: IStatusAndButton | null = useMemo(() => {
        if (!showFooter) return null;

        let step: IStatusAndButton;
        switch (stepperState as ShowFooterStepperState) {
            case "UPDATE_AVAILABLE":
                step = {
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
                break;
            case "DOWNLOADED_MAIN":
                step = {
                    status: "success",
                    onClick: startFwUpgradeTransaction,
                    children: <Trans>Ready to start mesh wide upgrade</Trans>,
                    btn: <Trans>Start</Trans>,
                };
                break;
            case "TRANSACTION_STARTED":
                step = {
                    status: allNodesReadyForUpgrade ? "success" : "warning",
                    onClick: openScheduleModal,
                    children: allNodesReadyForUpgrade ? (
                        <Trans>Ready to start mesh wide upgrade</Trans>
                    ) : (
                        <Trans>
                            Some nodes are not ready for upgrade <br />
                            Check node details for more info
                        </Trans>
                    ),
                    btn: <Trans>Schedule upgrade</Trans>,
                };
                break;
            case "UPGRADE_SCHEDULED": {
                const data: Omit<IStatusAndButton, "status" | "children"> = {
                    onClick: openScheduleModal,
                    btn: <Trans>Schedule again</Trans>,
                };
                if (scheduleErrors?.length) {
                    step = {
                        ...data,
                        status: "warning",
                        children: <Trans>Some nodes have errors</Trans>,
                    };
                }
                step = {
                    ...data,
                    status: "success",
                    children: <Trans>All nodes scheduled successful</Trans>,
                };
                break;
            }
            case "CONFIRMATION_PENDING":
                step = {
                    status: "success",
                    onClick: openConfirmationModal,
                    children: <Trans>Confirm upgrade on all nodes</Trans>,
                    btn: <Trans>Confirm</Trans>,
                };
                break;
            case "ERROR":
            default:
                step = {
                    status: "warning",
                    children: <Trans>Try last step again</Trans>,
                };
        }
        if (isShowAbortButtonState(stepperState)) {
            const showAbort: Pick<
                IStatusAndButton,
                "btnCancel" | "onClickCancel"
            > = {
                btnCancel: <Trans>Abort</Trans>,
                onClickCancel: openAbort,
            };
            step = { ...step, ...showAbort };
        }
        return step;
    }, [
        abort,
        allNodesReadyForUpgrade,
        becomeMainNode,
        scheduleErrors?.length,
        showConfirmationModal,
        showFooter,
        showScheduleModal,
        startFwUpgradeTransaction,
        stepperState,
    ]);

    return (
        <>
            {showFooter && (
                <>
                    <FooterStatus {...step} fixed={false} />
                    <ScheduleUpgradeModal
                        isSuccess={allNodesReadyForUpgrade}
                        isOpen={showScheduleModal}
                        onClose={closeScheduleModal}
                    />
                    <ConfirmModal
                        isOpen={showConfirmationModal}
                        onClose={closeConfirmationModal}
                        isSuccess // Ideally we have to implement some kind of state before run the upgrade to check if all nodes are up again.
                    />
                    <AbortModal isOpen={showAbort} onClose={closeAbort} />
                </>
            )}
        </>
    );
};

export default NextStepFooter;
