import { Trans } from "@lingui/macro";
import { ComponentType } from "preact";

import Loading from "components/loading";
import { CenterFlex } from "components/mesh-wide-wizard/WizardWrapper";

import { UpgradeState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";

type NodesListProps<T, K extends keyof T> = {
    data: Record<string, T> | null;
    isLoading: boolean;
    NodeInfoComponent: ComponentType<{ name: string; info: T }>;
};

export const NodesListWrapper = <T, K extends keyof T>({
    data,
    isLoading,
    NodeInfoComponent,
}: NodesListProps<T, K>) => {
    if (isLoading) {
        return <Loading />;
    }

    if (!data || (data && Object.keys(data).length === 0)) {
        return (
            <CenterFlex>
                <UpgradeState
                    icon={null}
                    title={
                        <Trans>
                            No nodes present on the <br />
                            mesh wide upgrade state yet!
                        </Trans>
                    }
                />
            </CenterFlex>
        );
    }

    return (
        <>
            {data &&
                Object.entries(data).map(([key, nodeInfo]) => (
                    <NodeInfoComponent key={key} name={key} info={nodeInfo} />
                ))}
        </>
    );
};
