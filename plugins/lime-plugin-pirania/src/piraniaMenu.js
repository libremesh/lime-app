import { Trans } from "@lingui/macro";

import { TicketIcon } from "components/icons/teenny/ticket";

const PiraniaMenu = () => (
    <span>
        <TicketIcon />
        <a href={"#/access"}>
            <Trans>Access Vouchers</Trans>
        </a>
    </span>
);

export default PiraniaMenu;
