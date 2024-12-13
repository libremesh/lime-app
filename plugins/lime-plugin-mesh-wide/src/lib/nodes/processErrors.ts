import {
    INodeInfo,
    NodeErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const processNodeErrors = (
    reference: INodeInfo,
    actual: INodeInfo | undefined
) => {
    const errors: NodeErrorCodes[] = [];

    // Here the errors related to the actual node state

    if (!actual) return [NodeErrorCodes.NODE_DOWN];

    // Down here put errors related to the comparassion with reference state

    // If not reference is a new node
    if (!reference) return errors;

    // Check mac list are equal
    if (reference.macs.length !== actual.macs.length) {
        errors.push(NodeErrorCodes.MACS_MISSMATCH);
    }
    const sortedRefMacs = reference.macs.slice().sort();
    const sortedActualMacs = actual.macs.slice().sort();
    if (
        !sortedRefMacs.every(
            (value, index) => value === sortedActualMacs[index]
        )
    ) {
        errors.push(NodeErrorCodes.MACS_MISSMATCH);
    }

    return errors;
};
