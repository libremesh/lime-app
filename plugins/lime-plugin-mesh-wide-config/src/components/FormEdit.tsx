import { Trans, t } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Button, ButtonProps } from "components/buttons/button";
import InputField from "components/inputs/InputField";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import {
    AddNewSectionFormProps,
    AddNewSectionModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const EditableField = ({
    isList,
    name,
}: {
    isList: boolean;
    name: string;
}) => {
    const { control, setValue, watch, getValues } = useFormContext();

    const value = watch(name);
    // Hack to force re-render when the list changes
    const [uniqueKeys, setUniqueKeys] = useState(
        isList && value?.length ? value.map(() => uuidv4()) : []
    );

    const syncKeysWithValues = () => {
        // Ensure uniqueKeys matches the length of value array
        setUniqueKeys((keys) => [
            ...keys,
            ...Array(value.length - keys.length)
                .fill(null)
                .map(() => uuidv4()),
        ]);
    };

    const removeListItem = (index) => {
        const updatedValues = value.filter((_, i) => i !== index);
        setValue(name, updatedValues);
        setUniqueKeys((keys) => keys.filter((_, i) => i !== index));
    };

    const addListItem = () => {
        setValue(name, [...value, ""]);
        setUniqueKeys((keys) => [...keys, uuidv4()]);
    };

    // Ensure the list has at least one item at the start
    useEffect(() => {
        if (isList && value.length === 0) {
            setValue(name, [""]);
            setUniqueKeys([uuidv4()]); // Reset keys for new list
        } else if (isList) {
            // Sync keys with values length on every render
            syncKeysWithValues();
        }
    }, [isList, value, name, setValue]);

    if (isList) {
        return (
            <div key={name} className={"flex flex-col gap-6"}>
                {uniqueKeys.map((item, index) => (
                    <Controller
                        key={uniqueKeys[index]} // Use the unique key
                        control={control}
                        name={`${name}[${index}]`}
                        rules={{
                            minLength: {
                                value: 1,
                                message: t`Minimum length is 1`,
                            },
                            required: t`This field cannot be empty`,
                        }}
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <div
                                    className={
                                        "flex flex-row justify-center align-items-center gap-4"
                                    }
                                >
                                    <InputField
                                        id={`${name}[${index}]`}
                                        className="w-100"
                                        error={error?.message}
                                        {...field}
                                    />
                                    <EditOrDelete
                                        onDelete={() => removeListItem(index)}
                                    />
                                </div>
                            );
                        }}
                    />
                ))}
                <AddElementButton onClick={addListItem} />
            </div>
        );
    }

    return (
        <Controller
            name={name}
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
                    id={name}
                    label={<Trans>Value</Trans>}
                    className="w-100"
                    error={error?.message}
                    {...field}
                />
            )}
        />
    );
};

export const AddNewConfigSection = ({
    sectionName,
}: {
    sectionName?: string;
}) => {
    const { watch, setValue } = useFormContext<IMeshWideConfig>();

    const { open, onOpen, onClose } = useDisclosure();
    const { showToast } = useToast();

    const section = watch(sectionName);

    const onSuccess = (data: AddNewSectionFormProps) => {
        if (!sectionName) {
            setValue(data.name, {});
        } else {
            let value: string | string[] = data.value;
            if (data.isList) {
                value = data.values;
            }
            setValue(sectionName, {
                ...section,
                [data.name]: value,
            });
        }
        onClose();
        showToast({
            text: <Trans>Added section {data.name}</Trans>,
        });
    };

    return (
        <>
            <AddElementButton onClick={onOpen} />
            <AddNewSectionModal
                sectionName={sectionName}
                isOpen={open}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </>
    );
};

export const AddElementButton = (props: ButtonProps) => {
    return (
        <div className="flex justify-center">
            <Button
                {...props}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-400 hover:bg-gray-100 font-bold cursor-pointer"
            >
                +
            </Button>
        </div>
    );
};
