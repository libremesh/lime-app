import { h } from 'preact';
import { Config } from 'plugins/lime-plugin-node-admin/src/components/config';
import { usePortalConfig } from '../src/piraniaQueries';
import { route } from 'preact-router';
import { Trans } from '@lingui/macro';


export const PortalConfigItem = () => {
    const { data: config, isLoading } = usePortalConfig();
    let message = '';
    if (config) {
        if (config.activated && config.with_vouchers) {
            message = <Trans>Activated, with vouchers</Trans>;
        }
        if (config.activated && !config.with_vouchers) {
            message = <Trans>Activated, without vouchers</Trans>;
        }
        if (!config.activated) {
            message = <Trans>Deactivated</Trans>;
        }
    }
    return <Config data-testid='portal-config-item' title={<Trans>Community Portal</Trans>}
        onClick={() => route('/nodeadmin/communityPortal')}
        value={message}
        isLoading={isLoading} />
};
