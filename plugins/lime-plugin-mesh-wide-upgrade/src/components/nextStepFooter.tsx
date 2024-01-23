import { Trans } from "@lingui/macro";
import { useMemo } from "preact/compat";

import { FooterStatus } from "components/status/footer";
import { IStatusAndButton } from "components/status/statusAndButton";

import { useSetUpLocalRepository } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import { StepperState } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { isShowFooterStepperState } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

const NextStepFooter = ({ stepperState }: { stepperState: StepperState }) => {
    // const { data: meshWideNodes, isLoading, totalNodes } = useMeshUpgrade();
    const { mutate: setUpLocalRepository } = useSetUpLocalRepository({
        onSuccess: () => {},
    });

    const showFooter = isShowFooterStepperState(stepperState);

    const footerProps: IStatusAndButton | null = useMemo(() => {
        if (!showFooter) return null;
        switch (stepperState) {
            case "UPDATE_AVAILABLE":
                return {
                    status: "success",
                    onClick: () => setUpLocalRepository({}),
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
    }, [setUpLocalRepository, showFooter, stepperState]);

    return <>{showFooter && <FooterStatus {...footerProps} />}</>;
};

export default NextStepFooter;
