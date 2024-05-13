import { QueryKey } from "@tanstack/react-query";

import {
    useMeshWideBatman,
    useMeshWideBatmanReference,
    useMeshWideLinks,
    useMeshWideLinksReference,
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { getFromSharedStateKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import { MeshWideDataError } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

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

    const addError = (queryKey: QueryKey, error?: unknown, data?: object) => {
        if (data && isEmpty(data)) {
            dataNotSetErrors.push({ queryKey, error });
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
        getFromSharedStateKeys.getReferenceFromSharedState("wifi_links_info"),
        linksReferenceIsError ? linksReferenceError : null,
        linksReferenceData
    );

    const { error: linksError } = useMeshWideLinks({});
    addError(
        getFromSharedStateKeys.getFromSharedState("wifi_links_info"),
        linksError
    );

    const {
        data: batmanReferenceData,
        error: batmanReferenceError,
        isError: batmanReferenceIsError,
    } = useMeshWideBatmanReference({});
    addError(
        getFromSharedStateKeys.getReferenceFromSharedState("bat_links_info"),
        batmanReferenceIsError ? batmanReferenceError : null,
        batmanReferenceData
    );

    const { error: batmanError } = useMeshWideBatman({});
    addError(
        getFromSharedStateKeys.getFromSharedState("bat_links_info"),
        batmanError
    );

    const {
        data: nodesReferenceData,
        error: nodesReferenceError,
        isError: isNodesReferenceError,
    } = useMeshWideNodesReference({});
    addError(
        getFromSharedStateKeys.getReferenceFromSharedState("node_info"),
        isNodesReferenceError ? nodesReferenceError : null,
        nodesReferenceData
    );

    const { error: nodesError } = useMeshWideNodes({});
    addError(
        getFromSharedStateKeys.getFromSharedState("node_info"),
        nodesError
    );

    return { meshWideDataErrors, dataNotSetErrors };
};
