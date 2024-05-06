import { Trans } from "@lingui/macro";

import { SettingsIcon } from "components/icons/teenny/settings";

const Menu = () => (
    <span>
        <SettingsIcon />
        <a href={"/nodeadmin"}>
            <Trans>Node Configuration</Trans>
        </a>
    </span>
);

export default Menu;
