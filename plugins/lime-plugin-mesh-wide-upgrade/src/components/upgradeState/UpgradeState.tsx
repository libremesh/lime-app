import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { GlobeIcon } from "components/icons/globeIcon";
import { Tick, Warning } from "components/icons/status";
import { RemoteNodeCallError } from "components/shared-state/SharedStateApi";
import { StatusMessage } from "components/status/statusMessage";

import { SyncCallErrors } from "utils/meshWideSyncCall";

interface UpgradeStateProps {
    icon?: ComponentChildren;
    title: ComponentChildren;
    children?: ComponentChildren;
}

export const UpgradeState = ({
    icon = <GlobeIcon size={80} className={`fill-internet`} />,
    title,
    children,
}: UpgradeStateProps) => {
    return (
        <div className={"flex flex-col gap-4 items-center"}>
            {icon}
            <div className="text-4xl font-bold">{title}</div>
            {children && <div className="text-2xl mb-6">{children}</div>}
        </div>
    );
};

export const ParallelErrors = ({ errors }: { errors: SyncCallErrors }) => {
    return (
        // Important to not add any style to this fragment because could add errors on growing on long lists
        <>
            <StatusMessage status={"warning"}>
                <Trans>Some nodes have errors:</Trans>
            </StatusMessage>
            <div className={"flex flex-col gap-3 mt-4 overflow-auto gap-4"}>
                {errors.map((error, key) => {
                    if (error instanceof RemoteNodeCallError) {
                        return (
                            <div key={key}>
                                <strong>{error.ip}</strong>: {error.message}
                            </div>
                        );
                    }
                    return <div key={key}>{error.toString()}</div>;
                })}
            </div>
        </>
    );
};

export const MeshUpgradeSuccessIcon = () => {
    return <Tick className={"text-9xl "} />;
};

export const MeshUpgradeErrorIcon = () => {
    return <Warning className={"w-32 h-32 text-9xl border-4 mx-auto"} />;
};
