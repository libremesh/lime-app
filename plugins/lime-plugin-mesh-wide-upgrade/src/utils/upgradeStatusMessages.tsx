import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import { INodeInfoBodyItemProps } from "components/mesh-wide-wizard/NodeInfoListItem";

import {
    MainNodeStatusType,
    MeshWideNodeUpgradeInfo,
    UpgradeStatusType,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

export const InfoStatusMessageMap: {
    [status in UpgradeStatusType]: ComponentChildren;
} = {
    DEFAULT: <Trans>No upgrade in progres</Trans>,
    DOWNLOADING: <Trans>Downloading new firmware</Trans>,
    READY_FOR_UPGRADE: <Trans>Firmware downloaded</Trans>,
    UPGRADE_SCHEDULED: <Trans>Upgrade scheduled</Trans>,
    CONFIRMATION_PENDING: <Trans>Confirmation pending</Trans>,
    CONFIRMED: <Trans>Confirmed</Trans>,
    ERROR: <Trans>This node has an error</Trans>,
    ABORTED: <Trans>This node aborted successfully</Trans>,
};

type DetailedInfoStatusMessageMapType = {
    [status in UpgradeStatusType]: INodeInfoBodyItemProps;
};
export const detailedInfoStatusMessageMap = (
    nodeInfo?: MeshWideNodeUpgradeInfo
): DetailedInfoStatusMessageMapType => {
    return {
        DEFAULT: {
            title: <Trans>Everything is up to date!</Trans>,
            description: <Trans>No new version available is found</Trans>,
        },
        DOWNLOADING: {
            title: <Trans>This node is downloading a new firmware</Trans>,
            description: <Trans>Wait until the download is finished!</Trans>,
        },
        READY_FOR_UPGRADE: {
            title: <Trans>Firmware download and verified</Trans>,
            description: <Trans>This node es ready for upgrade</Trans>,
        },
        UPGRADE_SCHEDULED: {
            title: <Trans>The upgrade is scheduled</Trans>,
            description: (
                <Trans>After a time the upgrade will be performed</Trans>
            ),
        },
        CONFIRMATION_PENDING: {
            title: <Trans>Awaiting confirmation</Trans>,
            description: (
                <Trans>
                    The firmware seems to be installed successfully. Confirm
                    that the node is working properly or will be downgraded to
                    the previous version
                </Trans>
            ),
        },
        CONFIRMED: {
            title: <Trans>Upgrade successful</Trans>,
            description: (
                <Trans>
                    Congratulations, this node was upgraded and confirmed
                    successfully
                </Trans>
            ),
        },
        ERROR: {
            title: <Trans>This node has an error!</Trans>,
            description: nodeInfo.error,
        },
        ABORTED: {
            title: <Trans>This node aborted</Trans>,
            description: <Trans>Start mesh wide firmware upgrade again</Trans>,
        },
    };
};

type MainNodeInfoStatusMessageMapType = {
    [status in MainNodeStatusType]: INodeInfoBodyItemProps;
};

export const mainNodeStatusMessageMap: MainNodeInfoStatusMessageMapType = {
    NO: null,
    STARTING: {
        title: <Trans>Setting up main node</Trans>,
        description: (
            <Trans>The become main node process is starting on this node</Trans>
        ),
    },
    MAIN_NODE: {
        title: <Trans>This is a main node</Trans>,
        description: (
            <Trans>Other nodes will download the firmware from it</Trans>
        ),
    },
};
