import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Button } from "components/buttons/button";
import Divider from "components/divider";
import InputField from "components/inputs/InputField";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import {
    DeletePropModal,
    EditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";

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
    const {
        open: isDeleteModalOpen,
        onOpen: openDeleteModal,
        onClose: onCloseDeleteModal,
    } = useDisclosure();
    const { showToast } = useToast();

    const onDelete = async () => {
        console.log("delete stuff");
        onCloseDeleteModal();
        showToast({
            text: (
                <Trans>
                    Deleted {keyString} - {new Date().toDateString()}
                </Trans>
            ),
            onAction: () => {
                console.log("Undo action");
            },
        });
    };
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => setIsEditing(!isEditing);

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
                                onDelete={openDeleteModal}
                            />
                        </div>
                        <div>{value}</div>
                    </>
                ) : (
                    <EditOptionForm
                        keyString={keyString}
                        value={value}
                        onSubmit={(data) => {
                            console.log("edited stuff", data);
                            toggleIsEditing();
                            showToast({
                                text: <Trans>Edited {data.key}</Trans>,
                            });
                        }}
                    />
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
