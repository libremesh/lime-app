import { Trans } from "@lingui/macro";
import { ComponentChild } from "preact";
import { useState } from "preact/hooks";
import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    Path,
    useFormContext,
} from "react-hook-form";

import { Button } from "components/buttons/button";
import Divider from "components/divider";
import { useToast } from "components/toast/toastProvider";

import {
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";

const InputField = <TFieldValues extends FieldValues>({
    id,
    label,
    ...field
}: {
    id: Path<TFieldValues>;
    label: string | ComponentChild;
} & Partial<ControllerRenderProps>) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                data-testid="password-input"
                className="w-100"
                {...field}
            />
        </div>
    );
};

export const OptionContainer = ({
    keyString,
    section,
}: {
    section: string;
    keyString: string;
}) => {
    const { control, watch, setValue } = useFormContext();
    const [isEditing, setIsEditing] = useState(false);

    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    const { toggleModal: toggleEditModal, actionModal: editPropertyModal } =
        useEditPropModal();
    const { showToast } = useToast();

    const name = `${section}[${keyString}]`;
    const value = watch(name);
    const [inputState, setInputState] = useState(value);

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
                            onEdit={() => setIsEditing(true)}
                            onDelete={(e) => {
                                e.stopPropagation();
                                // todo(kon): a ver como eliminar
                                // deletePropModal(keyString, () => {
                                //     console.log("delete stuff");
                                //     toggleDeleteModal();
                                //     showToast({
                                //         text: (
                                //             <Trans>Deleted {keyString}</Trans>
                                //         ),
                                //         onAction: () => {
                                //             console.log("Undo action");
                                //         },
                                //     });
                                // });
                            }}
                        />
                    </div>
                    {!isEditing && <div>{_value}</div>}
                    {isEditing && (
                        <Controller
                            name={`${section}.${keyString}`}
                            control={control}
                            render={({
                                field: { onChange, value, ...field },
                            }) => {
                                return (
                                    <>
                                        <InputField
                                            id={name}
                                            name={name}
                                            label={<Trans>Value</Trans>}
                                            value={inputState}
                                            onChange={(v) => {
                                                setInputState(v.target.value);
                                            }}
                                            {...field}
                                        />
                                        <div className={"flex flex-row gap-4"}>
                                            <Button
                                                onClick={() => {
                                                    setValue(name, inputState);
                                                    setIsEditing(false);
                                                }}
                                                outline={true}
                                            >
                                                <Trans>Done</Trans>
                                            </Button>
                                            <Button
                                                color={"danger"}
                                                onClick={() => {
                                                    setInputState(value);
                                                    setIsEditing(false);
                                                    showToast({
                                                        text: (
                                                            <Trans>
                                                                Edited{" "}
                                                                {keyString}
                                                            </Trans>
                                                        ),
                                                    });
                                                }}
                                                outline={true}
                                            >
                                                <Trans>Cancel</Trans>
                                            </Button>
                                        </div>
                                    </>
                                );
                            }}
                        />
                    )}
                </>
            </div>
        </div>
    );
};
