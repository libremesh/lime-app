import { Trans } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import { Button } from "components/buttons/button";
import { RefreshIcon } from "components/icons/teenny/refresh";
import { useToast } from "components/toast/toastProvider";

import { callToRemoteNode } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";
import { doSharedStateApiCall } from "plugins/lime-plugin-mesh-wide/src/meshWideApi";
import {
    getFromSharedStateKeys,
    syncFromSharedStateAsyncKey,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypes,
    INodeInfo,
    completeDataTypeKeys,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import queryCache from "utils/queryCache";

interface IRemoteRebotProps {
    ip: string;
}

export async function publishOnRemoteNode({ ip }: IRemoteRebotProps) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) =>
            customApi
                .call("shared-state-async", "publish_all", {})
                .then(() => true),
    });
}

export async function syncDataType({
    dataType,
    ip,
}: {
    dataType: DataTypes;
    ip: string;
}) {
    const queryKey = getFromSharedStateKeys.syncFromSharedStateAsync(
        dataType,
        ip
    );
    return doSharedStateApiCall<typeof dataType>(queryKey);
}

export async function syncAllDataTypes({ ip }: { ip: string }) {
    const promises = (Object.keys(completeDataTypeKeys) as DataTypes[]).map(
        (dataType) => syncDataType({ dataType, ip })
    );
    return await Promise.all(promises);
}

const useSyncDataTypes = ({ ip, ...opts }: { ip: string; opts?: any }) => {
    return useMutation((props: IRemoteRebotProps) => syncAllDataTypes({ ip }), {
        mutationKey: [syncFromSharedStateAsyncKey, ip],
        ...opts,
    });
};

const usePublishOnRemoteNode = ({
    ip,
    ...opts
}: {
    ip: string;
    opts?: any;
}) => {
    return useMutation(
        (props: IRemoteRebotProps) => publishOnRemoteNode({ ip }),
        {
            mutationKey: [syncFromSharedStateAsyncKey, ip],
            ...opts,
        }
    );
};

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
            await localNodeSync({ ip });
        } catch (e) {
            showToast({
                text: (
                    <Trans>
                        Error connecting with {node.hostname}, is node up?
                    </Trans>
                ),
            });
        }
        await publishOnRemoteNode({ ip });
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
