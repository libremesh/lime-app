import {
    INodeInfo,
    NodeErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const processNodeErrors = (
    reference: INodeInfo,
    actual: INodeInfo | undefined
) => {
    const errors: NodeErrorCodes[] = [];
    // todo(kon): use community settings and not limeapp defaults
    // const { data: communitySettings } = useCommunitySettings();

    if (!actual) return [NodeErrorCodes.NODE_DOWN];

    // Check mac list are equal
    if (reference.data.macs.length !== actual.data.macs.length) {
        errors.push(NodeErrorCodes.MACS_MISSMATCH);
    }
    const sortedRefMacs = reference.data.macs.slice().sort();
    const sortedActualMacs = actual.data.macs.slice().sort();

    for (let i = 0; i < sortedRefMacs.length; i++) {
        if (sortedRefMacs[i] !== sortedActualMacs[i]) {
            errors.push(NodeErrorCodes.MACS_MISSMATCH);
            break;
        }
    }

    return errors;
};
