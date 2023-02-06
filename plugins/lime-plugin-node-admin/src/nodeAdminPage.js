import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { List } from "components/list";

import { CommunityPortalConfig } from "plugins/lime-plugin-pirania/nodeAdmin";

import { useBoardData } from "utils/queries";

import { Config } from "./components/config";
import { useWifiData } from "./nodeAdminQueries";
import { useHotspotData } from "./screens/hotspot/src/hotspotQueries";

const Hostname = () => {
    const { data: boardData, isLoading } = useBoardData();
    const hostname = boardData && boardData.hostname;
    return (
        <Config
            title={<Trans>Node Name</Trans>}
            value={hostname}
            onClick={() => route("/nodeadmin/hostname")}
            isLoading={isLoading}
        />
    );
};

const ApPassword = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const has_password = wifiData && wifiData.node_ap.has_password;
    return (
        <Config
            title={<Trans>Wifi Password</Trans>}
            value={has_password ? "********" : <Trans>No password</Trans>}
            onClick={() => route("/nodeadmin/wifipassword")}
            isLoading={isLoading}
        />
    );
};

export const RoamingAP = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const nodeEnabled = wifiData?.community_ap.enabled;
    const apSsid = wifiData?.community_ap.ssid;
    return (
        <Config
            data-testid={"roamingAP-config-item"}
            title={<Trans>Community Roaming AP</Trans>}
            value={
                nodeEnabled === true ? (
                    <Trans>Enabled</Trans>
                ) : (
                    <Trans>Disabled</Trans>
                )
            }
            subtitle={<Trans>Opens the "{apSsid}" AP in this node</Trans>}
            onClick={() => route("/nodeadmin/roaming-ap")}
            isLoading={isLoading}
        />
    );
};

export const Hotspot = () => {
    const { data, isLoading } = useHotspotData();
    const enabled = data?.enabled;
    return (
        <Config
            data-testid={"hotspot-config-item"}
            title={<Trans>Connect to a Mobile Hotspot</Trans>}
            value={enabled ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
            onClick={() => route("/nodeadmin/hotspot")}
            isLoading={isLoading}
        />
    );
};

const NodeAdmin = () => {
    return (
        <div class="container container-padded">
            <div class="text-center">
                <h4>
                    <Trans>Node Configuration</Trans>
                </h4>
            </div>
            <List>
                <Hostname />
                <ApPassword />
                <RoamingAP />
                <CommunityPortalConfig />
                <Hotspot />
            </List>
        </div>
    );
};

export default NodeAdmin;
