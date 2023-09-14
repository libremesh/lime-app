import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useState } from "preact/hooks";

import { Button } from "components/buttons/button";
import Tabs from "components/tabs";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { usePointToPointErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import ErrorIcon from "plugins/lime-plugin-mesh-wide/src/icons/errorIcon";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import { MacToMacLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { readableBytes } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import {
    ILinkMtoMErrors,
    LinkMapFeature,
    WifiLinkErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import { Row, TitleAndText } from "./index";

const SelectedLink = ({
    linkDetail,
    errors,
}: {
    linkDetail: MacToMacLink;
    errors: ILinkMtoMErrors;
}) => {
    if (linkDetail === undefined || !errors.linkUp)
        return (
            <div>
                <Trans>This link seems down</Trans>
            </div>
        );

    const names = linkDetail?.names;

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
                const errorsArray = errors.linkErrors[name];
                return (
                    <div key={i}>
                        <Row>
                            <div className={"flex"}>
                                <strong>{name}</strong>{" "}
                                {errorsArray.length > 0 && <ErrorIcon />}
                            </div>
                        </Row>
                        <Row>
                            <TitleAndText
                                title={<Trans>Signal</Trans>}
                                error={
                                    errorsArray.includes(
                                        WifiLinkErrorCodes.SIGNAL_LOSS
                                    ) ? (
                                        <Trans>
                                            The signal is X below the reference
                                            state
                                        </Trans>
                                    ) : null
                                }
                            >
                                {node?.signal?.toString() ?? "0"}
                            </TitleAndText>
                            <TitleAndText
                                title={<Trans>Chains</Trans>}
                                error={
                                    errorsArray.includes(
                                        WifiLinkErrorCodes.CHAIN_LOSS
                                    ) ? (
                                        <Trans>
                                            The difference between chains is too
                                            big
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
            })}
        </>
    );
};

const LinkFeatureDetail = ({ actual, reference }: LinkMapFeature) => {
    const [selectedLink, setSelectedLink] = useState(0);
    const { errors } = usePointToPointErrors({ id: reference.id });

    const tabs = reference.links.map((link: MacToMacLink, i) => {
        return {
            key: i,
            repr: (
                <div className={"flex"}>
                    <Trans>
                        Link {i + 1}{" "}
                        {errors.macToMacErrors[link.id].hasErrors ? (
                            <ErrorIcon />
                        ) : null}
                    </Trans>
                </div>
            ),
        };
    });

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
                            errors.macToMacErrors[
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
    const { errors } = usePointToPointErrors({ id: reference.id });

    const hasError = errors.hasErrors;

    const txt: VNode = hasError ? (
        <Trans>This link has errors</Trans>
    ) : (
        <Trans>Same status as in the reference state</Trans>
    );
    return (
        <StatusAndButton
            isError={hasError}
            btn={hasError && <Trans>Update this link on reference state</Trans>}
        >
            {txt}
        </StatusAndButton>
    );
};

export default LinkFeatureDetail;
