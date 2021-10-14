import { h } from 'preact';
import { Config } from './components/config';
import { useWifiData } from './nodeAdminQueries';
import { useBoardData } from 'utils/queries';
import { List } from 'components/list';
import { route } from 'preact-router';
import I18n from 'i18n-js';

const Hostname = () => {
    const { data: boardData } = useBoardData();
    const hostname = boardData && boardData.hostname;
    return <Config title={I18n.t('Node Name')} value={hostname}
        onClick={() => route('/nodeadmin/hostname')} />
}

const ApPassword = () => {
    const { data: wifiData } = useWifiData();
    const has_password = wifiData && wifiData.ap_name.has_password;
    return <Config title={I18n.t('Wifi Password')}
        value={has_password ? '********' : I18n.t('No password')}
        onClick={() => route('/nodeadmin/wifipassword')} />
}

const RoamingAP = () => {
    const { data: wifiData } = useWifiData();
    const nodeEnabled = wifiData?.ap.node.enabled;
    return <Config title={I18n.t('Community Roaming AP')} 
        value={nodeEnabled === true ? I18n.t('Enabled'): I18n.t('Disabled')}
        subtitle={I18n.t('Opens the "%{ap_ssid}" AP in this node', {ap_ssid: wifiData?.ap.node.ssid})}
        onClick={() => route('/nodeadmin/roaming-ap')}
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
