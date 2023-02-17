import { Trans } from "@lingui/macro";

import {
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";

export const InternetPath = () => {
    return (
        <Section>
            <SectionTitle icon={<PathIcon />}>
                <Trans>Path to Internet</Trans>
            </SectionTitle>
        </Section>
    );
};
