import { Trans } from "@lingui/macro";

import { LifeBuoyIcon } from "components/icons/teenny/lifebuoy";

const Menu = () => (
    <span>
        <LifeBuoyIcon />
        <a href={"#/remotesupport"}>
            <Trans>Remote Support</Trans>
        </a>
    </span>
);

export default Menu;
