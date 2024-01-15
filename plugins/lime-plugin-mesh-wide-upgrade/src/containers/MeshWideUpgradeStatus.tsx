import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import { NewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/NewVersionAvailable";

import { useBoardData } from "utils/queries";

export const MeshWideUpgradeStatus = () => {
    const { data: boardData } = useBoardData();
    const { data: newVersion } = useNewVersion();

    return (
        <div className="container container-center">
            {newVersion && <NewVersionAvailable />}
        </div>
    );
};
