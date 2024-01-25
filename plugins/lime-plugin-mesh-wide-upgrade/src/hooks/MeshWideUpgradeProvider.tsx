import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useContext } from "react";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import {
    useMainNodeStatus,
    useMeshWideUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import {
    StepperState,
    UpgradeInfo,
    UpgradeNodesInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

import { useBoardData, useSession } from "utils/queries";

interface MeshWideUpgradeContextProps {
    data?: UpgradeNodesInfo;
    thisNode: UpgradeInfo;
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
        thisNode: null,
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

    const newVersionAvailable = !!(newVersionData && newVersionData.version);
    const totalNodes =
        nodesUpgradeInfo && Object.entries(nodesUpgradeInfo).length;
    const thisNode = nodesUpgradeInfo && nodesUpgradeInfo[boardData?.hostname];

    const { data: mainNodeStatus } = useMainNodeStatus({
        refetchInterval: downloadStatusInterval,
        enabled: thisNode?.upgrade_state === "STARTING",
    });
    const stepperState = getStepperStatus(
        nodesUpgradeInfo,
        thisNode,
        newVersionAvailable,
        mainNodeStatus
    );

    useEffect(() => {
        if (
            stepperState === "DOWNLOADING_MAIN" &&
            mainNodeStatus &&
            mainNodeStatus === "downloading"
        ) {
            setDownloadStatusInterval(1000);
        } else {
            setDownloadStatusInterval(null);
        }
    }, [mainNodeStatus, stepperState]);

    return (
        <MeshWideUpgradeContext.Provider
            value={{
                data: nodesUpgradeInfo,
                thisNode,
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
