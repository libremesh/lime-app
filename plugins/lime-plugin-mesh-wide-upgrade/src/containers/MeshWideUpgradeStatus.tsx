import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import { NewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NewVersionAvailable";
import { NoNewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NoNewVersion";

export const MeshWideUpgradeStatus = () => {
    const { data: newVersion } = useNewVersion();
    const isNewVersion = newVersion && newVersion.version;
    return (
        <div className="container container-center">
            {isNewVersion && <NewVersionAvailable />}
            {!isNewVersion && <NoNewVersionAvailable />}
        </div>
    );
};
