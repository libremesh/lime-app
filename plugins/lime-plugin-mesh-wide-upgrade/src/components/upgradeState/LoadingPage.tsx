import { VNode } from "preact";

import Loading from "components/loading";

import { UpgradeState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";

export const LoadingPage = ({
    title,
    description,
}: {
    title: VNode;
    description?: VNode;
}) => {
    return (
        <UpgradeState title={title} icon={<Loading />}>
            {description}
        </UpgradeState>
    );
};
