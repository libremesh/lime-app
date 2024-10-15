import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";
import { useCallback } from "preact/compat";
import { useForm } from "react-hook-form";

import { ModalActions, useModal } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";

import { dataTypeNameMapping } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import { MeshWideMapDataTypeKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

const useActionModal = (
    title: ComponentChildren,
    btnText: ComponentChildren,
    actionName: ModalActions
) => {
    const { toggleModal, setModalState } = useModal();

    const actionModal = useCallback(
        (prop: string, actionCb: () => void) => {
            setModalState({
                content: (
                    <div>
                        <Trans>
                            Are you sure you want to {title} the{" "}
                            <strong>{prop}</strong> property?
                        </Trans>
                    </div>
                ),
                title,
                [`${actionName}Cb`]: actionCb,
                [`${actionName}BtnText`]: btnText,
            });
            toggleModal();
        },
        [actionName, btnText, setModalState, title, toggleModal]
    );
    return { actionModal, toggleModal };
};

export const useDeletePropModal = () =>
    useActionModal(
        <Trans>Delete property</Trans>,
        <Trans>Delete</Trans>,
        "delete"
    );

export const useEditPropModal = () =>
    useActionModal(
        <Trans>Edit property</Trans>,
        <Trans>Edit</Trans>,
        "success"
    );

export const useAddNewSectionModal = () => {
    const { toggleModal, setModalState } = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { name: "" },
    });

    const actionModal = useCallback(
        (actionCb: (data) => void, sectionName?: string) => {
            let title = <Trans>Add new section</Trans>;
            if (sectionName) {
                title = <Trans>Add new section for {sectionName}</Trans>;
            }
            setModalState({
                content: (
                    <div>
                        <InputField
                            id={"name"}
                            label={<Trans>Name</Trans>}
                            register={register}
                        />
                    </div>
                ),
                title,
                successCb: handleSubmit(actionCb),
                successBtnText: <Trans>Add</Trans>,
            });
            toggleModal();
        },
        [handleSubmit, register, setModalState, toggleModal]
    );
    return { actionModal, toggleModal };
};
