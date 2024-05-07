import { ComponentChildren, createContext } from "preact";
import { useMemo } from "preact/compat";
import { useEffect } from "preact/hooks";
import { useCallback, useContext } from "react";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/useStepper";
import {
    useAbort,
    useBecomeMainNode,
    useMeshUpgradeNodeStatus,
    useMeshWideUpgradeInfo,
    useParallelConfirmUpgrade,
    useParallelScheduleUpgrade,
    useStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";
import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueriesKeys";
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
    abort: () => void;
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
        abort: () => {},
        allNodesReadyForUpgrade: false,
        allNodesConfirmed: false,
        someNodeDownloading: false,
    });

export const MeshWideUpgradeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    // UseCallback to invalidate queries
    const invalidateQueries = useCallback(() => {
        queryCache.invalidateQueries({
            queryKey: meshUpgradeQueryKeys.getMeshUpgradeNodeStatus(),
        });
    }, []);

    const invalidateLogin = useCallback(() => {
        queryCache.invalidateQueries({
            queryKey: ["session", "get"],
        });
    }, []);

    const {
        data: nodesUpgradeInfo,
        isLoading: meshWideInfoLoading,
        isError: isMeshWideQueryError,
        error: meshWideQueryError,
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

    const { mutate: abort, isLoading: isAborting } = useAbort({});

    const { data: session } = useSession();
    const { data: newVersionData } = useNewVersion({
        enabled: session?.username !== undefined,
    });

    const newVersionAvailable = !!(newVersionData && newVersionData.version);
    const totalNodes =
        nodesUpgradeInfo && Object.entries(nodesUpgradeInfo).length;

    const {
        data: thisNode,
        isLoading: thisNodeLoading,
        isError: isThisNodeError,
    } = useMeshUpgradeNodeStatus({
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
        isThisNodeError,
        newVersionAvailable,
        eupgradeStatus,
        meshSafeUpgrade,
        confirmUpgrade,
        someNodeDownloading,
        isAborting
    );

    const meshWideError = getMeshWideError(thisNode);

    const becomeMainNode = useCallback(() => {
        becomeMainNodeMutation({});
    }, [becomeMainNodeMutation]);

    const startFwUpgradeTransaction = useCallback(() => {
        fwUpgradeTransaction({});
    }, [fwUpgradeTransaction]);

    const isLoading = meshWideInfoLoading || thisNodeLoading;

    let isError;
    let error;
    // If the state is upgrading, ignore the errors because is normal to lose the connection
    if (stepperState !== "UPGRADING") {
        isError = isMeshWideQueryError;
        error = meshWideQueryError;
    }

    useEffect(() => {
        if (
            meshWideQueryError &&
            (meshWideQueryError as any).code != null &&
            (meshWideQueryError as any).code === -32002 // Auth failed error code
        ) {
            invalidateLogin();
        }
    }, [invalidateLogin, meshWideQueryError, stepperState]);

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
                abort,
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
