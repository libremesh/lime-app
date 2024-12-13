import { Trans } from "@lingui/macro";

import {
    MeshUpgradeSuccessIcon,
    StepState,
} from "components/mesh-wide-wizard/StepState";

export const NoNewVersionAvailable = () => {
    return (
        <StepState
            title={<Trans>No new version available!</Trans>}
            icon={<MeshUpgradeSuccessIcon />}
        />
    );
};
