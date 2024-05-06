import { Trans } from "@lingui/macro";

import { EqualizerIcon } from "components/icons/teenny/equalizer";

export const MetricsMenu = () => (
    <span>
        <EqualizerIcon />
        <a href={"#/metrics"}>
            <Trans>Metrics</Trans>
        </a>
    </span>
);
