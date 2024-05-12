import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "components/buttons/button";
import Divider from "components/divider";
import InputField from "components/inputs/InputField";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import {
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide/src/components/configPage/modals";

const EditOptionForm = ({
    keyString,
    value,
    onSubmit,
}: {
    keyString: string;
    value: string;
    onSubmit?: (data) => void;
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
            <Button onClick={handleSubmit(_onSubmit)} outline={true}>
                <Trans>Done</Trans>
            </Button>
        </form>
    );
};

export const OptionContainer = ({
    keyString,
    value,
}: {
    keyString: string;
    value: string;
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => setIsEditing(!isEditing);

    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    const { toggleModal: toggleEditModal, actionModal: editPropertyModal } =
        useEditPropModal();
    const { showToast } = useToast();

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
                            <div>{keyString}</div>
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
                        <div>{value}</div>
                    </>
                ) : (
                    <EditOptionForm
                        keyString={keyString}
                        value={value}
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
