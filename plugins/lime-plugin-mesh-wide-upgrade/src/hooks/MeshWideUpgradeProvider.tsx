import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useContext } from "react";

import {
    useDownloadStatus,
    useNewVersion,
} from "plugins/lime-plugin-firmware/src/firmwareQueries";
import {
    useMeshUpgradeNodeStatus,
    useMeshWideUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { EupgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/eupgrade";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

import { useBoardData, useSession } from "utils/queries";

interface MeshWideUpgradeContextProps {
    data?: MeshWideUpgradeInfo;
    thisNode: NodeMeshUpgradeInfo;
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

    const [isMasterNode, setIsMasterNode] = useState(false);

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

    const { data: thisNode } = useMeshUpgradeNodeStatus({
        refetchInterval: isMasterNode ? downloadStatusInterval : 0,
        enabled: true,
    });

    const { data: downloadStatus } = useDownloadStatus({
        refetchInterval: downloadStatusInterval,
        enabled: thisNode?.upgrade_state === "STARTING",
    });
    const eupgradeStatus = downloadStatus as EupgradeStatus;

    const stepperState = getStepperStatus(
        nodesUpgradeInfo,
        thisNode,
        newVersionAvailable,
        eupgradeStatus
    );

    useEffect(() => {
        if (
            stepperState === "DOWNLOADING_MAIN" &&
            eupgradeStatus &&
            eupgradeStatus === "downloading"
        ) {
            setDownloadStatusInterval(1000);
        } else {
            setDownloadStatusInterval(null);
        }
    }, [eupgradeStatus, stepperState]);

    useEffect(() => {
        setIsMasterNode(thisNode.master_node);
    }, [thisNode.master_node]);

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
