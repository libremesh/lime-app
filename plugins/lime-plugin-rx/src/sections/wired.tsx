import { Trans } from "@lingui/macro";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PortsIcon } from "plugins/lime-plugin-rx/src/icons/portsIcon";
import { StatusResponse } from "plugins/lime-plugin-rx/src/rxApi";
import { useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";

const Ports = ({ status }: { status: StatusResponse }) => {
    const ports = status.switch_status.reduce((acc, obj) => {
        const { role } = obj;
        if (!acc[role]) {
            acc[role] = [];
        }
        acc[role].push(obj);
        return acc;
    }, {});

    console.log(ports);
    return (
        <div className={"flex flex-row"}>
            {" "}
            {Object.keys(ports).map((role) => {
                if (
                    role.toLowerCase() === "wan" ||
                    role.toLowerCase() === "lan"
                )
                    return (
                        <div key={role} className={"flex-1 flex flex-column"}>
                            <h2 className={"font-bold"}>
                                {role.toUpperCase()}
                            </h2>
                            <h2>{ports[role][0].device.toLowerCase()}</h2>
                            <div className={"flex flex-row gap-5"}>
                                {ports[role].map((port) => {
                                    const link =
                                        port.link.toLowerCase() === "up"
                                            ? "fill-primary-dark"
                                            : "fill-disabled";
                                    return (
                                        <div key={`${role}-${port.num}`}>
                                            <PortsIcon
                                                className={`h-7 w-7 ${link}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
            })}
        </div>
    );
};

export const Wired = () => {
    const { data: status, isLoading } = useNodeStatus();

    return (
        <Section>
            <SectionTitle icon={<PortsIcon className={IconsClassName} />}>
                <Trans>Wired connections</Trans>
            </SectionTitle>
            <div className={"mt-4"}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <Ports status={status} />
                )}
            </div>
        </Section>
    );
};
