import { useState } from "preact/hooks";
import { useCallback } from "react";

import {
    usePublishAll,
    useSyncDataTypes,
} from "components/shared-state/SharedStateQueries";
import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";
import { SharedStateDataTypeKeys } from "components/shared-state/SharedStateTypes";
import { useErrrorConnectionToast } from "components/toast/toasts";

import { useBoardData } from "utils/queries";
import queryCache from "utils/queryCache";

export interface ISyncWithNodeProps {
    ip: string;
    nodeName?: string;
    types: SharedStateDataTypeKeys[];
}

const useSharedStateSync = ({ types, ip, nodeName }: ISyncWithNodeProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { show } = useErrrorConnectionToast();
    const { data: boardData } = useBoardData();

    const { mutateAsync: syncDataTypes } = useSyncDataTypes({
        ip,
        dataTypes: types,
    });
    const { mutateAsync: publishAll } = usePublishAll({
        ip,
    });

    const invalidateQueries = useCallback(() => {
        for (const dataType of types) {
            queryCache.invalidateQueries({
                queryKey: sharedStateQueries.getFromSharedState(dataType),
            });
        }
    }, [types]);

    // useCallback to sync the node data
    // The sync consists of:
    // 1. Publish all data to the node
    // 2. Sync data types from the node user is connected to show the changes on the map
    // 3. Invalidate queries to refetch specific data
    const syncNode = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            try {
                await publishAll({ ip });
            } catch (e) {
                show(nodeName ?? ip);
                throw e;
            }
            // If not boardData and or the hostname is different to target node do sync from local node
            if (!boardData || boardData?.hostname !== nodeName) {
                await syncDataTypes({ ip, dataTypes: types });
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
        nodeName,
        publishAll,
        show,
        syncDataTypes,
        types,
    ]);

    return { isLoading, syncNode };
};

export default useSharedStateSync;
