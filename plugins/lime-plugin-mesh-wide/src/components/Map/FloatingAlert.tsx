import { useCallback } from "react";

import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { WarningIcon } from "plugins/lime-plugin-mesh-wide/src/icons/warningIcon";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { InvalidNodes } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const FloatingAlert = () => {
    const {
        hasInvalidNodes,
        invalidNodes: { invalidNodesReference, invalidNodesActual },
    } = useNodes();

    const { setData: setSelectedFeature } = useSelectedMapFeature();

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
    }, [invalidNodesActual, invalidNodesReference, setSelectedFeature]);

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
