import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useCallback, useContext } from "react";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import {
    useBecomeMainNode,
    useMeshUpgradeNodeStatus,
    useMeshWideUpgradeInfo,
    useStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { getStepperStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/stepper";

import { useBoardData, useSession } from "utils/queries";

const NODE_STATUS_REFETCH_INTERVAL = 1000;

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
    });

export const MeshWideUpgradeProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const [downloadStatusInterval, setDownloadStatusInterval] = useState(0);

    const {
        data: nodesUpgradeInfo,
        isLoading: meshWideInfoLoading,
        isError,
    } = useMeshWideUpgradeInfo({});

    const { mutate: becomeMainNodeMutation } = useBecomeMainNode({
        onSuccess: () => {
            console.log("todo: become main node success");
        },
    });

    const { mutate: fwUpgradeTransaction } = useStartFirmwareUpgradeTransaction(
        {
            onSuccess: () => {
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

    const becomeMainNode = useCallback(() => {
        becomeMainNodeMutation({});
        setDownloadStatusInterval(NODE_STATUS_REFETCH_INTERVAL);
    }, [becomeMainNodeMutation]);

    const startFwUpgradeTransaction = useCallback(() => {
        fwUpgradeTransaction({});
    }, [fwUpgradeTransaction]);

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
