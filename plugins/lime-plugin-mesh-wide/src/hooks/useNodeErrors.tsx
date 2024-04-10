import { processNodeErrors } from "plugins/lime-plugin-mesh-wide/src/lib/nodes/processErrors";
import {
    INodeInfo,
    NodeErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const useNodeErrors = ({
    actual,
    reference,
}: {
    actual: INodeInfo;
    reference: INodeInfo;
}) => {
    const errors = processNodeErrors(reference, actual);
    const hasErrors = errors.length > 0;
    const isDown = errors.includes(NodeErrorCodes.NODE_DOWN);

    return { errors, hasErrors, isDown };
};
