import { Trans } from "@lingui/macro";

import { useToast } from "components/toast/toastProvider";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";

export const MeshStatus = () => {
    const { showToast, hideToast } = useToast();

    return (
        <StatusAndButton
            isError={false}
            btn={"Update"}
            onClick={() => {
                showToast({
                    text: (
                        <>
                            <Trans>Updating shared state</Trans>{" "}
                            {new Date().toDateString()}
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
        </StatusAndButton>
    );
};
