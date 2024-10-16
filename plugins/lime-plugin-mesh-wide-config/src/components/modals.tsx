import { Trans } from "@lingui/macro";
import { Label } from "@tanstack/react-query-devtools/build/lib/Explorer";
import { ComponentChildren } from "preact";
import { useCallback } from "preact/compat";
import { useEffect } from "preact/hooks";
import { FormProvider, useForm } from "react-hook-form";

import { ModalActions, useModal } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";
import switchStyle from "components/switch";

import { EditableField } from "plugins/lime-plugin-mesh-wide-config/src/components/OptionForm";
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

export const useAddNewSectionModal = (
    actionCb: (data) => void,
    sectionName?: string
) => {
    const { toggleModal, setModalState, isModalOpen, openModalKey } =
        useModal();
    const modalKey = `addnewSectionModal${sectionName}`;

    const fmethods = useForm({
        defaultValues: { name: "", value: [""] },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = fmethods;

    const value = watch("value");
    console.log("values! ", value);

    const updateState = useCallback(() => {
        let title = <Trans>Add new section</Trans>;
        if (sectionName) {
            title = <Trans>Add new section for {sectionName}</Trans>;
        }
        setModalState({
            content: (
                <FormProvider {...fmethods}>
                    <InputField
                        id={"name"}
                        label={<Trans>Name</Trans>}
                        register={register}
                    />
                    {sectionName && (
                        <>
                            <Label>Value</Label>
                            <EditableField name={"value"} isList={true} />
                        </>
                    )}
                </FormProvider>
            ),
            title,
            successCb: handleSubmit(actionCb),
            successBtnText: <Trans>Add</Trans>,
        });
    }, [handleSubmit, register, setModalState, toggleModal]);

    const actionModal = useCallback(() => {
        updateState();
        toggleModal(modalKey);
    }, [toggleModal, updateState]);

    // Update modal state with mutation result
    useEffect(() => {
        if (isModalOpen && openModalKey === modalKey) {
            updateState();
        }
    }, [value, isModalOpen, actionModal, openModalKey]);

    return { actionModal, toggleModal };
};
