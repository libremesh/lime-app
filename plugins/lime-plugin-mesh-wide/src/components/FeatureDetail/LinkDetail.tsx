import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { useCallback } from "react";

import { Warning } from "components/icons/status";
import Tabs from "components/tabs";
import { useToast } from "components/toast/toastProvider";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { useSetLinkReferenceStateModal } from "plugins/lime-plugin-mesh-wide/src/components/configPage/modals";
import {
    getQueryByLinkType,
    usePointToPointErrors,
} from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { MacToMacLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { readableBytes } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import { useSetLinkReferenceState } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import {
    BaseMacToMacLink,
    BatmanLinkErrorCodes,
    IBatManLinkData,
    ILinkMtoMErrors,
    IWifiLinkData,
    LinkMapFeature,
    WifiLinkErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

import { Row, TitleAndText } from "./index";

const BatmanDetail = ({
    name,
    errorsArray,
    node,
}: {
    name: string;
    errorsArray: BatmanLinkErrorCodes[] | undefined;
    node: IBatManLinkData;
}) => {
    return (
        <>
            <Row>
                <div className={"flex"}>
                    <strong>{name}</strong>{" "}
                    {errorsArray?.length > 0 && <Warning />}
                </div>
            </Row>
            <Row>
                <TitleAndText title={<Trans>Iface</Trans>}>
                    {node?.iface}
                </TitleAndText>
                <TitleAndText title={<Trans>Last seen</Trans>}>
                    <>{node?.last_seen_msecs} ms</>
                </TitleAndText>
            </Row>
        </>
    );
};

const WifiDetail = ({
    name,
    errorsArray,
    node,
}: {
    name: string;
    errorsArray: WifiLinkErrorCodes[];
    node: IWifiLinkData;
}) => {
    return (
        <div>
            <Row>
                <div className={"flex"}>
                    <strong>{name}</strong>{" "}
                    {errorsArray?.length > 0 && <Warning />}
                </div>
            </Row>
            <Row>
                <TitleAndText
                    title={<Trans>Signal</Trans>}
                    error={
                        errorsArray?.includes(
                            WifiLinkErrorCodes.SIGNAL_LOSS
                        ) ? (
                            <Trans>
                                The signal is X below the reference state
                            </Trans>
                        ) : null
                    }
                >
                    {node?.signal?.toString() ?? "0"}
                </TitleAndText>
                <TitleAndText
                    title={<Trans>Chains</Trans>}
                    error={
                        errorsArray?.includes(WifiLinkErrorCodes.CHAIN_LOSS) ? (
                            <Trans>
                                The difference between chains is too big
                            </Trans>
                        ) : null
                    }
                >
                    {node?.chains?.toString() ?? "0/0"}
                </TitleAndText>
                <TitleAndText title={<Trans>Channel</Trans>}>
                    {node?.channel?.toString() ?? "0"}
                </TitleAndText>
            </Row>
            <Row>
                <TitleAndText title={<Trans>TxRate</Trans>}>
                    {`${readableBytes(node.tx_rate)}`}
                </TitleAndText>
                <TitleAndText title={<Trans>RxRate</Trans>}>
                    {`${readableBytes(node.rx_rate)}`}
                </TitleAndText>
            </Row>
        </div>
    );
};

const SelectedLink = ({
    linkDetail,
    errors,
}: {
    linkDetail: BaseMacToMacLink;
    errors: ILinkMtoMErrors | undefined;
}) => {
    if (linkDetail === undefined || (errors && !errors?.linkUp))
        return (
            <div>
                <Trans>This link seems down</Trans>
            </div>
        );

    const names = linkDetail?.names;
    const linkType = linkDetail.type;

    return (
        <>
            <Row>
                {names && (
                    <div className={"text-3xl"}>
                        <Trans>
                            Link from <strong>{names[0]}</strong> to{" "}
                            <strong>{names[1]}</strong>
                        </Trans>
                    </div>
                )}
            </Row>
            {names.map((name, i) => {
                const node = linkDetail.linkByName(name);
                const errorsArray = errors?.linkErrors[name] ?? [];
                return linkType === "wifi_links_info" ? (
                    <WifiDetail
                        key={i}
                        name={name}
                        errorsArray={errorsArray as WifiLinkErrorCodes[]}
                        node={node as IWifiLinkData}
                    />
                ) : (
                    <BatmanDetail
                        key={i}
                        name={name}
                        errorsArray={errorsArray as BatmanLinkErrorCodes[]}
                        node={node as IBatManLinkData}
                    />
                );
            })}
        </>
    );
};

const LinkFeatureDetail = ({ actual, reference }: LinkMapFeature) => {
    const linkToShow = reference ?? actual;
    const [selectedLink, setSelectedLink] = useState(0);
    const { errors } = usePointToPointErrors({
        id: linkToShow.id,
        type: linkToShow.type,
    });
    const linkType = linkToShow.type;

    const tabs = linkToShow.links.map(
        (link: MacToMacLink<typeof linkType>, i) => {
            return {
                key: i,
                repr: (
                    <div className={"flex"}>
                        <Trans>
                            Link {i + 1}{" "}
                            {errors &&
                            errors?.macToMacErrors[link.id]?.hasErrors ? (
                                <Warning />
                            ) : null}
                        </Trans>
                    </div>
                ),
            };
        }
    );

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-auto gap-6">
            {tabs?.length > 1 && (
                <Tabs
                    tabs={tabs}
                    current={selectedLink}
                    onChange={setSelectedLink}
                />
            )}
            {selectedLink !== null && (
                <SelectedLink
                    linkDetail={actual?.links[selectedLink]}
                    errors={
                        errors?.macToMacErrors[actual?.links[selectedLink]?.id]
                    }
                />
            )}
        </div>
    );
};

export const LinkReferenceStatus = ({ reference }: LinkMapFeature) => {
    const isNewNode = !reference;

    const { errors } = usePointToPointErrors({
        id: reference.id,
        type: reference.type,
    });

    const isDown = !errors.linkUp;

    // Check if there are errors of global reference state to shown
    const { reference: fetchDataReference } = getQueryByLinkType(
        reference.type
    );
    const { data: referenceData, isError: isReferenceError } =
        fetchDataReference({});
    let referenceError = false;
    if (!referenceData || isEmpty(referenceData) || isReferenceError) {
        referenceError = true;
    }

    // Modal to set ref state
    const { closeModal, confirmModal, isModalOpen } =
        useSetLinkReferenceStateModal();
    const { showToast } = useToast();

    // Generate a list of nodes to update
    const nodesToUpdate = reference.nodes.reduce((acc, node) => {
        acc[node.ipv4] = node.hostname;
        return acc;
    }, {});

    // todo(kon): Sync mutations, used to sync data between nodes and local node after setting the reference state
    // useSharedStateSync

    // Mutation to update the reference state
    const { callMutations } = useSetLinkReferenceState({
        linkType: reference.type,
        linkToUpdate: reference,
        isDown,
        nodesToUpdate,
    });

    // Show confirmation modal before run mutations
    const setReferenceState = useCallback(async () => {
        confirmModal(
            reference.type,
            Object.values(nodesToUpdate),
            isDown,
            async () => {
                try {
                    const res = await callMutations();
                    if (res.errors.length) {
                        console.log("Errors");
                        throw new Error("Error setting new reference state!");
                    }
                    showToast({
                        text: <Trans>New reference state set!</Trans>,
                    });
                } catch (error) {
                    showToast({
                        text: <Trans>Error setting new reference state!</Trans>,
                    });
                } finally {
                    closeModal();
                }
            }
        );
    }, [
        callMutations,
        closeModal,
        confirmModal,
        isDown,
        nodesToUpdate,
        reference.type,
        showToast,
    ]);

    let btnText = (
        <Trans>
            Set reference state for this
            <br /> {reference.type} link
        </Trans>
    );
    if (isDown) {
        btnText = (
            <Trans>
                Delete this {reference.type} link
                <br />
                from reference state
            </Trans>
        );
    }

    let errorMessage = <Trans>Same status as in the reference state</Trans>;
    if (referenceError) {
        errorMessage = <Trans>Reference is not set or has errors</Trans>;
    } else if (errors?.hasErrors) {
        errorMessage = <Trans>This link has errors</Trans>;
    } else if (isNewNode) {
        errorMessage = (
            <Trans>This Link is not registered on the reference state</Trans>
        );
    }

    const hasError = errors?.hasErrors || referenceError;
    const showSetReferenceButton = isDown || isNewNode || referenceError;

    return (
        <StatusAndButton
            isError={hasError}
            btn={showSetReferenceButton && btnText}
            onClick={setReferenceState}
        >
            {errorMessage}
        </StatusAndButton>
    );
};

export default LinkFeatureDetail;
