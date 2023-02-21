import { Trans } from "@lingui/macro";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { AlignIcon } from "plugins/lime-plugin-rx/src/icons/alignIcon";

export const Alignment = () => {
    return (
        <Section>
            <SectionTitle icon={<AlignIcon className={IconsClassName} />}>
                <Trans>Your Alignment</Trans>
            </SectionTitle>
        </Section>
    );
};
