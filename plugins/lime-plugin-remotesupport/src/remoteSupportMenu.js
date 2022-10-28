import { h } from "preact";
import { Trans } from "@lingui/macro";

const Menu = () => <span>
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M10.329 10.328a4 4 0 01-5.657 0m5.657 0a4 4 0 000-5.656m0 5.656l2.12 2.122m-7.777-2.122a4 4 0 010-5.656m0 5.656L2.55 12.45m7.779-7.778a4 4 0 00-5.657 0m5.657 0l2.12-2.122M4.673 4.672L2.55 2.55m9.9 9.9a7 7 0 01-9.9 0m9.9 0a7 7 0 000-9.9m-9.9 9.9a7 7 0 010-9.9m9.9 0a7 7 0 00-9.9 0" stroke="currentColor" /></svg>
    <a href={'#/remotesupport'}><Trans>Remote Support</Trans></a>
</span>

export default Menu;
