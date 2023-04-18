import { Trans } from "@lingui/macro";

import { Button } from "components/elements/button";

import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";

const TitleAndText = ({
    title,
    children,
}: {
    title: any; // todo(kon): error with trans component
    children: string;
}) => {
    return (
        <div className={"flex flex-column"}>
            <div className={"text-lg"}>{title}</div>
            <div className={"text-3xl"}>{children}</div>
        </div>
    );
};

const Row = ({ children }: { children: any }) => {
    return (
        <div className={"flex flex-row justify-between align-middle mb-4"}>
            {children}
        </div>
    );
};

export const NodeDetail = ({ synced }: { synced: boolean }) => {
    const nodeName = "ql-arbol";
    const uptime = "1 week";
    const firmware = "e93615c947-x86-64";
    const ipv6 = "fe80::42:cff:fecf:bfff";
    const ipv4 = "192.168.1.47";
    const device = "LibreRouter";

    return (
        <>
            <Row>
                <div className={"text-3xl"}>{nodeName}</div>
                <Button color={"danger"} outline={true} size={"sm"}>
                    <PowerIcon />
                </Button>
            </Row>
            <Row>
                {synced ? (
                    <TitleAndText title={<Trans>Uptime</Trans>}>
                        {uptime}
                    </TitleAndText>
                ) : (
                    <TitleAndText title={<Trans>Downtime</Trans>}>
                        {uptime}
                    </TitleAndText>
                )}

                <TitleAndText title={<Trans>Firmware version</Trans>}>
                    {firmware}
                </TitleAndText>
            </Row>
            <Row>
                <TitleAndText title={<Trans>IPv4</Trans>}>{ipv4}</TitleAndText>
                <TitleAndText title={<Trans>IPv6</Trans>}>{ipv6}</TitleAndText>
            </Row>
            <Row>
                <TitleAndText title={<Trans>Device</Trans>}>
                    {device}
                </TitleAndText>
            </Row>
        </>
    );
};
