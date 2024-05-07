import { Trans } from "@lingui/macro";
import { useCallback } from "react";

import { useToast } from "components/toast/toastProvider";

import { useSetReferenceStateModal } from "plugins/lime-plugin-mesh-wide/src/components/configPage/modals";
import {
    useSetBatmanLinksInfoReferenceState,
    useSetNodeInfoReferenceState,
    useSetWifiLinksInfoReferenceState,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { DataTypes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

const toastDuration = 5000;

export const useSetReferenceState = <T extends DataTypes>(dataType: T) => {
    const { toggleModal, confirmModal, isModalOpen } =
        useSetReferenceStateModal();
    const { showToast } = useToast();

    const mutationOpts = {
        onSuccess: () => {
            showToast({
                text: <Trans>New reference state set!</Trans>,
                duration: toastDuration,
            });
        },
        onError: () => {
            showToast({
                text: <Trans>Error setting new reference state!</Trans>,
                duration: toastDuration,
            });
        },
        onSettled: () => {
            if (isModalOpen) toggleModal();
        },
    };

    const { mutateAsync: nodesMutation } =
        useSetNodeInfoReferenceState(mutationOpts);
    const { mutateAsync: wifiMutation } =
        useSetWifiLinksInfoReferenceState(mutationOpts);
    const { mutateAsync: batmanMutation } =
        useSetBatmanLinksInfoReferenceState(mutationOpts);

    const btnText = <Trans>Set {dataType} reference state</Trans>;

    const mutate = useCallback(async () => {
        switch (dataType) {
            case "node_info":
                await confirmModal(dataType, async () => {
                    await nodesMutation();
                });
                break;
            case "wifi_links_info":
                confirmModal(dataType, async () => {
                    await wifiMutation();
                });
                break;
            case "bat_links_info":
                confirmModal(dataType, async () => {
                    await batmanMutation();
                });
                break;
        }
    }, [batmanMutation, confirmModal, dataType, nodesMutation, wifiMutation]);

    return { mutate, btnText };
};
