import { ComponentChildren, createContext } from "preact";
import { useMemo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { useCallback, useContext } from "react";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import {
    meshUpgradeNodeStatusKey,
    useBecomeMainNode,
    useMeshUpgradeNodeStatus,
    useMeshWideUpgradeInfo,
    useStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import {
    MeshWideError,
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { getMeshWideError } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/processError";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

import { useBoardData, useSession } from "utils/queries";
import queryCache from "utils/queryCache";

const NODE_STATUS_REFETCH_INTERVAL = 2000;

interface MeshWideUpgradeContextProps {
    data?: MeshWideUpgradeInfo;
    thisNode: NodeMeshUpgradeInfo;
    totalNodes: number;
    isLoading: boolean;
    isError: boolean;
    newVersionAvailable: boolean;
    stepperState: StepperState;
    becomeMainNode: () => void;
    startFwUpgradeTransaction: () => void;
    meshWideError?: MeshWideError;
    allNodesReadyForUpgrade: boolean;
}

export const MeshWideUpgradeContext =
    createContext<MeshWideUpgradeContextProps>({
        isLoading: false,
        isError: false,
        totalNodes: 0,
        newVersionAvailable: false,
        stepperState: "INITIAL",
        thisNode: null,
        becomeMainNode: () => {},
        startFwUpgradeTransaction: () => {},
        allNodesReadyForUpgrade: false,
    });

export const MeshWideUpgradeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const [downloadStatusInterval, setDownloadStatusInterval] = useState(0);

    // UseCallback tpo invalidate queries
    const invalidateQueries = useCallback(() => {
        queryCache.invalidateQueries({
            queryKey: meshUpgradeNodeStatusKey,
        });
    }, []);

    const {
        data: nodesUpgradeInfo,
        isLoading: meshWideInfoLoading,
        isError,
    } = useMeshWideUpgradeInfo({
        refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
    });

    const { mutate: becomeMainNodeMutation } = useBecomeMainNode({
        onSuccess: () => {
            invalidateQueries();
            console.log("todo: become main node success");
        },
    });

    const { mutate: fwUpgradeTransaction } = useStartFirmwareUpgradeTransaction(
        {
            onSuccess: () => {
                invalidateQueries();
                console.log("todo: start fw upgrade transaction success");
            },
        }
    );

    const { data: boardData } = useBoardData();
    const { data: session } = useSession();
    const { data: newVersionData } = useNewVersion({
        enabled: session?.username !== undefined,
    });

    const newVersionAvailable = !!(newVersionData && newVersionData.version);
    const totalNodes =
        nodesUpgradeInfo && Object.entries(nodesUpgradeInfo).length;

    const { data: thisNode, isLoading: thisNodeLoading } =
        useMeshUpgradeNodeStatus({
            refetchInterval: downloadStatusInterval,
            enabled: true,
        });

    const eupgradeStatus = thisNode?.eupgradestate;

    const stepperState = getStepperStatus(
        nodesUpgradeInfo,
        thisNode,
        newVersionAvailable,
        eupgradeStatus
    );

    const meshWideError = getMeshWideError(thisNode);

    const becomeMainNode = useCallback(() => {
        becomeMainNodeMutation({});
        setDownloadStatusInterval(NODE_STATUS_REFETCH_INTERVAL);
    }, [becomeMainNodeMutation]);

    const startFwUpgradeTransaction = useCallback(() => {
        fwUpgradeTransaction({});
    }, [fwUpgradeTransaction]);

    // useMemo to check that all nodes have the status of READY_FOR_UPGRADE
    const allNodesReadyForUpgrade = useMemo(() => {
        return Object.values(nodesUpgradeInfo || {}).every(
            (node) => node.upgrade_state === "READY_FOR_UPGRADE"
        );
    }, [nodesUpgradeInfo]);

    useEffect(() => {
        if (
            thisNode?.main_node &&
            thisNode.main_node === "STARTING" &&
            thisNode.eupgradestate === "downloading"
        ) {
            setDownloadStatusInterval(NODE_STATUS_REFETCH_INTERVAL);
        } else {
            setDownloadStatusInterval(0);
        }
    }, [thisNode?.eupgradestate, thisNode?.main_node]);

    const isLoading = meshWideInfoLoading || thisNodeLoading;

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
                becomeMainNode,
                startFwUpgradeTransaction,
                meshWideError,
                allNodesReadyForUpgrade,
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
