import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { UpgradeStatusType } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

// todo(kon):
export const InfoStatusMessageMap: {
    [status in UpgradeStatusType]: ComponentChildren;
} = {
    // UPDATED: <Trans>This node is updated</Trans>,
    // UPGRADE_AVAILABLE: <Trans>Available upgrade</Trans>,
    // DOWNLOADING: <Trans>Downloading update</Trans>,
    // UPGRADE_READY: <Trans>Ready for upgrade</Trans>,
    // UPGRADE_SCHEDULED: <Trans>Upgrade scheduled</Trans>,
    DEFAULT: <Trans>DEFAULT</Trans>,
    STARTING: <Trans>STARTING</Trans>,
    DOWNLOADING: <Trans>DOWNLOADING</Trans>,
    READY_FOR_UPGRADE: <Trans>READY_FOR_UPGRADE</Trans>,
    UPGRADE_SCHEDULED: <Trans>UPGRADE_SCHEDULED</Trans>,
    CONFIRMATION_PENDING: <Trans>CONFIRMATION_PENDING</Trans>,
    CONFIRMED: <Trans>CONFIRMED</Trans>,
    UPDATED: <Trans>UPDATED</Trans>,
    ERROR: <Trans>ERROR</Trans>,
};

// export const translations = {
//     NODE_UPDATED: {
//         title: "Node updated",
//         description: "The firmware is at the most updated version",
//     },
//     DOWNLOADING: {
//         title: "Downloading {info.new_version_info}",
//         description: "The node is downloading the new firmware",
//     },
//     UPGRADE_AVAILABLE: {
//         title: "New version available!",
//         description: "{info.new_version_info} is available!",
//     },
//     UPGRADE_READY: {
//         title: "Ready to upgrade",
//         description:
//             "{info.new_version_info} is downloaded successfully, this node is ready for upgrade.",
//     },
//     UPGRADE_SCHEDULED: {
//         title: "Upgrade scheduled",
//         description: "The node will perform the upgrade at {info.scheduled}.",
//     },
//     SAFE_UPGRADE: {
//         title: {
//             true: "Safe upgrade available",
//             false: "Safe upgrade is not supported",
//         },
//         description: {
//             true: "If the connectivity is lost during the upgrade it will be reverted at the previous version",
//             false: "If something went wrong during the upgrade it have to be reverted manualy",
//         },
//     },
// };

export const translations = {
    UPDATED: {
        title: <Trans>Node updated</Trans>,
        description: (
            <Trans>The firmware is at the most updated version </Trans>
        ),
    },
    DOWNLOADING: {
        title: (info: { new_version_info: string }) => (
            <Trans>Downloading {info.new_version_info}</Trans>
        ),
        description: <Trans>The node is downloading the new firmware</Trans>,
    },
    UPGRADE_AVAILABLE: {
        title: <Trans>New version available!</Trans>,
        description: (info: { new_version_info: string }) => (
            <Trans>{info.new_version_info} is available!</Trans>
        ),
    },
    UPGRADE_READY: {
        title: <Trans>Ready to upgrade</Trans>,
        description: (info: { new_version_info: string }) => (
            <Trans>
                {info.new_version_info} is downloaded successfully, this node is
                ready for upgrade.
            </Trans>
        ),
    },
    UPGRADE_SCHEDULED: {
        title: <Trans>Upgrade scheduled</Trans>,
        description: (info: { scheduled: string }) => (
            <Trans>
                The node will perform the upgrade at {info.scheduled}.
            </Trans>
        ),
    },
    SAFE_UPGRADE: {
        title: (info: { safe_upgrade: boolean }) =>
            info.safe_upgrade ? (
                <Trans>Safe upgrade available</Trans>
            ) : (
                <Trans>Safe upgrade is not supported</Trans>
            ),
        description: (info: { safe_upgrade: boolean }) =>
            info.safe_upgrade ? (
                <Trans>
                    If the connectivity is lost during the upgrade it will be
                    reverted at the previous version
                </Trans>
            ) : (
                <Trans>
                    If something went wrong during the upgrade it have to be
                    reverted manualy
                </Trans>
            ),
    },
};
