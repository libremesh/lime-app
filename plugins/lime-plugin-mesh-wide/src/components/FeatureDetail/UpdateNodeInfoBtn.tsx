import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";
import { useCallback } from "react";

import { Button } from "components/buttons/button";
import { RefreshIcon } from "components/icons/teenny/refresh";
import { useToast } from "components/toast/toastProvider";

import {
    usePublishOnRemoteNode,
    useSyncDataTypes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { getFromSharedStateKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypes,
    completeDataTypeKeys,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import queryCache from "utils/queryCache";

interface INodeInfoProps {
    ip: string;
    nodeName: string;
}

const UpdateNodeInfoBtn = ({
    ip,
    nodeName,
    updateOnMount = true,
}: {
    updateOnMount?: boolean;
} & INodeInfoProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

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
        publishOnRemoteNode({ ip })
            .catch((e) => {
                showToast({
                    text: (
                        <Trans>
                            Error connecting with {nodeName}, is node up?
                        </Trans>
                    ),
                    duration: 5000,
                });
                throw e;
            })
            .then(async () => {
                await localNodeSync({ ip });
                await invalidateQueries();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [
        invalidateQueries,
        ip,
        isLoading,
        localNodeSync,
        nodeName,
        publishOnRemoteNode,
        showToast,
    ]);

    // Use effect to sync the node data on mount
    useEffect(() => {
        if (!updateOnMount) return;
        (async () => {
            await syncNode();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ip]);

    return (
        <Button
            color={"primary"}
            outline={!isLoading}
            size={"sm"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                syncNode();
            }}
        >
            <RefreshIcon />
        </Button>
    );
};

export default UpdateNodeInfoBtn;
