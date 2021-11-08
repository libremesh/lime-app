import { h } from 'preact';
import { Config } from 'plugins/lime-plugin-node-admin/src/components/config';
import { usePortalConfig } from '../src/piraniaQueries';
import { route } from 'preact-router';
import I18n from 'i18n-js';


export const PortalConfigItem = () => {
    const { data: config, isLoading } = usePortalConfig();
    let message = '';
    if (config) {
        if (config.activated && config.with_vouchers) {
            message = I18n.t('Activated, with vouchers');
        }
        if (config.activated && !config.with_vouchers) {
            message = I18n.t('Activated, without vouchers');
        }
        if (!config.activated) {
            message = I18n.t('Deactivated');
        }
    }
    return <Config data-testid='portal-config-item' title={I18n.t('Community Portal')}
        onClick={() => route('/nodeadmin/communityPortal')}
        value={message}
        isLoading={isLoading} />
};
