import { Trans } from "@lingui/macro";
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
    INodeInfo,
    completeDataTypeKeys,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import queryCache from "utils/queryCache";

const UpdateNodeInfoBtn = ({ node }: { node: INodeInfo }) => {
    const ip = node.ipv4;

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
                queryKey:
                    getFromSharedStateKeys.getFromSharedStateAsync(dataType),
            });
        }
    }, []);

    // useCallback to sync the node data
    const syncNode = useCallback(async () => {
        try {
            await publishOnRemoteNode({ ip });
        } catch (e) {
            showToast({
                text: (
                    <Trans>
                        Error connecting with {node.hostname}, is node up?
                    </Trans>
                ),
                duration: 5000,
            });
            console.error(e);
        }

        await localNodeSync({ ip });
        await invalidateQueries();
    }, [
        invalidateQueries,
        ip,
        localNodeSync,
        node.hostname,
        publishOnRemoteNode,
        showToast,
    ]);

    return (
        <Button color={"primary"} outline={true} size={"sm"} onClick={syncNode}>
            <RefreshIcon />
        </Button>
    );
};

export default UpdateNodeInfoBtn;
