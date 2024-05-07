import { Trans } from "@lingui/macro";

import { FooterStatus } from "components/status/footer";
import { useToast } from "components/toast/toastProvider";

export const MeshStatus = () => {
    const { showToast } = useToast();
    return (
        <FooterStatus
            status={"success"}
            btn={"Update"}
            onClick={() => {
                showToast({
                    text: (
                        <>
                            <Trans>
                                Updating shared state{" "}
                                {new Date().toDateString()}
                            </Trans>
                        </>
                    ),
                    duration: 5000,
                });
            }}
        >
            <div className={"flex flex-col "}>
                <Trans>10 of 12 node are ready to update</Trans>
                <br />
                <span className={"text-xl"}>
                    <Trans>Last update: 30 second ago</Trans>
                </span>
            </div>
        </FooterStatus>
    );
};
