import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { WarningIcon } from "plugins/lime-plugin-mesh-wide/src/icons/warningIcon";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide/src/mesWideQueriesKeys";
import { InvalidNodes } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import queryCache from "utils/queryCache";

const checkErrors = () => {
    const errors = Object.keys(meshUpgradeQueryKeys).reduce((acc, key) => {
        const queryKey = meshUpgradeQueryKeys[key];
        const queryState = queryCache.getQueryState(queryKey);

        if (queryState?.error) {
            acc[key] = { queryKey, error: queryState.error };
        }

        return acc;
    }, {});

    return errors;
};

export function useMeshWideDataErrors(params) {
    return useQuery(["lime-meshwide", "mesh_wide_errors"], checkErrors, {
        refetchInterval: 6000, // Fetch data every 6 seconds
        ...params,
    });
}

export const FloatingAlert = () => {
    const {
        hasInvalidNodes,
        invalidNodes: { invalidNodesReference, invalidNodesActual },
    } = useNodes();

    const { setData: setSelectedFeature } = useSelectedMapFeature();

    const { data: errors } = useMeshWideDataErrors({});

    console.log("errors", errors);
    const callback = useCallback(() => {
        const list: InvalidNodes = new Set([
            ...Object.keys(invalidNodesReference ?? []),
            ...Object.keys(invalidNodesActual ?? []),
        ]);
        setSelectedFeature({
            id: "invalidNodes",
            type: "invalidNodes",
            feature: list,
        });
    }, [
        // checkErrors,
        invalidNodesActual,
        invalidNodesReference,
        setSelectedFeature,
    ]);

    return hasInvalidNodes ? (
        <div
            data-testid={"has-invalid-nodes"}
            onClick={callback}
            className="cursor-pointer z-50 fixed top-24 right-24 my-2 mx-4 w-24 h-24 bg-gray-500 opacity-80 rounded flex justify-center items-center text-white"
        >
            <div className={"text-info"}>
                <WarningIcon />
            </div>
        </div>
    ) : null;
};
