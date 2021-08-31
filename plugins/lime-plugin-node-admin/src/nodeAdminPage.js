import { h } from 'preact';
import { Config } from './components/config';
import { useWifiData } from './nodeAdminQueries';
import { useBoardData } from 'utils/queries';
import { List } from 'components/list';
import { route } from 'preact-router';
import { Trans } from '@lingui/macro';
import { CommunityPortalConfig } from 'plugins/lime-plugin-pirania/nodeAdmin';

const Hostname = () => {
    const { data: boardData, isLoading } = useBoardData();
    const hostname = boardData && boardData.hostname;
    return <Config title={<Trans>Node Name</Trans>} value={hostname}
        onClick={() => route('/nodeadmin/hostname')}
        isLoading={isLoading} />
}

const ApPassword = () => {
<<<<<<< HEAD
    const { data: wifiData, isLoading } = useWifiData();
    const has_password = wifiData && wifiData.node_ap.has_password;
    return <Config title={<Trans>Wifi Password</Trans>}
        value={has_password ? '********' : <Trans>No password</Trans>}
        onClick={() => route('/nodeadmin/wifipassword')}
        isLoading={isLoading} />
}

const RoamingAP = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const nodeEnabled = wifiData?.community_ap.enabled;
    const apSsid = wifiData?.community_ap.ssid;
    return <Config title={<Trans>Community Roaming AP</Trans>}
        value={nodeEnabled === true ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
        subtitle={<Trans>Opens the "{apSsid}" AP in this node</Trans>}
=======
    const { data: wifiData } = useWifiData();
    const has_password = wifiData && wifiData.node_ap.has_password;
    return <Config title={I18n.t('Wifi Password')}
        value={has_password ? '********' : I18n.t('No password')}
        onClick={() => route('/nodeadmin/wifipassword')} />
}

const RoamingAP = () => {
    const { data: wifiData } = useWifiData();
    const nodeEnabled = wifiData?.community_ap.enabled;
    return <Config title={I18n.t('Community Roaming AP')} 
        value={nodeEnabled === true ? I18n.t('Enabled'): I18n.t('Disabled')}
        subtitle={I18n.t('Opens the "%{ap_ssid}" AP in this node', {ap_ssid: wifiData?.community_ap.ssid})}
>>>>>>> improvement(nodeAdmin): adapt endpoints to _cfg_overrides api
        onClick={() => route('/nodeadmin/roaming-ap')}
        isLoading={isLoading}
    />
}

const NodeAdmin = () => {
    return (
        <div class="container container-padded">
            <div class="text-center"><h4><Trans>Node Configuration</Trans></h4></div>
            <List>
                <Hostname />
                <ApPassword />
                <RoamingAP />
                <CommunityPortalConfig />
            </List>
        </div>
    );
}

export default NodeAdmin;
