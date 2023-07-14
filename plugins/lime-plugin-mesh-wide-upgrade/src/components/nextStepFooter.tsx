import { Trans } from "@lingui/macro";

import { FooterStatus } from "components/status/footer";

const NextStepFooter = () => {
    return (
        <FooterStatus status={"success"} btn={"Update"} onClick={() => {}}>
            <div className={"flex flex-col "}>
                <Trans>Download new firmware for two nodes</Trans>
            </div>
        </FooterStatus>
    );
};

export default NextStepFooter;
