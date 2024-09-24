import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";
import { useCallback } from "preact/compat";
import { useForm } from "react-hook-form";

import { ModalActions, useModal } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";

import { dataTypeNameMapping } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import { MeshWideMapDataTypeKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const useSetNodeInfoReferenceStateModal = () => {
    const { toggleModal, setModalState, isModalOpen } = useModal();

    const confirmModal = useCallback(
        (nodeName: string, isDown: boolean, cb: () => Promise<void>) => {
            let title = <Trans>Set reference state for {nodeName}</Trans>;
            let content = <Trans>Set the reference state for this node.</Trans>;
            if (isDown) {
                title = (
                    <Trans>Remove {nodeName} from the reference state</Trans>
                );
                content = (
                    <Trans>
                        This node seems down, remove them from the reference
                        state?
                    </Trans>
                );
            }
            setModalState({
                title,
                content,
                successCb: cb,
                successBtnText: <Trans>Continue</Trans>,
            });
            toggleModal();
        },
        [setModalState, toggleModal]
    );
    return { confirmModal, toggleModal, isModalOpen };
};

export const useSetLinkReferenceStateModal = () => {
    const { toggleModal, setModalState, isModalOpen, closeModal } = useModal();

    const confirmModal = ({
        dataType,
        nodes,
        isDown,
        cb,
    }: {
        dataType: MeshWideMapDataTypeKeys;
        nodes: string[];
        isDown: boolean;
        cb: () => Promise<void>;
    }) => {
        let title = (
            <Trans>
                Set reference state for this {dataTypeNameMapping(dataType)}?
            </Trans>
        );
        let content = (
            <Trans>This will set the reference state of this link:</Trans>
        );
        if (isDown) {
            title = (
                <Trans>
                    Remove this {dataTypeNameMapping(dataType)} from the
                    reference state
                </Trans>
            );
            content = (
                <Trans>
                    This link seems down, remove them from the reference state?
                </Trans>
            );
        }
        setModalState({
            title,
            content: (
                <div>
                    {content}
                    <br />
                    <div className={"flex flex-row font-bold"}>
                        {nodes.join(", ")}
                    </div>
                </div>
            ),
            successCb: cb,
            successBtnText: <Trans>Continue</Trans>,
        });
        toggleModal();
    };
    return { confirmModal, closeModal, isModalOpen };
};
