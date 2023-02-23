import { Trans } from "@lingui/macro";

import { Button } from "components/elements/button";

import { usePath } from "plugins/lime-plugin-metrics/src/metricsQueries";
import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { InternetStatus } from "plugins/lime-plugin-rx/src/components/internetStatus";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";
import { IGetInternetStatus } from "plugins/lime-plugin-rx/src/rxApi";
import { useInternetStatus } from "plugins/lime-plugin-rx/src/rxQueries";

import LineChart from "../components/path";

export const InternetPath = () => {
    const {
        data: internet,
        isLoading: isInternetLoading,
        refetch: getInternetStatus,
    } = useInternetStatus();

    const {
        data: path,
        isFetching: pathIsLoading,
        refetch: getPath,
    } = usePath({
        refetchOnWindowFocus: false,
        enabled: true,
    });

    return (
        <Section
            className={"border border-primary-dark rounded-md -translate-y-8"}
        >
            <SectionTitle icon={<PathIcon className={IconsClassName} />}>
                <Trans>Path to Internet</Trans>
            </SectionTitle>
            <div className="flex flex-row items-start justify-center space-x-6 pt-8 px-8">
                {pathIsLoading || !path ? (
                    <div className={"text-center text-lg text-disabled"}>
                        <Trans>
                            Loading <br />
                            last internet path...
                        </Trans>
                    </div>
                ) : (
                    <LineChart nodes={path} internet={true} />
                )}
                <div className="flex flex-col justify-center gap-8">
                    <Button>
                        <Trans>Diagnose</Trans>
                    </Button>
                    <Button>
                        <Trans>Map</Trans>
                    </Button>
                </div>
            </div>
            <InternetStatus data={internet} />
        </Section>
    );
};
