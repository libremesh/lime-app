import { Trans } from "@lingui/macro";
import { VNode } from "preact";

import { Button } from "components/elements/button";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import {
    ILinkDetailFeature,
    INodeDetailFeature,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

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

const LinkDetails = ({
    linkDetails,
    selectedFeature,
}: {
    linkDetails: ILinkDetailFeature;
    selectedFeature: SelectedMapFeature;
}) => {
    const name = linkDetails?.name ?? selectedFeature?.id ?? "";
    const gain = "5 dB";
    const linkType = "Primary";

    return (
        <>
            <Row>
                <div className={"text-3xl"}>
                    <Trans>Link</Trans>
                    {name}
                </div>
                <Button color={"danger"} outline={true} size={"sm"}>
                    <PowerIcon />
                </Button>
            </Row>
            <Row>
                <TitleAndText title={<Trans>Gain</Trans>}>{gain}</TitleAndText>
                <TitleAndText title={<Trans>Link type</Trans>}>
                    {linkType}
                </TitleAndText>
            </Row>
        </>
    );
};

const NodeDetails = ({
    nodeDetail,
    selectedFeature,
    synced,
}: {
    nodeDetail: INodeDetailFeature;
    selectedFeature: SelectedMapFeature;
    synced: boolean;
}) => {
    const name = nodeDetail?.name ?? selectedFeature?.id ?? "";
    const uptime = "1 week";
    const firmware = "e93615c947-x86-64";
    const ipv6 = "fe80::42:cff:fecf:bfff";
    const ipv4 = "192.168.1.47";
    const device = "LibreRouter";

    return (
        <>
            <Row>
                <div className={"text-3xl"}>{name}</div>
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

export const FeatureDetail = ({
    selectedFeature,
    synced,
}: {
    selectedFeature: SelectedMapFeature;
    synced: boolean;
}) => {
    if (!selectedFeature) return;
    switch (selectedFeature.feature.geometry.type) {
        case "LineString":
            return (
                <LinkDetails
                    linkDetails={
                        selectedFeature.feature.properties as ILinkDetailFeature
                    }
                    selectedFeature={selectedFeature}
                />
            );
        case "Point":
            return (
                <NodeDetails
                    nodeDetail={
                        selectedFeature.feature.properties as INodeDetailFeature
                    }
                    selectedFeature={selectedFeature}
                    synced={synced}
                />
            );
        default:
            return <></>;
    }
};

export const BottomSheetFooter = ({
    synced,
    selectedFeature,
}: {
    synced?: boolean;
    selectedFeature: SelectedMapFeature;
}) => {
    if (!selectedFeature) return;

    const type = selectedFeature.feature.geometry.type;

    const Synced = () => {
        let txt: VNode;
        if (type === "LineString") {
            txt = <Trans>Same status as in the reference state</Trans>;
        } else if (type === "Point") {
            txt = <Trans>Same status as in the reference state</Trans>;
        }

        return <StatusAndButton isError={false}>{txt}</StatusAndButton>;
    };

    const UpdateReference = () => {
        let txt: VNode;
        let btn: VNode;
        if (type === "LineString") {
            txt = (
                <Trans>
                    This link has 5dB difference
                    {/*{*/}
                    {/*    (*/}
                    {/*        selectedFeature.feature*/}
                    {/*            .properties as ILinkDetailFeature*/}
                    {/*    ).gain*/}
                    {/*}{" "}*/}
                    <br /> with the reference state
                </Trans>
            );
            btn = <Trans>Update this link on reference state</Trans>;
        } else if (type === "Point") {
            txt = <Trans>In the reference state this node is on</Trans>;
            btn = <Trans>Update this node on reference state</Trans>;
        }
        return (
            <StatusAndButton isError={true} btn={btn}>
                {txt}
            </StatusAndButton>
        );
    };

    return synced ? <Synced /> : <UpdateReference />;
};
