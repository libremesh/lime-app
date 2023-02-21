import { Trans } from "@lingui/macro";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";

import LineChart from "../components/path";

const data = [
    { ip: "10.219.105.28", hostname: "nodo11s" },
    { ip: "20.1.61.129", hostname: "" },
    { ip: "30.75.0.1", hostname: "" },
    { ip: "40.75.0.1", hostname: "" },
    { ip: "50.75.0.1", hostname: "" },
];

export const InternetPath = () => {
    return (
        <Section>
            <SectionTitle icon={<PathIcon className={IconsClassName} />}>
                <Trans>Path to Internet</Trans>
            </SectionTitle>
            <LineChart nodes={data} internet={true} />
        </Section>
    );
};
