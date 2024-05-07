import {
    INodeInfo,
    NodeErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const processNodeErrors = (
    reference: INodeInfo,
    actual: INodeInfo | undefined
) => {
    const errors: NodeErrorCodes[] = [];

    // If not reference is a new node
    if (!reference) return errors;

    if (!actual) return [NodeErrorCodes.NODE_DOWN];

    // Check mac list are equal
    if (reference.macs.length !== actual.macs.length) {
        errors.push(NodeErrorCodes.MACS_MISSMATCH);
    }
    const sortedRefMacs = reference.macs.slice().sort();
    const sortedActualMacs = actual.macs.slice().sort();

    for (let i = 0; i < sortedRefMacs.length; i++) {
        if (sortedRefMacs[i] !== sortedActualMacs[i]) {
            errors.push(NodeErrorCodes.MACS_MISSMATCH);
            break;
        }
    }

    return errors;
};
