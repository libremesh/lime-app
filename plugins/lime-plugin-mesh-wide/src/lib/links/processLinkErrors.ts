import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import {
    ILinkPtoPErrors,
    IWifiLinkData,
    WifiLinkErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import { DEFAULT_COMMUNITY_SETTINGS } from "utils/constants";

/**
 * It compares two links and return an array of error codes.
 * @param reference
 * @param actual
 */
const compareWifiData = (reference: IWifiLinkData, actual: IWifiLinkData) => {
    // todo(kon): use community settings and not limeapp defaults
    // const { data: communitySettings } = useCommunitySettings();

    const errors: WifiLinkErrorCodes[] = [];
    if (
        actual === undefined ||
        actual.signal === undefined ||
        actual.signal === 0
    ) {
        return [WifiLinkErrorCodes.LINK_DOWN];
    }

    if (
        actual.signal - DEFAULT_COMMUNITY_SETTINGS.mw_link_signal_threshold <
        reference.signal
    ) {
        errors.push(WifiLinkErrorCodes.SIGNAL_LOSS);
    }

    if (
        Math.abs(actual.chains[0] - actual.chains[1]) >
        DEFAULT_COMMUNITY_SETTINGS.mw_link_chain_threshold
    ) {
        errors.push(WifiLinkErrorCodes.CHAIN_LOSS);
    }
    return errors;
};

export const compareLinks = ({
    referenceLink,
    actualLink,
}: {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}) => {
    if (!referenceLink) return;

    const ptoPErrors: ILinkPtoPErrors = {
        macToMacErrors: {},
        hasErrors: false,
        linkUp: true,
    };

    referenceLink.links.forEach((macToMacReference) => {
        const macToMacActual = actualLink?.links.find(
            (actual) => actual.id === macToMacReference.id
        );

        const isUp = !!actualLink;
        if (!isUp) ptoPErrors.linkUp = isUp;

        ptoPErrors.macToMacErrors[macToMacReference.id] = {
            hasErrors: false,
            linkErrors: {},
            linkUp: isUp,
        };
        Object.entries(macToMacReference.data).forEach(
            ([nodeNameReference, wifiDataReference]) => {
                const wifiDataActual = macToMacActual?.data[nodeNameReference];
                const wifiErrors = compareWifiData(
                    wifiDataReference,
                    wifiDataActual
                );
                ptoPErrors.macToMacErrors[macToMacReference.id].linkErrors[
                    nodeNameReference
                ] = wifiErrors;
                if (wifiErrors.length) {
                    ptoPErrors.macToMacErrors[macToMacReference.id].hasErrors =
                        true;
                    ptoPErrors.hasErrors = true;
                }
            }
        );
    });
    return ptoPErrors;
};