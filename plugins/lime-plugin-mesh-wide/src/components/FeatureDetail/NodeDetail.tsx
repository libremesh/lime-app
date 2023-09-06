import { Trans } from "@lingui/macro";

import { Button } from "components/buttons/button";

import {
    Row,
    TitleAndText,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/index";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import {
    INamedNodeInfo,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

const NodeDetails = ({
    nodeDetail,
    selectedFeature,
}: {
    nodeDetail: INamedNodeInfo;
    selectedFeature: SelectedMapFeature;
}) => {
    const hasError: boolean = Math.random() < 0.5;
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
                {!hasError ? (
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

export default NodeDetails;
