import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useCallback, useContext, useMemo } from "react";

import {
    UseParallelConfirmConfig,
    UseParallelReadyForApplyType,
    useConfigNodeState,
    useMeshWideConfigState,
    useParallelAbort,
    useParallelConfirmConfig,
    useParallelReadyForApply,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { MeshConfigQueryKeys } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    NodeMeshConfigInfo,
    StepperWizardState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

import queryCache from "utils/queryCache";

const NODE_STATUS_REFETCH_INTERVAL = 5000;

const getWizardState = (
    nodeInfo: NodeMeshConfigInfo | undefined,
    isAborting: boolean,
    scheduleSafeReboot: UseParallelReadyForApplyType | undefined,
    confirmConfig: UseParallelConfirmConfig | undefined,
    isNodeInfoError: boolean
): StepperWizardState => {
    if (!nodeInfo) return;
    if (isAborting) return "ABORTING";
    if (scheduleSafeReboot?.isLoading) {
        return "SENDING_START_SCHEDULE";
    }
    if (
        scheduleSafeReboot?.results?.length ||
        scheduleSafeReboot?.errors?.length
    ) {
        return "RESTART_SCHEDULED";
    }
    if (
        nodeInfo.transaction_state === "CONFIRMATION_PENDING" ||
        nodeInfo.transaction_state === "CONFIRMED"
    ) {
        if (confirmConfig?.isLoading) {
            return "SENDING_CONFIRMATION";
        }
        if (confirmConfig?.errors?.length) {
            return "CONFIRMATION_PENDING";
        }
    }
    // We suppose that if the upgrade is scheduled, and we lost the connection is because is upgrading
    if (nodeInfo.transaction_state === "RESTART_SCHEDULED" && isNodeInfoError) {
        return "APPLYING";
    }
    return nodeInfo?.transaction_state ?? "DEFAULT";
};

export const useMeshConfigProvider = () => {
    // UseCallback to invalidate queries
    const invalidateQueries = useCallback(() => {
        return queryCache.invalidateQueries({
            queryKey: MeshConfigQueryKeys.getNodeStatus,
        });
    }, []);

    const invalidateLogin = useCallback(() => {
        queryCache.invalidateQueries({
            queryKey: ["session", "get"],
        });
    }, []);

    const scheduleSafeReboot = useParallelReadyForApply();
    const confirmConfig = useParallelConfirmConfig();

    const {
        data: meshInfo,
        isLoading: meshInfoLoading,
        isError: isMeshInfoQueryError,
        error: meshInfoQueryError,
    } = useMeshWideConfigState({
        refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
    });
    const {
        data: nodeInfo,
        isLoading: nodeInfoLoading,

        isError: isNodeInfoError,
    } = useConfigNodeState({
        refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
    });

    // Inner state to control is aborting callback awaiting until query invalidation
    const [isAborting, setIsAborting] = useState(false);
    const { callMutations: abortMutation } = useParallelAbort();

    const allNodesReadyForApply = useMemo(() => {
        return Object.values(meshInfo || {}).every(
            (node) => node.transaction_state === "READY_FOR_APPLY"
        );
    }, [meshInfo]);

    const allNodesConfirmed = useMemo(() => {
        return Object.values(meshInfo || {}).every(
            (node) => node.transaction_state === "CONFIRMED"
        );
    }, [meshInfo]);

    const isLoading = meshInfoLoading || nodeInfoLoading;

    const abort = useCallback(async () => {
        setIsAborting(true);
        abortMutation()
            .then(() => {
                return invalidateQueries();
            })
            .finally(() => {
                setIsAborting(false);
            });
    }, [abortMutation, invalidateQueries]);

    const wizardState: StepperWizardState = useMemo(
        () =>
            getWizardState(
                nodeInfo,
                isAborting,
                scheduleSafeReboot,
                confirmConfig,
                isNodeInfoError
            ),
        [nodeInfo, isAborting]
    );

    const totalNodes = meshInfo && Object.entries(meshInfo).length;

    let isError;
    let error;
    // If the state is upgrading, ignore the errors because is normal to lose the connection
    if (wizardState !== "APPLYING") {
        isError = isMeshInfoQueryError;
        error = meshInfoQueryError;
    }

    useEffect(() => {
        if (
            meshInfoQueryError &&
            (meshInfoQueryError as any).code != null &&
            (meshInfoQueryError as any).code === -32002 // Auth failed error code
        ) {
            invalidateLogin();
        }
    }, [invalidateLogin, meshInfoQueryError, wizardState]);

    return {
        nodeInfo,
        meshInfo,
        isLoading,
        allNodesReadyForApply,
        allNodesConfirmed,
        abort,
        wizardState,
        totalNodes,
        isError,
        error,
    };
};

export const ConfigContext = createContext<
    ReturnType<typeof useMeshConfigProvider> | undefined
>(undefined);

export const ConfigProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const config = useMeshConfigProvider();
    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useMeshConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig must be used within an ConfigProvider");
    }
    return context;
};
