import { Trans } from "@lingui/macro";

import {
    MeshUpgradeErrorIcon,
    MeshUpgradeSuccessIcon,
    ParallelErrors,
    StepState,
} from "components/mesh-wide-wizard/StepState";

import {
    useParallelConfirmConfig,
    useParallelReadyForApply,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

export const RestartScheduled = () => {
    const { totalNodes } = useMeshConfig();
    const { errors, results } = useParallelReadyForApply();

    return (
        <StepState title={<Trans>Restart is scheduled!</Trans>}>
            <>
                <Trans>
                    {results?.length} of {totalNodes} will be upgraded
                </Trans>
                {errors?.length > 0 && <ParallelErrors errors={errors} />}
            </>
        </StepState>
    );
};

export const RadyForApply = () => {
    const { allNodesReadyForApply } = useMeshConfig();
    const title = (
        <div className={"text-internet"}>
            <Trans>Ready for apply new configuration</Trans>
        </div>
    );

    return (
        <StepState title={title}>
            {!allNodesReadyForApply && (
                <div>
                    <Trans>
                        Some nodes have not the new configuration yet or are not
                        ready for apply it.
                        <br />
                        Check network page for more information
                    </Trans>
                </div>
            )}
        </StepState>
    );
};

export const Confirmed = () => {
    const { errors } = useParallelConfirmConfig();
    let icon = <MeshUpgradeSuccessIcon />;
    let title = <Trans>Confirmed!</Trans>;
    let desc = <Trans>New configuration confirmed successfully</Trans>;
    if (errors?.length > 0) {
        icon = <MeshUpgradeErrorIcon />;
        title = <Trans>Confirmed with some errors</Trans>;
        desc = <Trans>New configuration was confirmed with some errors</Trans>;
    }

    return (
        <StepState title={title} icon={icon}>
            {desc}
            {errors?.length > 0 && <ParallelErrors errors={errors} />}
        </StepState>
    );
};

export const ConfirmationPending = () => {
    const { errors } = useParallelConfirmConfig();
    const title = (
        <Trans>
            Configuration applied!
            <br />
            Awaiting confirmation
        </Trans>
    );

    return (
        <StepState title={title}>
            <>
                <Trans>
                    Check if network is working properly and confirm the new
                    configuration
                    <br />
                    If not confirmed, the new configuration will be rolled back
                    after a while
                </Trans>
                {errors?.length > 0 && <ParallelErrors errors={errors} />}
            </>
        </StepState>
    );
};

export const DefaultState = () => {
    return (
        <StepState
            title={<Trans>Apply mesh wide new configuration!</Trans>}
            icon={<MeshUpgradeSuccessIcon />}
        />
    );
};
