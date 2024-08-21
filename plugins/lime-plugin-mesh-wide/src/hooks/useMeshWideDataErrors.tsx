import { QueryKey } from "@tanstack/react-query";

import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";

import {
    useMeshWideBatman,
    useMeshWideBatmanReference,
    useMeshWideLinks,
    useMeshWideLinksReference,
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import {
    IBatmanLinks,
    INodes,
    IWifiLinks,
    MeshWideDataError,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

/**
 * Hook used to show to the interface if any of shared state module has an error.
 *
 * The errors can happen when the module is not on the device. I tried a different approach on
 * https://github.com/selankon/lime-app/blob/ee610c1af81df393de81121887cd56588497317e/plugins/lime-plugin-mesh-wide/src/components/Map/FloatingAlert.tsx#L12-L33
 * But I like this more for performance reasons. The other approach used a timer and I think is not the best.
 *
 * On this way, it just listens query cache and updated when anything falls.
 *
 * Is there a better way to do this?
 */
export const useMeshWideDataErrors = () => {
    const meshWideDataErrors: MeshWideDataError[] = [];
    const dataNotSetErrors: MeshWideDataError[] = [];

    const addError = (
        queryKey: QueryKey,
        error?: unknown,
        data?: IWifiLinks | IBatmanLinks | INodes
    ) => {
        if (data) {
            // Check also node by node if reference state is empty
            const nodeNames = Object.keys(data).filter((key) =>
                isEmpty(data[key])
            );
            if (isEmpty(data) || nodeNames.length)
                dataNotSetErrors.push({ queryKey, error, nodeNames });
        }
        if (error) {
            meshWideDataErrors.push({ queryKey, error });
        }
    };

    const {
        data: linksReferenceData,
        error: linksReferenceError,
        isError: linksReferenceIsError,
    } = useMeshWideLinksReference({});
    addError(
        sharedStateQueries.getFromSharedState("wifi_links_info_ref"),
        linksReferenceIsError ? linksReferenceError : null,
        linksReferenceData
    );

    const { error: linksError } = useMeshWideLinks({});
    addError(
        sharedStateQueries.getFromSharedState("wifi_links_info"),
        linksError
    );

    const {
        data: batmanReferenceData,
        error: batmanReferenceError,
        isError: batmanReferenceIsError,
    } = useMeshWideBatmanReference({});
    addError(
        sharedStateQueries.getFromSharedState("bat_links_info_ref"),
        batmanReferenceIsError ? batmanReferenceError : null,
        batmanReferenceData
    );

    const { error: batmanError } = useMeshWideBatman({});
    addError(
        sharedStateQueries.getFromSharedState("bat_links_info"),
        batmanError
    );

    const {
        data: nodesReferenceData,
        error: nodesReferenceError,
        isError: isNodesReferenceError,
    } = useMeshWideNodesReference({});
    addError(
        sharedStateQueries.getFromSharedState("node_info_ref"),
        isNodesReferenceError ? nodesReferenceError : null,
        nodesReferenceData
    );

    const { error: nodesError } = useMeshWideNodes({});
    addError(sharedStateQueries.getFromSharedState("node_info"), nodesError);

    return { meshWideDataErrors, dataNotSetErrors };
};
