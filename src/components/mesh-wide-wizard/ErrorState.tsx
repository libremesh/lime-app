import { Trans } from "@lingui/macro";
import { VNode } from "preact";

import {
    MeshUpgradeErrorIcon,
    StepState,
} from "components/mesh-wide-wizard/StepState";

export const ErrorState = ({ msg }: { msg: string | VNode }) => {
    return (
        <StepState
            title={<Trans>Error!</Trans>}
            icon={<MeshUpgradeErrorIcon />}
        >
            {msg}
        </StepState>
    );
};
