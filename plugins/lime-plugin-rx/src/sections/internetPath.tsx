import { Trans } from "@lingui/macro";

import { Button } from "components/elements/button";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { InternetStatus } from "plugins/lime-plugin-rx/src/components/internetStatus";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";

import LineChart from "../components/path";

const data = [
    { ip: "10.219.105.28", hostname: "nodo11s" },
    { ip: "20.1.61.129", hostname: "" },
    { ip: "30.75.0.1", hostname: "" },

    { ip: "10.219.105.28", hostname: "nodo11s" },
    { ip: "20.1.61.129", hostname: "" },
    { ip: "30.75.0.1", hostname: "" },
];
const internetStatus = {
    data: {
        DNS: {
            working: false,
        },
        IPv6: {
            working: true,
        },
        IPv4: {
            working: false,
        },
    },
};

export const InternetPath = () => {
    return (
        <Section
            className={"border border-primary-dark rounded-md -translate-y-8"}
        >
            <SectionTitle icon={<PathIcon className={IconsClassName} />}>
                <Trans>Path to Internet</Trans>
            </SectionTitle>
            <div className="flex flex-row items-start justify-center space-x-6 pt-8 px-8">
                <LineChart nodes={data} internet={true} />
                <div className="flex flex-col justify-center gap-8">
                    <Button>
                        <Trans>Diagnose</Trans>
                    </Button>
                    <Button>
                        <Trans>Map</Trans>
                    </Button>
                </div>
            </div>
            <InternetStatus data={internetStatus.data} />
        </Section>
    );
};
