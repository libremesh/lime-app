import { Trans } from "@lingui/macro";
import { h } from "preact";

const Menu = () => (
    <a href={"/nodeadmin"}>
        <Trans>Node Configuration</Trans>
    </a>
);

export default Menu;
