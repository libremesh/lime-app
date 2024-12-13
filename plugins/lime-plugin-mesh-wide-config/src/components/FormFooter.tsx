import { Trans } from "@lingui/macro";
import { useFormContext } from "react-hook-form";

import { IFullScreenModalProps } from "components/Modal/FullScreenModal";
import { FooterStatus } from "components/status/footer";
import { useToast } from "components/toast/toastProvider";

import { useSetCommunityConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { jsonToConfig } from "plugins/lime-plugin-mesh-wide-config/src/utils/jsonParser";

export const FormFooter = ({
    onClose,
    isDirty,
}: { isDirty: boolean } & Pick<IFullScreenModalProps, "onClose">) => {
    const { showToast } = useToast();
    const { handleSubmit } = useFormContext<IMeshWideConfig>();
    const { mutate, isLoading } = useSetCommunityConfig({
        onError: () => {
            showToast({
                text: <Trans>Error updating the new configuration</Trans>,
            });
        },
        onSuccess: () => {
            onClose();
            showToast({
                text: <Trans>Starting mesh wide configuration change</Trans>,
            });
        },
    });
    const onSubmit = (data: IMeshWideConfig) => {
        const newConfig = jsonToConfig(data);
        mutate({ file_contents: newConfig });
    };

    let message = <Trans>No changes made</Trans>;
    if (isDirty) {
        message = (
            <>
                <Trans>Changes made</Trans>
                <br />
                <span className={"text-xl"}>
                    <Trans>Start mesh wide configuration update</Trans>
                </span>
            </>
        );
    }
    return (
        <FooterStatus
            fixed={false}
            status={isDirty ? "success" : "warning"}
            btn={<Trans>Start Lime Config update</Trans>}
            btnProps={{
                disabled: !isDirty || isLoading,
            }}
            onClick={() => {
                handleSubmit(onSubmit)();
            }}
        >
            <div className={"flex flex-col "}>{message}</div>
        </FooterStatus>
    );
};
