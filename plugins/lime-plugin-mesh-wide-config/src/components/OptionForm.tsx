import { Trans } from "@lingui/macro";
import { list } from "postcss";
import { useState } from "preact/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "components/buttons/button";
import Divider from "components/divider";
import InputField from "components/inputs/InputField";
import { useToast } from "components/toast/toastProvider";

import {
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { ConfigItemType } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";

const EditOptionForm = ({
    keyString,
    value,
    onSubmit,
    onCancel,
}: {
    keyString: string;
    value: ConfigItemType;
    onSubmit?: (data) => void;
    onCancel?: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { key: keyString, value },
    });

    const _onSubmit: SubmitHandler<any> = (data) => {
        onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-4"}
        >
            <InputField
                id={"key"}
                label={<Trans>Key</Trans>}
                register={register}
            />
            <InputField
                id={"value"}
                label={<Trans>Value</Trans>}
                register={register}
            />
            <div className={"flex flex-row gap-4"}>
                <Button onClick={handleSubmit(_onSubmit)} outline={true}>
                    <Trans>Done</Trans>
                </Button>
                <Button color={"danger"} onClick={onCancel} outline={true}>
                    <Trans>Cancel</Trans>
                </Button>
            </div>
        </form>
    );
};

export const OptionContainer = ({
    keyString,
    value,
}: {
    keyString: string;
    value: ConfigItemType;
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => setIsEditing(!isEditing);

    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    const { toggleModal: toggleEditModal, actionModal: editPropertyModal } =
        useEditPropModal();
    const { showToast } = useToast();

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
                {!isEditing ? (
                    <>
                        <div
                            className={
                                "flex flex-row items-center justify-between"
                            }
                        >
                            <div>
                                {isList && <Trans>(List)</Trans>} {keyString}
                            </div>
                            <EditOrDelete
                                onEdit={toggleIsEditing}
                                onDelete={(e) => {
                                    e.stopPropagation();
                                    deletePropModal(keyString, () => {
                                        console.log("delete stuff");
                                        toggleDeleteModal();
                                        showToast({
                                            text: (
                                                <Trans>
                                                    Deleted {keyString}
                                                </Trans>
                                            ),
                                            onAction: () => {
                                                console.log("Undo action");
                                            },
                                        });
                                    });
                                }}
                            />
                        </div>
                        <div>{_value}</div>
                    </>
                ) : (
                    <EditOptionForm
                        keyString={keyString}
                        value={value}
                        onCancel={toggleIsEditing}
                        onSubmit={(data) => {
                            editPropertyModal(keyString, () => {
                                console.log("edited stuff");
                                toggleEditModal();
                                toggleIsEditing();
                                showToast({
                                    text: <Trans>Edited {keyString}</Trans>,
                                });
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
};
