import { Trans } from "@lingui/macro";

import { Button } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { OptionContainer } from "plugins/lime-plugin-mesh-wide-config/src/components/OptionForm";
import {
    useAddNewSectionModal,
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { IMeshWideSection } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const ConfigSection = ({ dropdown }: { dropdown: IMeshWideSection }) => {
    return (
        <Collapsible
            title={dropdown.name}
            initCollapsed={true}
            optionsComponent={<SectionEditOrDelete name={dropdown.name} />}
        >
            {Object.entries(dropdown.options).map(([key, value]) => (
                <OptionContainer key={key} keyString={key} value={value} />
            ))}
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

export const AddNewSectionBtn = () => {
    const { toggleModal: toggleNewSectionModal, actionModal: addSectionModal } =
        useAddNewSectionModal();

    const { showToast } = useToast();
    return (
        <Button
            color={"info"}
            onClick={() => {
                addSectionModal((data) => {
                    console.log(`Added`, data);
                    toggleNewSectionModal();
                    showToast({
                        text: (
                            <Trans>
                                Added section {data.name} -{" "}
                                {new Date().toDateString()}
                            </Trans>
                        ),
                    });
                });
            }}
        >
            <Trans>Add new section</Trans>
        </Button>
    );
};
