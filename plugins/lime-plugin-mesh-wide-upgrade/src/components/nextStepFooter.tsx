import { Trans } from "@lingui/macro";
import { useMemo } from "preact/compat";

import { FooterStatus } from "components/status/footer";
import { IStatusAndButton } from "components/status/statusAndButton";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/MeshWideUpgradeProvider";

const NextStepFooter = () => {
    const { data: meshWideNodes, isLoading, totalNodes } = useMeshUpgrade();

    const footerProps: IStatusAndButton = useMemo(() => {
        return {
            status: "success",
            onClick: () => {},
            children: (
                <Trans>
                    Download remote firmware
                    <br />
                    to start mesh upgrade
                </Trans>
            ),
            btn: <Trans>Start mesh upgrade</Trans>,
        };
    }, []);

    return <FooterStatus {...footerProps} />;
};

export default NextStepFooter;
