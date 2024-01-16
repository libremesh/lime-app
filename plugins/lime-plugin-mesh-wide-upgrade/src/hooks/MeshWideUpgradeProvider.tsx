import { ComponentChildren, createContext } from "preact";
import { useContext } from "react";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import { useMeshWideUpgradeQuery } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import { UpgradeNodesInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

import { useSession } from "utils/queries";

interface MeshWideUpgradeContextProps {
    data?: UpgradeNodesInfo;
    totalNodes: number;
    isLoading: boolean;
    isError: boolean;
    newVersionAvailable: boolean;
}

export const MeshWideUpgradeContext =
    createContext<MeshWideUpgradeContextProps>({
        isLoading: false,
        isError: false,
        totalNodes: 0,
        newVersionAvailable: false,
    });

export const MeshWideUpgradeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const { data, isLoading, isError } = useMeshWideUpgradeQuery({});
    const { data: session } = useSession();
    const { data: newVersionData } = useNewVersion({
        enabled: session?.username !== undefined,
    });

    const totalNodes = data && Object.entries(data).length;
    const newVersionAvailable = newVersionData && newVersionData.version;

    return (
        <MeshWideUpgradeContext.Provider
            value={{
                data,
                isLoading,
                isError,
                totalNodes,
                newVersionAvailable,
            }}
        >
            {children}
        </MeshWideUpgradeContext.Provider>
    );
};

export const useMeshUpgrade = () => {
    const context = useContext(MeshWideUpgradeContext);
    if (context === undefined) {
        throw new Error(
            "useMeshUpgrade must be used within a MeshWideUpgradeProvider"
        );
    }
    return context;
};
