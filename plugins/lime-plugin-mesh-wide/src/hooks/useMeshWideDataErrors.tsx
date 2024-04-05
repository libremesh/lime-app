import { QueryKey } from "@tanstack/react-query";

import {
    useMeshWideBatman,
    useMeshWideBatmanReference,
    useMeshWideLinks,
    useMeshWideLinksReference,
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide/src/mesWideQueriesKeys";
import { MeshWideDataError } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

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

    const { data: linksReferenceData, error: linksReferenceError } =
        useMeshWideLinksReference({});
    addError(
        meshUpgradeQueryKeys.wifiLinksInfoRef,
        linksReferenceError,
        linksReferenceData
    );

    const { error: linksError } = useMeshWideLinks({});
    addError(meshUpgradeQueryKeys.wifiLinksInfo, linksError);

    const { data: batmanReferenceData, error: batmanReferenceError } =
        useMeshWideBatmanReference({});
    addError(
        meshUpgradeQueryKeys.batHostsRef,
        batmanReferenceError,
        batmanReferenceData
    );

    const { error: batmanError } = useMeshWideBatman({});
    addError(meshUpgradeQueryKeys.batHosts, batmanError);

    const { data: nodesReferenceData, error: nodesReferenceError } =
        useMeshWideNodesReference({});
    addError(
        meshUpgradeQueryKeys.meshWideNodesRef,
        nodesReferenceError,
        nodesReferenceData
    );

    const { error: nodesError } = useMeshWideNodes({});
    addError(meshUpgradeQueryKeys.meshWideNodes, nodesError);

    return { meshWideDataErrors, dataNotSetErrors };
};
