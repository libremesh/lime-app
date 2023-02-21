import { Trans } from "@lingui/macro";

import {
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";

import LineChart from "../components/path";

const data = [
    { ip: "10.219.105.28", hostname: "nodo11s" },
    { ip: "10.1.61.129", hostname: "" },
    { ip: "10.75.0.1", hostname: "" },
];

export const InternetPath = () => {
    return (
        <Section>
            <SectionTitle icon={<PathIcon className={"h-16 w-16"}/>}>
                <Trans>Path to Internet</Trans>
                <LineChart data={data} />
            </SectionTitle>
        </Section>
    );
};
