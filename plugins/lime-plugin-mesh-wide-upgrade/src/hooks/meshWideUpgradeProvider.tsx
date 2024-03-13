import { ComponentChildren, createContext } from "preact";
import { useMemo } from "preact/compat";
import { useCallback, useContext } from "react";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/useStepper";
import {
    meshUpgradeNodeStatusKey,
    useBecomeMainNode,
    useMeshUpgradeNodeStatus,
    useMeshWideUpgradeInfo,
    useParallelConfirmUpgrade,
    useParallelScheduleUpgrade,
    useStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";
import {
    MeshWideError,
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import { getMeshWideError } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/processError";

import { useSession } from "utils/queries";
import queryCache from "utils/queryCache";

const NODE_STATUS_REFETCH_INTERVAL = 2000;

interface MeshWideUpgradeContextProps {
    data?: MeshWideUpgradeInfo;
    thisNode: NodeMeshUpgradeInfo;
    totalNodes: number;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    newVersionAvailable: boolean;
    stepperState: StepperState;
    becomeMainNode: () => void;
    startFwUpgradeTransaction: () => void;
    meshWideError?: MeshWideError;
    allNodesReadyForUpgrade: boolean;
    allNodesConfirmed: boolean;
    someNodeDownloading: boolean;
}

export const MeshWideUpgradeContext =
    createContext<MeshWideUpgradeContextProps>({
        isLoading: false,
        isError: false,
        error: null,
        totalNodes: 0,
        newVersionAvailable: false,
        stepperState: "INITIAL",
        thisNode: null,
        becomeMainNode: () => {},
        startFwUpgradeTransaction: () => {},
        allNodesReadyForUpgrade: false,
        allNodesConfirmed: false,
        someNodeDownloading: false,
    });

export const MeshWideUpgradeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
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
        error,
    } = useMeshWideUpgradeInfo({
        refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
    });

    const { mutate: becomeMainNodeMutation } = useBecomeMainNode({
        onSuccess: () => {
            invalidateQueries();
        },
    });

    const { mutate: fwUpgradeTransaction } = useStartFirmwareUpgradeTransaction(
        {
            onSuccess: () => {
                invalidateQueries();
            },
        }
    );

    const { data: session } = useSession();
    const { data: newVersionData } = useNewVersion({
        enabled: session?.username !== undefined,
    });

    const newVersionAvailable = !!(newVersionData && newVersionData.version);
    const totalNodes =
        nodesUpgradeInfo && Object.entries(nodesUpgradeInfo).length;

    const { data: thisNode, isLoading: thisNodeLoading } =
        useMeshUpgradeNodeStatus({
            refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
        });

    const eupgradeStatus = thisNode?.eupgradestate;

    const meshSafeUpgrade = useParallelScheduleUpgrade();
    const confirmUpgrade = useParallelConfirmUpgrade();

    // useMemo to check that all nodes have the status of READY_FOR_UPGRADE
    const allNodesReadyForUpgrade = useMemo(() => {
        return Object.values(nodesUpgradeInfo || {}).every(
            (node) => node.upgrade_state === "READY_FOR_UPGRADE"
        );
    }, [nodesUpgradeInfo]);

    const allNodesConfirmed = useMemo(() => {
        return Object.values(nodesUpgradeInfo || {}).every(
            (node) => node.upgrade_state === "CONFIRMED"
        );
    }, [nodesUpgradeInfo]);

    const someNodeDownloading = useMemo(() => {
        return Object.values(nodesUpgradeInfo || {}).some(
            (node) => node.upgrade_state === "DOWNLOADING"
        );
    }, [nodesUpgradeInfo]);

    const stepperState = getStepperStatus(
        nodesUpgradeInfo,
        thisNode,
        newVersionAvailable,
        eupgradeStatus,
        meshSafeUpgrade,
        confirmUpgrade,
        someNodeDownloading
    );

    const meshWideError = getMeshWideError(thisNode);

    const becomeMainNode = useCallback(() => {
        becomeMainNodeMutation({});
    }, [becomeMainNodeMutation]);

    const startFwUpgradeTransaction = useCallback(() => {
        fwUpgradeTransaction({});
    }, [fwUpgradeTransaction]);

    const isLoading = meshWideInfoLoading || thisNodeLoading;

    return (
        <MeshWideUpgradeContext.Provider
            value={{
                data: nodesUpgradeInfo,
                thisNode,
                isLoading,
                isError,
                error,
                totalNodes,
                newVersionAvailable,
                stepperState,
                becomeMainNode,
                startFwUpgradeTransaction,
                meshWideError,
                allNodesReadyForUpgrade,
                allNodesConfirmed,
                someNodeDownloading,
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
