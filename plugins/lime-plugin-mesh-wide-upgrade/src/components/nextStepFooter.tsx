import { Trans } from "@lingui/macro";
import { useMemo } from "preact/compat";

import { FooterStatus } from "components/status/footer";
import { IStatusAndButton } from "components/status/statusAndButton";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/MeshWideUpgradeProvider";
import { isShowFooterStepperState } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

const NextStepFooter = () => {
    const { stepperState, becomeMainNode } = useMeshUpgrade();

    const showFooter = isShowFooterStepperState(stepperState);

    const footerProps: IStatusAndButton | null = useMemo(() => {
        if (!showFooter) return null;
        switch (stepperState) {
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
                    onClick: () => {},
                    children: <Trans>Ready to start mesh wide upgrade</Trans>,
                    btn: <Trans>Start</Trans>,
                };
            case "READY_FOR_UPGRADE":
                return {
                    status: "success",
                    onClick: () => {},
                    children: <Trans>The network is ready for upgrade</Trans>,
                    btn: <Trans>Upgrade</Trans>,
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
                    children: (
                        <Trans>
                            All nodes upgraded,
                            <br />
                            awaiting confirmation
                        </Trans>
                    ),
                    btn: <Trans>Confirm</Trans>,
                };
        }
    }, [becomeMainNode, showFooter, stepperState]);

    return <>{showFooter && <FooterStatus {...footerProps} />}</>;
};

export default NextStepFooter;
