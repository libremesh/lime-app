import { Trans } from "@lingui/macro";

import { Button } from "components/elements/button";

import {
    usePath,
    usePathLoss,
} from "plugins/lime-plugin-metrics/src/metricsQueries";
import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { InternetStatus } from "plugins/lime-plugin-rx/src/components/internetStatus";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";
import { IGetInternetStatus } from "plugins/lime-plugin-rx/src/rxApi";
import { useInternetStatus } from "plugins/lime-plugin-rx/src/rxQueries";

import LineChart from "../components/internetPathChart";

export const InternetPath = () => {
    const { data: internet, isLoading: internetStatusLoading } =
        useInternetStatus({
            structuralSharing: (
                oldData: IGetInternetStatus,
                newData: IGetInternetStatus
            ) => {
                if (
                    // If is the first execution and there are no internet
                    (!oldData &&
                        !(newData.IPv4.working || newData.IPv6.working)) ||
                    // If the old data and new data are different
                    (oldData &&
                        (oldData.IPv4.working || oldData.IPv6.working) !==
                            (newData.IPv4.working || newData.IPv6.working))
                ) {
                    refetchLosses();
                }
                return newData;
            },
        });

    const { data: path, isLoading: pathIsLoading } = usePath({
        refetchOnWindowFocus: false,
        enabled: true,
    });

    const workingInternet =
        !internetStatusLoading &&
        (internet.IPv4.working || internet.IPv6.working);

    const pathLoss =
        path
            ?.map((station) => {
                return { ip: station.ip };
            })
            .slice()
            .reverse() ?? [];

    const { refetch: refetchLosses } = usePathLoss(pathLoss, {
        refetchOnWindowFocus: false,
        enabled: false,
        initialData: [],
    });

    const checkLosses = async () => {
        refetchLosses();
    };

    return (
        <Section className={"border border-primary-dark rounded-md mx-4"}>
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
                    <span onClick={checkLosses}>
                        <LineChart nodes={path} internet={workingInternet} />
                    </span>
                )}
                <div className="flex flex-col justify-center gap-8">
                    <Button href={"#/metrics"}>
                        <Trans>Diagnose</Trans>
                    </Button>
                    <Button href={"#/locate"}>
                        <Trans>Map</Trans>
                    </Button>
                </div>
            </div>
            <InternetStatus data={internet} />
        </Section>
    );
};
