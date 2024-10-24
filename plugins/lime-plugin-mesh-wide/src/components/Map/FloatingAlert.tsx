import { useCallback } from "react";

import { useMeshWideDataErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useMeshWideDataErrors";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { WarningIcon } from "plugins/lime-plugin-mesh-wide/src/icons/warningIcon";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { InvalidNodes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const FloatingAlert = () => {
    const { setData: setSelectedFeature, data: selectedMapFeature } =
        useSelectedMapFeature();

    const { hasNonLocatedNodes, nonLocatedNodes } = useNodes();
    const { meshWideDataErrors, dataNotSetErrors } = useMeshWideDataErrors();

    const hasErrors =
        hasNonLocatedNodes ||
        meshWideDataErrors.length ||
        dataNotSetErrors.length;

    const callback = useCallback(() => {
        if (selectedMapFeature && selectedMapFeature.id === "errorsDetails") {
            setSelectedFeature(null);
            return;
        }
        const invalidNodes: InvalidNodes = new Set([
            ...Object.keys(nonLocatedNodes ?? []),
        ]);

        setSelectedFeature({
            id: "errorsDetails",
            type: "errorsDetails",
            feature: {
                invalidNodes,
                meshWideDataErrors,
                dataNotSetErrors,
            },
        });
    }, [
        dataNotSetErrors,
        meshWideDataErrors,
        nonLocatedNodes,
        selectedMapFeature,
        setSelectedFeature,
    ]);

    return hasErrors ? (
        <div className={"absolute w-full h-full"}>
            <div
                data-testid={"has-invalid-nodes"}
                onClick={callback}
                className="cursor-pointer z-50 absolute float-right right-32 top-2 my-2 mx-4 w-24 h-24 bg-gray-500 opacity-80 rounded flex justify-center items-center text-white"
            >
                <div className={"text-info"}>
                    <WarningIcon />
                </div>
            </div>
        </div>
    ) : null;
};
