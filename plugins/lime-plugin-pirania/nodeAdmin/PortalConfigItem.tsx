import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { Config } from "plugins/lime-plugin-node-admin/src/components/config";

import { usePortalConfig } from "../src/piraniaQueries";

export const PortalConfigItem = () => {
    const { data: config, isLoading } = usePortalConfig();
    let message: React.ReactNode = "";
    if (config) {
        if (config.activated && config.with_vouchers) {
            message = <Trans>Enabled, with vouchers</Trans>;
        }
        if (config.activated && !config.with_vouchers) {
            message = <Trans>Enabled, without vouchers</Trans>;
        }
        if (!config.activated) {
            message = <Trans>Disabled</Trans>;
        }
    }
    return (
        <Config
            data-testid="portal-config-item"
            title={<Trans>Community Portal</Trans>}
            onClick={() => route("/nodeadmin/communityPortal")}
            value={message}
            isLoading={isLoading}
        />
    );
};
