import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";

export const TransactionStarted = () => {
    const { someNodeDownloading } = useMeshUpgrade();

    return (
        <div>
            Transaction started!
            {someNodeDownloading && (
                <div>
                    Some nodes seems to be downloading, check network page for
                    more information
                </div>
            )}
        </div>
    );
};
