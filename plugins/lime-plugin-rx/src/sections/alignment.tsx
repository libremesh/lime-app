import { Trans } from "@lingui/macro";

import {
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { AlignIcon } from "plugins/lime-plugin-rx/src/icons/alignIcon";

export const Alignment = () => {
    return (
        <Section>
            <SectionTitle icon={<AlignIcon />}>
                <Trans>Your Alignment</Trans>
            </SectionTitle>
        </Section>
    );
};
