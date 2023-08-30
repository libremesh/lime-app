import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useState } from "preact/hooks";

import { Button } from "components/buttons/button";
import Tabs from "components/tabs";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import {
    INamedNodeInfo,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";
import {
    LinkDetail,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/utils/getLinksCoordinates";

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

const SelectedLink = ({ linkDetail }: { linkDetail: LinkDetail }) => {
    const names = linkDetail?.names;
    const gain = "5 dB";
    const linkType = "Primary";

    return (
        <>
            <Row>
                {names && (
                    <div className={"text-3xl"}>
                        <Trans>
                            Link from {names[0]} to {names[1]}
                        </Trans>
                    </div>
                )}
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

const LinkDetails = ({ linkDetails }: { linkDetails: PontToPointLink }) => {
    const [selectedLink, setSelectedLink] = useState(0);

    const tabs = linkDetails.links.map((link: LinkDetail, i) => {
        return {
            key: i,
            repr: <Trans>Link {i + 1}</Trans>,
        };
    });

    return (
        <>
            <div className="d-flex flex-column flex-grow-1 overflow-auto gap-6">
                {tabs.length > 1 && (
                    <Tabs
                        tabs={tabs}
                        current={selectedLink}
                        onChange={setSelectedLink}
                    />
                )}
                {selectedLink !== null && (
                    <SelectedLink
                        linkDetail={linkDetails.links[selectedLink]}
                    />
                )}
            </div>
        </>
    );
};

const NodeDetails = ({
    nodeDetail,
    selectedFeature,
    synced,
}: {
    nodeDetail: INamedNodeInfo;
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
    switch (selectedFeature.type) {
        case "link":
            return (
                <LinkDetails
                    linkDetails={selectedFeature.feature as PontToPointLink}
                />
            );
        case "node":
            return (
                <NodeDetails
                    nodeDetail={selectedFeature.feature as INamedNodeInfo}
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

    const type = selectedFeature.type;

    const Synced = () => {
        let txt: VNode;
        if (type === "link") {
            txt = <Trans>Same status as in the reference state</Trans>;
        } else if (type === "node") {
            txt = <Trans>Same status as in the reference state</Trans>;
        }

        return <StatusAndButton isError={false}>{txt}</StatusAndButton>;
    };

    const UpdateReference = () => {
        let txt: VNode;
        let btn: VNode;
        if (type === "link") {
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
        } else if (type === "node") {
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
