import { h } from 'preact';
import { Config } from './components/config';
import { useWifiData } from './nodeAdminQueries';
import { useBoardData } from 'utils/queries';
import { List } from 'components/list';
import { route } from 'preact-router';
import I18n from 'i18n-js';

const Hostname = () => {
    const { data: boardData, isLoading } = useBoardData();
    const hostname = boardData && boardData.hostname;
    return <Config title={I18n.t('Node Name')} value={hostname}
        onClick={() => route('/nodeadmin/hostname')}
        isLoading={isLoading} />
}

const ApPassword = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const has_password = wifiData && wifiData.node_ap.has_password;
    return <Config title={I18n.t('Wifi Password')}
        value={has_password ? '********' : I18n.t('No password')}
        onClick={() => route('/nodeadmin/wifipassword')}
        isLoading={isLoading} />
}

const RoamingAP = () => {
    const { data: wifiData, isLoading } = useWifiData();
    const nodeEnabled = wifiData?.community_ap.enabled;
    return <Config title={I18n.t('Community Roaming AP')}
        value={nodeEnabled === true ? I18n.t('Enabled'): I18n.t('Disabled')}
        subtitle={I18n.t('Opens the "%{ap_ssid}" AP in this node', {ap_ssid: wifiData?.community_ap.ssid})}
        onClick={() => route('/nodeadmin/roaming-ap')}
        isLoading={isLoading}
    />
}

const NodeAdmin = () => {
    return (
        <div class="container container-padded">
            <div class="text-center"><h4>{I18n.t("Node Configuration")}</h4></div>
            <List>
                <Hostname />
                <ApPassword />
                <RoamingAP />
            </List>
        </div>
    );
}

export default NodeAdmin;
