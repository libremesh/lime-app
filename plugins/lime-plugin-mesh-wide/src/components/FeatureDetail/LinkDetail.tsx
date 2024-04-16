import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import { Button } from "components/buttons/button";
import Tabs from "components/tabs";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import {
    getQueryByLinkType,
    usePointToPointErrors,
} from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import ErrorIcon from "plugins/lime-plugin-mesh-wide/src/icons/errorIcon";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import { MacToMacLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { readableBytes } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
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
                    {errorsArray?.length > 0 && <ErrorIcon />}
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
                    {errorsArray?.length > 0 && <ErrorIcon />}
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
                <Button color={"danger"} outline={true} size={"sm"}>
                    <PowerIcon />
                </Button>
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
    const [selectedLink, setSelectedLink] = useState(0);
    const { errors } = usePointToPointErrors({
        id: reference.id,
        type: reference.type,
    });
    const linkType = reference.type;

    const tabs = reference.links.map(
        (link: MacToMacLink<typeof linkType>, i) => {
            return {
                key: i,
                repr: (
                    <div className={"flex"}>
                        <Trans>
                            Link {i + 1}{" "}
                            {errors &&
                            errors?.macToMacErrors[link.id]?.hasErrors ? (
                                <ErrorIcon />
                            ) : null}
                        </Trans>
                    </div>
                ),
            };
        }
    );

    return (
        <>
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
                            errors?.macToMacErrors[
                                actual?.links[selectedLink]?.id
                            ]
                        }
                    />
                )}
            </div>
        </>
    );
};

export const LinkReferenceStatus = ({ actual, reference }: LinkMapFeature) => {
    const { errors } = usePointToPointErrors({
        id: reference.id,
        type: reference.type,
    });

    const { reference: fetchDataReference } = getQueryByLinkType(
        reference.type
    );
    // Check if there are errors of global reference state to shown
    const { data: referenceData, isError: isReferenceError } =
        fetchDataReference({});
    let referenceError = false;
    if (!referenceData || isEmpty(referenceData) || isReferenceError) {
        referenceError = true;
    }

    let errorMessage = <Trans>Same status as in the reference state</Trans>;
    if (referenceError) {
        errorMessage = <Trans>Reference is not set or has errors</Trans>;
    } else if (errors?.hasErrors) {
        errorMessage = <Trans>This link has errors</Trans>;
    }

    const hasError = errors?.hasErrors || referenceError;

    return (
        <StatusAndButton
            isError={hasError}
            btn={hasError && <Trans>Update this link on reference state</Trans>}
        >
            {errorMessage}
        </StatusAndButton>
    );
};

export default LinkFeatureDetail;
