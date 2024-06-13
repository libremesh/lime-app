import { Trans } from "@lingui/macro";
import { useCallback } from "react";

import { useToast } from "components/toast/toastProvider";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import RemoteRebootBtn from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/RebootNodeBtn";
import UpdateNodeInfoBtn from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/UpdateNodeInfoBtn";
import {
    Row,
    TitleAndText,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/index";
import { useSetNoeInfoReferenceStateModal } from "plugins/lime-plugin-mesh-wide/src/components/configPage/modals";
import { useSingleNodeErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useSingleNodeErrors";
import useSyncWithNode from "plugins/lime-plugin-mesh-wide/src/hooks/useSyncWithNode";
import { getArrayDifference } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import {
    useMeshWideNodesReference,
    useSetNodeInfoReferenceState,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import {
    NodeErrorCodes,
    NodeMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

const NodeDetails = ({ actual, reference, name }: NodeMapFeature) => {
    const { errors, isDown } = useSingleNodeErrors({
        actual,
        reference,
    });

    if (isDown) {
        return <Trans>This node seems down</Trans>;
    }

    const uptime = actual.uptime;
    const firmware = actual.firmware_version;
    const ipv6 = actual.ipv6;
    const ipv4 = actual.ipv4;
    const device = actual.device;
    const macs = actual.macs;

    return (
        <div>
            <Row>
                <div className={"text-3xl"}>{name}</div>
                <div className={"flex flex-row gap-4"}>
                    <UpdateNodeInfoBtn
                        ip={actual.ipv4}
                        nodeName={actual.hostname}
                        updateOnMount={false}
                    />
                    <RemoteRebootBtn node={actual} />
                </div>
            </Row>
            <Row>
                {!isDown ? (
                    <TitleAndText title={<Trans>Uptime</Trans>}>
                        {uptime.toString()}
                    </TitleAndText>
                ) : (
                    <TitleAndText title={<Trans>Uptime</Trans>}>
                        <Trans>The node is down</Trans>
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
    const {
        hasErrors: hasNodeErrors,
        isDown,
        isNewNode,
    } = useSingleNodeErrors({
        actual,
        reference,
    });

    const hostname = isDown ? reference.hostname : actual.hostname;
    const ip = isDown ? reference.ipv4 : actual.ipv4;

    // Check if there are errors of global reference state to shown
    const { data: meshWideNodesReference, isError: isReferenceError } =
        useMeshWideNodesReference({});

    const { toggleModal, confirmModal, isModalOpen } =
        useSetNoeInfoReferenceStateModal();
    const { showToast } = useToast();
    const { syncNode } = useSyncWithNode({ ip, nodeName: hostname });

    // Mutation to update the reference state
    const { mutateAsync } = useSetNodeInfoReferenceState({
        ip,
        hostname,
        isDown,
        params: {
            onSuccess: async () => {
                await syncNode();
                showToast({
                    text: <Trans>New reference state set!</Trans>,
                });
            },
            onError: () => {
                showToast({
                    text: <Trans>Error setting new reference state!</Trans>,
                });
            },
            onSettled: () => {
                if (isModalOpen) toggleModal();
            },
        },
    });

    const setReferenceState = useCallback(async () => {
        confirmModal(hostname, isDown, async () => {
            await mutateAsync();
        });
    }, [confirmModal, hostname, isDown, mutateAsync]);

    let btnText = <Trans>Set reference state for this node</Trans>;
    if (isDown) {
        btnText = <Trans>Delete this this node from reference state</Trans>;
    }

    let referenceError = false;
    if (
        !meshWideNodesReference ||
        isEmpty(meshWideNodesReference) ||
        isReferenceError
    ) {
        referenceError = true;
    }

    let errorMessage = <Trans>Same status as in the reference state</Trans>;
    if (referenceError) {
        errorMessage = <Trans>Reference is not set or has errors</Trans>;
    } else if (isDown) {
        errorMessage = <Trans>In the reference state this node is on</Trans>;
    } else if (isNewNode) {
        errorMessage = (
            <Trans>This node is not registered on the reference state</Trans>
        );
    }

    const hasErrors = hasNodeErrors || referenceError || isNewNode;

    return (
        <StatusAndButton
            isError={hasErrors}
            btn={hasErrors && btnText}
            onClick={setReferenceState}
        >
            {errorMessage}
        </StatusAndButton>
    );
};

export default NodeDetails;
