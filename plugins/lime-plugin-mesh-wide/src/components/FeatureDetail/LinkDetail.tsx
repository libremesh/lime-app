import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useState } from "preact/hooks";

import { Button } from "components/buttons/button";
import Tabs from "components/tabs";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { bytesToMB } from "plugins/lime-plugin-mesh-wide/src/lib/utils";

import { Row, TitleAndText } from "./index";

const SelectedLink = ({ linkDetail }: { linkDetail: MacToMacLink }) => {
    if (linkDetail === undefined)
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
                return (
                    <div key={i}>
                        <Row>
                            <strong>{name}</strong>
                        </Row>
                        <Row>
                            <TitleAndText title={<Trans>Signal</Trans>}>
                                {node.signal.toString()}
                            </TitleAndText>
                            <TitleAndText title={<Trans>Chains</Trans>}>
                                {node.chains.toString()}
                            </TitleAndText>
                        </Row>
                        <Row>
                            <TitleAndText title={<Trans>TxRate</Trans>}>
                                {`${bytesToMB(node.tx_rate).toString()}MB`}
                            </TitleAndText>
                            <TitleAndText title={<Trans>RxRate</Trans>}>
                                {`${bytesToMB(node.rx_rate).toString()}MB`}
                            </TitleAndText>
                        </Row>
                    </div>
                );
            })}
        </>
    );
};

const Links = ({
    actual,
    reference,
}: {
    actual: PontToPointLink;
    reference: PontToPointLink;
}) => {
    const [selectedLink, setSelectedLink] = useState(0);

    const tabs = reference.links.map((link: MacToMacLink, i) => {
        return {
            key: i,
            repr: <Trans>Link {i + 1}</Trans>,
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
                    <SelectedLink linkDetail={actual?.links[selectedLink]} />
                )}
            </div>
        </>
    );
};

export const LinkReferenceStatus = ({
    hasError,
    selectedFeature,
}: {
    hasError?: boolean;
    selectedFeature: PontToPointLink;
}) => {
    const txt: VNode = hasError ? (
        <Trans>
            This link has 5dB difference
            <br /> with the reference state
        </Trans>
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

export default Links;
