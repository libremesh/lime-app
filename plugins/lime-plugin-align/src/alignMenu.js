import { Trans } from "@lingui/macro";

import { AlignIcon } from "components/icons/teenny/align";

export const AlignMenu = () => (
    <span>
        <AlignIcon />
        <a href={"#/align"}>
            <Trans>Align</Trans>
        </a>
    </span>
);
