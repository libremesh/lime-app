import { Trans } from "@lingui/macro";
import { VNode } from "preact";

import { Button } from "components/buttons/button";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import {
    Row,
    TitleAndText,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/index";
import { useNodeErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodeErrors";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import { getArrayDifference } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import {
    NodeErrorCodes,
    NodeMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

const NodeDetails = ({ actual, reference, name }: NodeMapFeature) => {
    const uptime = reference.uptime;
    const firmware = reference.firmware_version;
    const ipv6 = reference.ipv6;
    const ipv4 = reference.ipv4;
    const device = reference.device;
    const { errors, isDown } = useNodeErrors({ actual, reference });

    if (isDown) {
        return <Trans>This node seems down</Trans>;
    }
    const macs = actual.macs;

    return (
        <div>
            <Row>
                <div className={"text-3xl"}>{name}</div>
                <Button color={"danger"} outline={true} size={"sm"}>
                    <PowerIcon />
                </Button>
            </Row>
            <Row>
                {!isDown ? (
                    <TitleAndText title={<Trans>Uptime</Trans>}>
                        {uptime.toString()}
                    </TitleAndText>
                ) : (
                    <TitleAndText title={<Trans>Downtime</Trans>}>
                        todo
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
            <Row>
                <TitleAndText title={<Trans>Macs</Trans>}>
                    <div>
                        {macs.map((mac, k) => (
                            <div key={k}>{mac}</div>
                        ))}
                    </div>
                </TitleAndText>
                {errors.includes(NodeErrorCodes.MACS_MISSMATCH) && (
                    <TitleAndText
                        title={<Trans>Macs not found</Trans>}
                        error={
                            <Trans>This macs are not on the actual state</Trans>
                        }
                    >
                        <>
                            {getArrayDifference(reference.macs, macs).map(
                                (mac, k) => (
                                    <div key={k}>{mac}</div>
                                )
                            )}
                        </>
                    </TitleAndText>
                )}
            </Row>
        </div>
    );
};

export const NodeReferenceStatus = ({ actual, reference }: NodeMapFeature) => {
    const { errors, hasErrors, isDown } = useNodeErrors({ actual, reference });

    const txt: VNode = isDown ? (
        <Trans>In the reference state this node is on</Trans>
    ) : (
        <Trans>Same status as in the reference state</Trans>
    );
    return (
        <StatusAndButton
            isError={hasErrors}
            btn={
                hasErrors && <Trans>Update this node on reference state</Trans>
            }
        >
            {txt}
        </StatusAndButton>
    );
};

export default NodeDetails;
