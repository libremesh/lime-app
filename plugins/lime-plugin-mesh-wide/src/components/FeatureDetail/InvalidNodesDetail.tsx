import { Trans } from "@lingui/macro";

import { Row } from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/index";
import { InvalidNodes } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const InvalidNodesDetail = ({ nodes }: { nodes: InvalidNodes }) => {
    return (
        <div>
            <Row>
                <div className={"text-3xl"}>
                    <Trans>Invalid Nodes</Trans>
                </div>
            </Row>
            <Row>
                <Trans>
                    The following nodes are not located or have not reference
                    state. Please, set their location to see them on the map:
                </Trans>
            </Row>
            {[...nodes].map((name, k) => (
                <div key={k}>{name}</div>
            ))}
        </div>
    );
};
