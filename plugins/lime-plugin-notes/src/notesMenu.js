import { Trans } from "@lingui/macro";

import { DocIcon } from "components/icons/teenny/doc";

export const Menu = () => (
    <span>
        <DocIcon />
        <a href={"#/notes"}>
            <Trans>Notes</Trans>
        </a>
    </span>
);
