import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Button } from "components/buttons/button";
import Divider from "components/divider";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import { EditableField } from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";
import { DeletePropModal } from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

type OptionContainerProps = {
    sectionName: string;
    keyString: string;
};

export const OptionContainer = ({
    keyString,
    sectionName,
}: OptionContainerProps) => {
    const { watch, setValue } = useFormContext();
    const [isEditing, setIsEditing] = useState(false);
    const {
        open: isDeleteModalOpen,
        onOpen: openDeleteModal,
        onClose: onCloseDeleteModal,
    } = useDisclosure();

    const { showToast } = useToast();

    const onDelete = async () => {
        const newValues = { ...section };
        delete newValues[keyString];
        setValue(sectionName, newValues);
        onCloseDeleteModal();
        showToast({
            text: <Trans>Deleted {keyString}</Trans>,
            onAction: () => {
                setValue(sectionName, section);
            },
        });
    };

    const name = `${sectionName}[${keyString}]`;
    const value = watch(name);
    const section = watch(sectionName);

    let _value = value;
    const isList = Array.isArray(value);
    if (isList) {
        _value = value.join(", ");
    }

    const fmethods = useForm<IMeshWideConfig>({
        defaultValues: { [sectionName]: { [keyString]: value } },
    });

    const onSubmit = (data: IMeshWideConfig) => {
        const newSectionValues = { ...section, ...data[sectionName] };
        setValue(sectionName, newSectionValues);
        setIsEditing(false);
    };

    return (
        <div class={"px-4"}>
            <div className={"flex justify-center"}>
                <Divider color={"white"} />
            </div>
            <div className="pl-6 pr-4 py-6 flex flex-col gap-4">
                <div className={"flex flex-row items-center justify-between"}>
                    <div>
                        {isList && <Trans>(List)</Trans>} {keyString}
                    </div>
                    <EditOrDelete
                        onEdit={() => setIsEditing((prev) => !prev)}
                        onDelete={openDeleteModal}
                    />
                </div>
                {!isEditing && <div>{_value}</div>}
                {isEditing && (
                    <FormProvider {...fmethods}>
                        <form className={"flex flex-col gap-4"}>
                            <EditableField isList={isList} name={name} />
                            <div className={"flex flex-row gap-4"}>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fmethods.handleSubmit(onSubmit)();
                                    }}
                                    outline={true}
                                >
                                    <Trans>Done</Trans>
                                </Button>
                                <Button
                                    color={"danger"}
                                    onClick={() => {
                                        fmethods.reset();
                                        setIsEditing(false);
                                    }}
                                    outline={true}
                                >
                                    <Trans>Cancel</Trans>
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                )}
            </div>
            <DeletePropModal
                prop={keyString}
                isOpen={isDeleteModalOpen}
                onDelete={onDelete}
                onClose={onCloseDeleteModal}
            />
        </div>
    );
};
