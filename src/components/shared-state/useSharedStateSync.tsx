import { useState } from "preact/hooks";
import { useCallback } from "react";

import { useErrrorConnectionToast } from "components/toast/toasts";

import {
    usePublishOnRemoteNode,
    useSyncDataTypes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { getFromSharedStateKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypes,
    completeDataTypeKeys,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { useBoardData } from "utils/queries";
import queryCache from "utils/queryCache";

export interface ISyncWithNodeProps {
    ip: string;
    nodeName?: string;
}

const useSharedStateSync = ({ ip, nodeName }: ISyncWithNodeProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { show } = useErrrorConnectionToast();
    const { data: boardData } = useBoardData();

    const { mutateAsync: localNodeSync } = useSyncDataTypes({
        ip,
    });
    const { mutateAsync: publishOnRemoteNode } = usePublishOnRemoteNode({
        ip,
    });

    const invalidateQueries = useCallback(() => {
        for (const dataType of Object.keys(
            completeDataTypeKeys
        ) as DataTypes[]) {
            queryCache.invalidateQueries({
                queryKey: getFromSharedStateKeys.getFromSharedState(dataType),
            });
        }
    }, []);

    // useCallback to sync the node data
    const syncNode = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            try {
                await publishOnRemoteNode({ ip });
            } catch (e) {
                show(nodeName ?? ip);
                throw e;
            }
            // If not boardata and or the hostname is different to target node do sync from local node
            if (!boardData || boardData?.hostname !== nodeName) {
                await localNodeSync({ ip });
            }
            await invalidateQueries();
        } finally {
            setIsLoading(false);
        }
    }, [
        boardData,
        invalidateQueries,
        ip,
        isLoading,
        localNodeSync,
        nodeName,
        publishOnRemoteNode,
        show,
    ]);

    return { isLoading, syncNode };
};

export default useSharedStateSync;
