import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useContext } from "react";

import {
    useDownloadStatus,
    useNewVersion,
} from "plugins/lime-plugin-firmware/src/firmwareQueries";
import { useMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import {
    StepperState,
    UpgradeNodesInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

import { useBoardData, useSession } from "utils/queries";

interface MeshWideUpgradeContextProps {
    data?: UpgradeNodesInfo;
    totalNodes: number;
    isLoading: boolean;
    isError: boolean;
    newVersionAvailable: boolean;
    stepperState: StepperState;
}

export const MeshWideUpgradeContext =
    createContext<MeshWideUpgradeContextProps>({
        isLoading: false,
        isError: false,
        totalNodes: 0,
        newVersionAvailable: false,
        stepperState: "INITIAL",
    });

export const MeshWideUpgradeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const [downloadStatusInterval, setDownloadStatusInterval] = useState(null);

    const {
        data: nodesUpgradeInfo,
        isLoading,
        isError,
    } = useMeshWideUpgradeInfo({});
    const { data: boardData } = useBoardData();
    const { data: session } = useSession();
    const { data: newVersionData } = useNewVersion({
        enabled: session?.username !== undefined,
    });
    const newVersionAvailable = newVersionData && newVersionData.version;
    const { data: downloadStatus } = useDownloadStatus({
        refetchInterval: downloadStatusInterval,
        enabled: !!newVersionAvailable,
    });

    const totalNodes =
        nodesUpgradeInfo && Object.entries(nodesUpgradeInfo).length;
    const thisNode = nodesUpgradeInfo && nodesUpgradeInfo[boardData?.hostname];
    const stepperState = getStepperStatus(
        nodesUpgradeInfo,
        thisNode,
        newVersionAvailable,
        downloadStatus
    );

    useEffect(() => {
        if (
            stepperState === "DOWNLOADING_MAIN" &&
            downloadStatus &&
            downloadStatus.download_status === "downloading"
        ) {
            setDownloadStatusInterval(1000);
        } else {
            setDownloadStatusInterval(null);
        }
    }, [downloadStatus, stepperState]);

    return (
        <MeshWideUpgradeContext.Provider
            value={{
                data: nodesUpgradeInfo,
                isLoading,
                isError,
                totalNodes,
                newVersionAvailable,
                stepperState,
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
