import { useMutation, useQuery } from "@tanstack/react-query";

import { doSharedStateApiCall } from "components/shared-state/SharedStateApi";
import { ISharedStateRemoteQueryProps } from "components/shared-state/SharedStateQueries";
import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";
import { useErrrorConnectionToast } from "components/toast/toasts";

import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueriesKeys";
import { getQueryByLinkType } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";
import {
    IBaseLink,
    IBatmanLinks,
    ILinks,
    IMeshWideConfig,
    INodes,
    IWifiLinks,
    LinkType,
    MeshWideMapDataTypeKeys,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { useMeshWideSyncCall } from "utils/meshWideSyncCall";
import { useSharedData } from "utils/useSharedData";
import { isEmpty } from "utils/utils";

const refetchInterval = 60000;

export function useMeshWideLinksReference(params) {
    const dataType: MeshWideMapDataTypeKeys = "wifi_links_info_ref";
    const queryKey = sharedStateQueries.getFromSharedState(dataType);
    return useQuery<IWifiLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideLinks(params) {
    const dataType: MeshWideMapDataTypeKeys = "wifi_links_info";
    const queryKey = sharedStateQueries.getFromSharedState(dataType);
    return useQuery<IWifiLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideBatmanReference(params) {
    const dataType: MeshWideMapDataTypeKeys = "bat_links_info_ref";
    const queryKey = sharedStateQueries.getFromSharedState(dataType);
    return useQuery<IBatmanLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideBatman(params) {
    const dataType: MeshWideMapDataTypeKeys = "bat_links_info";
    const queryKey = sharedStateQueries.getFromSharedState(dataType);
    return useQuery<IBatmanLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideNodesReference(params) {
    const dataType: MeshWideMapDataTypeKeys = "node_info_ref";
    const queryKey = sharedStateQueries.getFromSharedState(dataType);
    return useQuery<INodes>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideNodes(params) {
    const dataType: MeshWideMapDataTypeKeys = "node_info";
    const queryKey = sharedStateQueries.getFromSharedState(dataType);
    return useQuery<INodes>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

/**
 * Insert into shared state
 *
 * Don't use those mutations itself, use it implementing it on the useReferenceState hook in order
 * to unify criterias and add a confirmation modal
 */

type ISharedStateSetReferenceQueryProps = {
    isDown: boolean;
    hostname?: string;
} & ISharedStateRemoteQueryProps;

export const useSetNodeInfoReferenceState = ({
    ip,
    hostname,
    isDown,
    params,
}: ISharedStateSetReferenceQueryProps) => {
    const type = "node_info";
    const { data } = useMeshWideNodes({});
    const { show } = useErrrorConnectionToast();

    // Ignore the types here because it to delete a node you have to pass an empty object
    // @ts-ignore
    const queryKey = sharedStateQueries.insertIntoReferenceState(type, {
        [hostname]: isDown ? null : data[hostname],
    });
    return useMutation(
        queryKey,
        () => doSharedStateApiCall<typeof type>(queryKey, ip),
        {
            onError: () => {
                show(hostname);
            },
            ...params,
        }
    );
};

interface IUseSetLinkReferenceState {
    linkType: LinkType;
    linkToUpdate: PontToPointLink;
    nodesToUpdate: { [ip: string]: string }; // { ip: hostname }
    params?: any;
    isDown: boolean;
    isNewLink: boolean;
}

export const useSetLinkReferenceState = ({
    linkType,
    linkToUpdate,
    isDown,
    isNewLink,
    nodesToUpdate,
    params,
}: IUseSetLinkReferenceState) => {
    const { state, reference } = getQueryByLinkType(linkType);
    const { data } = state({});
    const { data: referenceData } = reference({});

    return useMeshWideSyncCall({
        mutationKey: meshUpgradeQueryKeys.remoteConfirmUpgrade(),
        mutationFn: ({ ip }) => {
            const hostname = nodesToUpdate[ip];

            let newReferenceLinks = (referenceData[hostname].links ??
                {}) as IBaseLink<typeof linkType>;

            // This is a hotfix because backend returns an empty array sometimes
            if (isEmpty(newReferenceLinks)) newReferenceLinks = {};

            for (const mactomac of linkToUpdate.links) {
                if (isDown && newReferenceLinks[mactomac.id] && !isNewLink) {
                    delete newReferenceLinks[mactomac.id];
                    continue;
                }
                newReferenceLinks[mactomac.id] =
                    data[hostname].links[mactomac.id];
            }

            const queryKey = sharedStateQueries.insertIntoReferenceState(
                linkType,
                // For some reason I have to ignore the types here because it not infers properly.
                // Using the same code but for a specific link type, it works.
                // For some reason with the use of getQueryByLinkType it doesn't work.
                // @ts-ignore
                {
                    [hostname]: {
                        links: newReferenceLinks,
                        src_loc: data[hostname].src_loc,
                    },
                } as ILinks<typeof linkType>
            );
            console.log("linkToUpdate", linkToUpdate);
            console.log("newReferenceLinks", newReferenceLinks);
            console.log("referenceData", referenceData);
            console.log("data[hostname]", data[hostname]);
            console.log("hostname", hostname);
            console.log("queryKey", queryKey);
            return doSharedStateApiCall<typeof linkType>(queryKey, ip);
        },
        ips: Object.keys(nodesToUpdate),
        options: params,
    });
};

/**
 * Set mesh wide config
 */

export function useMeshWideConfig(params) {
    return useQuery<IMeshWideConfig>(
        ["lime-meshwide", "get_mesh_config"],
        getMeshWideConfig,
        {
            ...params,
        }
    );
}

/**
 * This query is used to store the selected feature on the map.
 *
 * Used to store the state between components.
 */
export const useSelectedMapFeature = () => {
    return useSharedData<SelectedMapFeature>([
        "lime-meshwide",
        "select_map_feature",
    ]);
};
