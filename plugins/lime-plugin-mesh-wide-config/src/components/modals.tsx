import { Trans, t } from "@lingui/macro";
import { Label } from "@tanstack/react-query-devtools/build/lib/Explorer";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Modal, ModalProps } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";
import switchStyle from "components/switch";

import { EditableField } from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";
import {
    useParallelConfirmConfig,
    useParallelReadyForApply,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";
import {
    IUseParallelQueriesModalProps,
    ParallelQueriesModal,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/modals";

export const DeletePropModal = ({
    prop,
    ...rest
}: { prop: string } & Pick<ModalProps, "onDelete" | "isOpen" | "onClose">) => (
    <Modal title={<Trans>Delete property</Trans>} cancelBtn {...rest}>
        <div>
            <Trans>
                Are you sure you want to delete the <strong>{prop}</strong>{" "}
                property?
            </Trans>
        </div>
    </Modal>
);

export const EditPropModal = ({
    prop,
    ...rest
}: { prop: string } & Pick<ModalProps, "onSuccess" | "isOpen" | "onClose">) => (
    <Modal
        title={<Trans>Edit property</Trans>}
        successBtnText={<Trans>Edit</Trans>}
        {...rest}
        cancelBtn
    >
        <div>
            <Trans>
                Are you sure you want to edit the <strong>{prop}</strong>{" "}
                property?
            </Trans>
        </div>
    </Modal>
);

export interface AddNewSectionFormProps {
    name: string;
    value?: string;
    values?: string[];
    isList?: boolean;
}

export const AddNewSectionModal = ({
    onSuccess,
    sectionName,
    ...rest
}: {
    onSuccess: (data: AddNewSectionFormProps) => void;
    sectionName?: string;
} & Pick<ModalProps, "isOpen" | "onClose">) => {
    const fmethods = useForm<AddNewSectionFormProps>({
        defaultValues: { name: "", value: "", values: [], isList: false },
    });

    const handleSuccess = (data: AddNewSectionFormProps) => {
        onSuccess(data); // Call the parent onSuccess handler
        reset(); // Reset the form after successful submission
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        control,
    } = fmethods;

    let title = <Trans>Add new section</Trans>;
    if (sectionName) {
        title = <Trans>Add new section for {sectionName}</Trans>;
    }

    const isList = watch("isList");

    return (
        <FormProvider {...fmethods}>
            <form>
                <Modal
                    title={title}
                    successBtnText={<Trans>Add</Trans>}
                    cancelBtn
                    {...rest}
                    onSuccess={handleSubmit(handleSuccess)}
                >
                    <Controller
                        name={"name"}
                        control={control}
                        rules={{
                            minLength: {
                                value: 1,
                                message: t`Minimum length is 1`,
                            },
                            required: t`This field cannot be empty`,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <InputField
                                id={"name"}
                                label={<Trans>key</Trans>}
                                className="w-100"
                                error={error?.message}
                                {...field}
                            />
                        )}
                    />
                    {sectionName && (
                        <>
                            <div className={switchStyle.toggles}>
                                <input
                                    type="checkbox"
                                    id="enabled"
                                    {...register("isList")}
                                />
                                <label htmlFor="enabled">
                                    <Trans>Is a list</Trans>
                                </label>
                            </div>
                            <Label>Value</Label>
                            <EditableField
                                name={isList ? "values" : "value"}
                                isList={isList}
                            />
                        </>
                    )}
                </Modal>
            </form>
        </FormProvider>
    );
};

export const AbortModal = ({
    ...props
}: Pick<ModalProps, "isOpen" | "onClose">) => {
    const { abort } = useMeshConfig();
    const title = <Trans>Abort current mesh wide configuration update?</Trans>;
    const content = (
        <Trans>
            This will the abort current configuration update process on all
            nodes. Are you sure you want to proceed?
        </Trans>
    );
    const btnTxt = <Trans>Abort</Trans>;
    return (
        <Modal
            title={title}
            deleteBtnText={btnTxt}
            onDelete={() => {
                abort();
                props.onClose();
            }}
            {...props}
        >
            {content}
        </Modal>
    );
};

export const ScheduleSafeRebootModal = (
    props: IUseParallelQueriesModalProps
) => {
    const { callMutations: startScheduleMeshUpgrade } =
        useParallelReadyForApply();

    let title = <Trans>All nodes are ready</Trans>;
    let content = (
        <Trans>
            Apply configuration on all of them with a scheduled safe reboot?
        </Trans>
    );
    if (!props.isSuccess) {
        title = <Trans>Some nodes are not ready</Trans>;
        content = (
            <Trans>
                Are you sure you want to apply the configuration to the nodes
                that are ready? <br />
                This will make some of them to reboot
                <br />
                Check node list to see the network status
            </Trans>
        );
    }

    return (
        <ParallelQueriesModal
            cb={() => {
                startScheduleMeshUpgrade();
                props.onClose();
            }}
            title={title}
            {...props}
        >
            {content}
        </ParallelQueriesModal>
    );
};

export const ConfirmModal = (props: IUseParallelQueriesModalProps) => {
    const { callMutations } = useParallelConfirmConfig();
    let title = <Trans>All nodes applied the configuration</Trans>;
    let content = (
        <Trans>
            Confirm configuration works properlly for al updated nodes
        </Trans>
    );
    // this is not yet imlemented since we are not storing any information of mesh previous state
    if (!props.isSuccess) {
        title = <Trans>Some nodes don't upgraded properly</Trans>;
        content = (
            <Trans>
                Are you sure you want to confirm the upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }
    return (
        <ParallelQueriesModal
            cb={() => {
                callMutations();
                props.onClose();
            }}
            title={title}
            {...props}
        >
            {content}
        </ParallelQueriesModal>
    );
};
