import { Trans } from "@lingui/macro";

import {
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PortsIcon } from "plugins/lime-plugin-rx/src/icons/portsIcon";

export const Wired = () => {
    return (
        <Section>
            <SectionTitle icon={<PortsIcon />}>
                <Trans>Wired connections</Trans>
            </SectionTitle>
        </Section>
    );
};
