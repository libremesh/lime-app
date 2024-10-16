import { Trans } from "@lingui/macro";
import { StateUpdater, useState } from "preact/hooks";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "components/buttons/button";
import Divider from "components/divider";
import { useToast } from "components/toast/toastProvider";

import { AddElementButton } from "plugins/lime-plugin-mesh-wide-config/src/components/ConfigSection";
import {
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";

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

    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    // const { toggleModal: toggleEditModal, actionModal: editPropertyModal } =
    //     useEditPropModal();
    const { showToast } = useToast();

    const name = `${sectionName}[${keyString}]`;
    const value = watch(name);
    const section = watch(sectionName);

    let _value = value;
    const isList = Array.isArray(value);
    if (isList) {
        _value = value.join(", ");
    }

    return (
        <div class={"px-4"}>
            <div className={"flex justify-center"}>
                <Divider color={"white"} />
            </div>
            <div className="pl-6 pr-4 py-6 flex flex-col gap-4">
                <>
                    <div
                        className={"flex flex-row items-center justify-between"}
                    >
                        <div>
                            {isList && <Trans>(List)</Trans>} {keyString}
                        </div>
                        <EditOrDelete
                            onEdit={() => setIsEditing((prev) => !prev)}
                            onDelete={(e) => {
                                e.stopPropagation();
                                deletePropModal(keyString, () => {
                                    const newValues = { ...section };
                                    delete newValues[keyString];
                                    setValue(sectionName, newValues);
                                    toggleDeleteModal();
                                    showToast({
                                        text: (
                                            <Trans>Deleted {keyString}</Trans>
                                        ),
                                        onAction: () => {
                                            setValue(sectionName, section);
                                        },
                                    });
                                });
                            }}
                        />
                    </div>
                    {!isEditing && <div>{_value}</div>}
                    {isEditing && (
                        <EditableField
                            isList={isList}
                            name={name}
                            keyString={keyString}
                            setIsEditing={setIsEditing}
                        />
                    )}
                </>
            </div>
        </div>
    );
};

export const EditableField = ({
    isList,
    name,
    keyString,
    setIsEditing,
}: {
    isList: boolean;
    name: string;
    keyString?: string;
    setIsEditing?: StateUpdater<boolean>;
}) => {
    const { control, setValue, watch, getValues } = useFormContext();
    // const { showToast } = useToast();
    const value = watch(name);
    const [initialState] = useState(value);

    const removeListItem = (index) => {
        const updatedValues = value.filter((_, i) => i !== index);
        setValue(name, updatedValues); // Update form values
    };

    const addListItem = () => {
        setValue(name, [...value, ""]); // Update form values
    };

    return (
        <>
            {isList ? (
                <div key={name} className={"flex flex-col gap-6"}>
                    {value.map((item, index) => (
                        <Controller
                            key={index}
                            control={control}
                            name={`${name}[${index}]`}
                            render={({ field }) => (
                                <div
                                    className={
                                        "flex flex-row justify-center align-items-center gap-4"
                                    }
                                >
                                    <input
                                        type="text"
                                        className="w-100"
                                        {...field}
                                        value={getValues(`${name}[${index}]`)}
                                    />
                                    <EditOrDelete
                                        onDelete={() => removeListItem(index)}
                                    />
                                </div>
                            )}
                        />
                    ))}
                    <AddElementButton onClick={addListItem} />
                </div>
            ) : (
                <>
                    <label>{<Trans>Value</Trans>}</label>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                data-testid="password-input"
                                className="w-100"
                                {...field}
                            />
                        )}
                    />
                </>
            )}
            {setIsEditing && (
                <div className={"flex flex-row gap-4"}>
                    <Button
                        onClick={() => {
                            setIsEditing(false);
                            // showToast({
                            //     text: <Trans>Edited {keyString}</Trans>,
                            //     onAction: () => {
                            //         setValue(name, initialState);
                            //     },
                            // });
                        }}
                        outline={true}
                    >
                        <Trans>Done</Trans>
                    </Button>
                    <Button
                        color={"danger"}
                        onClick={() => {
                            setValue(name, initialState);
                            setIsEditing(false);
                        }}
                        outline={true}
                    >
                        <Trans>Cancel</Trans>
                    </Button>
                </div>
            )}
        </>
    );
};
