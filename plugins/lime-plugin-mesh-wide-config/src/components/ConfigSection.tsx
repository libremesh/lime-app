import { Trans } from "@lingui/macro";
import { useFormContext } from "react-hook-form";

import { Button, ButtonProps } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { OptionContainer } from "plugins/lime-plugin-mesh-wide-config/src/components/OptionForm";
import {
    useAddNewSectionModal,
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import {
    IMeshWideConfig,
    IMeshWideSection,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";

export const ConfigSection = ({
    title,
    dropdown,
}: {
    title: string;
    dropdown: IMeshWideSection;
}) => {
    return (
        <Collapsible
            title={title}
            initCollapsed={true}
            optionsComponent={<SectionEditOrDelete name={title} />}
        >
            {Object.entries(dropdown).map(([key, value]) => (
                <OptionContainer
                    key={key}
                    sectionName={title}
                    keyString={key}
                />
            ))}
            <AddNewElementBtn sectionName={title} />
        </Collapsible>
    );
};

export const SectionEditOrDelete = ({ name }) => {
    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    const { toggleModal: toggleEditModal, actionModal: editPropertyModal } =
        useEditPropModal();

    const { showToast } = useToast();

    return (
        <EditOrDelete
            onEdit={(e) => {
                e.stopPropagation();
                editPropertyModal(name, () => {
                    console.log("edit stuff");
                    toggleEditModal();
                    showToast({
                        text: (
                            <Trans>
                                Edited {name} - {new Date().toDateString()}
                            </Trans>
                        ),
                        onAction: () => {
                            console.log("Undo action");
                        },
                    });
                });
            }}
            onDelete={(e) => {
                e.stopPropagation();
                deletePropModal(name, () => {
                    console.log("delete stuff");
                    toggleDeleteModal();
                    showToast({
                        text: (
                            <Trans>
                                Deleted {name} - {new Date().toDateString()}
                            </Trans>
                        ),
                        onAction: () => {
                            console.log("Undo action");
                        },
                    });
                });
            }}
        />
    );
};

export const AddNewElementBtn = ({ sectionName }: { sectionName?: string }) => {
    const { toggleModal: toggleNewSectionModal, actionModal: addSectionModal } =
        useAddNewSectionModal();
    const { watch, setValue } = useFormContext<IMeshWideConfig>();
    const section = watch(sectionName);

    const { showToast } = useToast();

    return (
        <AddElementButton
            onClick={() => {
                addSectionModal((data) => {
                    if (!sectionName) {
                        setValue(data.name, {});
                    } else {
                        const kaka = { ...section, [data.name]: "" };
                        setValue(sectionName, kaka);
                    }
                    toggleNewSectionModal();
                    showToast({
                        text: <Trans>Added section {data.name}</Trans>,
                    });
                }, sectionName);
            }}
        />
    );
};

export const AddElementButton = (props: ButtonProps) => {
    return (
        <Button color={"info"} {...props}>
            <Trans>Add new section</Trans>
        </Button>
    );
};
