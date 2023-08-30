import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useState } from "preact/hooks";

import { Button } from "components/buttons/button";
import Tabs from "components/tabs";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import {
    LinkDetailData,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";

import { Row, TitleAndText } from "./index";

const SelectedLink = ({ linkDetail }: { linkDetail: LinkDetailData }) => {
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

const Links = ({ linkDetails }: { linkDetails: PontToPointLink }) => {
    const [selectedLink, setSelectedLink] = useState(0);

    const tabs = linkDetails.links.map((link: LinkDetailData, i) => {
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
