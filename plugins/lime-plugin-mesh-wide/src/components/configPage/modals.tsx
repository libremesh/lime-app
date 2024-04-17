import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";
import { useCallback } from "preact/compat";
import { useForm } from "react-hook-form";

import { ModalActions, useModal } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";

import { DataTypes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

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
        [setModalState, toggleModal]
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
        (actionCb: (data) => void) => {
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
                title: <Trans>Add new section</Trans>,
                successCb: handleSubmit(actionCb),
                successBtnText: <Trans>Add</Trans>,
            });
            toggleModal();
        },
        [setModalState, toggleModal]
    );
    return { actionModal, toggleModal };
};

export const useSetReferenceStateModal = () => {
    const { toggleModal, setModalState, isModalOpen } = useModal();

    const confirmModal = useCallback(
        (dataType: DataTypes, cb: () => Promise<void>) => {
            setModalState({
                title: <Trans>Set reference state for {dataType}</Trans>,
                content: (
                    <Trans>
                        Are you sure you want to set this reference state for{" "}
                        {dataType}
                    </Trans>
                ),
                successCb: cb,
                successBtnText: <Trans>Continue</Trans>,
            });
            toggleModal();
        },
        [setModalState, toggleModal]
    );
    return { confirmModal, toggleModal, isModalOpen };
};
