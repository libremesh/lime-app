import { Trans } from "@lingui/macro";

import { Button } from "components/elements/button";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { SignalColor } from "plugins/lime-plugin-rx/src/components/signalColor";
import { AlignIcon } from "plugins/lime-plugin-rx/src/icons/alignIcon";
import { StatusResponse } from "plugins/lime-plugin-rx/src/rxApi";
import { useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";

import { useBatHost } from "utils/queries";

function stripIface(hostIface) {
    return hostIface.split("_wlan")[0].replace("_", "-");
}

export const AlignmentCard = ({ status }: { status: StatusResponse }) => {
    const { data: bathost } = useBatHost(
        status.most_active && status.most_active.station_mac,
        status.most_active && status.most_active.iface,
        { enabled: !!status.most_active }
    );

    const traffic = Math.round(
        (status.most_active.rx_bytes + status.most_active.tx_bytes) /
            1024 /
            1024
    );
    return (
        <div className={"flex flex-row mt-6"}>
            <div className={"flex-1 text-7xl text-center text-primary"}>
                <SignalColor
                    className={"font-bold"}
                    signal={+status.most_active.signal}
                />
                <div className={"text-3xl"}>
                    {status.most_active.chains.map((chain, i) => (
                        <span key={i}>
                            <SignalColor
                                className={"font-bold"}
                                signal={chain}
                            />
                            {i !== status.most_active.chains.length - 1 &&
                                " / "}
                        </span>
                    ))}
                </div>
            </div>
            <div className={"flex-1 flex flex-col text-xl "}>
                <div className={"font-bold"}>
                    <Trans>Most active link</Trans>
                </div>
                <div className={"text-primary font-bold"}>
                    {bathost && bathost.hostname ? (
                        <span>{stripIface(bathost.hostname)}</span>
                    ) : (
                        <span class="withLoadingEllipsis">
                            <Trans>Fetching name</Trans>
                        </span>
                    )}
                </div>
                <div className={""}>
                    <Trans>Interface: </Trans>
                    <span className={"font-bold"}>
                        {status.most_active.iface}
                    </span>
                </div>
                <div className={""}>
                    <Trans>Traffic: </Trans>
                    <span className={"font-bold"}> {traffic}MB/s</span>
                </div>
            </div>
            <div className={"flex-1 flex justify-center"}>
                <Button size={"lg"} color={"secondary"} href={"#/align"}>
                    <Trans>
                        Check
                        <br />
                        Alignment
                    </Trans>
                </Button>
            </div>
        </div>
    );
};

export const Alignment = () => {
    const { data: status, isLoading } = useNodeStatus();

    return (
        <div
            className={
                "w-full min-h-min bg-primary-card border-b-2 border-primary-dark pb-10 pr-2"
            }
        >
            <Section>
                <div>
                    <SectionTitle
                        icon={<AlignIcon className={IconsClassName} />}
                    >
                        <Trans>Your Alignment</Trans>
                    </SectionTitle>
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <AlignmentCard status={status} />
                    )}
                </div>
            </Section>
        </div>
    );
};
