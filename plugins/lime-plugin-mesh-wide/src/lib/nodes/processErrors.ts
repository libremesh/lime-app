import {
    INodeInfo,
    NodeErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import { DEFAULT_COMMUNITY_SETTINGS } from "utils/constants";

export const processNodeErrors = (
    reference: INodeInfo,
    actual: INodeInfo | undefined
) => {
    const errors: NodeErrorCodes[] = [];
    // todo(kon): use community settings and not limeapp defaults
    // const { data: communitySettings } = useCommunitySettings();

    if (!actual) return [NodeErrorCodes.NODE_DOWN];

    if (actual.data.uptime < DEFAULT_COMMUNITY_SETTINGS.mw_node_low_uptime) {
        errors.push(NodeErrorCodes.LOW_UPTIME);
    }

    return errors;
};
