import { Trans } from "@lingui/macro";

import { Button } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide/src/components/configPage/OptionForm";
import {
    useAddNewSectionModal,
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide/src/components/configPage/modals";
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

    const { showToast, hideToast } = useToast();

    return (
        <EditOrDelete
            onEdit={(e) => {
                e.stopPropagation();
                editPropertyModal(name, () => {
                    console.log("edit stuff");
                    toggleEditModal();
                    showToast({
                        text: (
                            <>
                                <Trans>Edited</Trans>
                                {name}
                                {" - "}
                                {new Date().toDateString()}
                            </>
                        ),
                        duration: 5000,
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
                            <>
                                <Trans>Deleted</Trans> {name}
                                {" - "}
                                {new Date().toDateString()}
                            </>
                        ),
                        duration: 5000,
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

    const { showToast, hideToast } = useToast();
    return (
        <Button
            color={"info"}
            onClick={() => {
                addSectionModal((data) => {
                    console.log(`Added`, data);
                    toggleNewSectionModal();
                    showToast({
                        text: (
                            <>
                                <Trans>Added section </Trans> {data.name}
                                {" - "}
                                {new Date().toDateString()}
                            </>
                        ),
                        duration: 5000,
                    });
                });
            }}
        >
            <Trans>Add new section</Trans>
        </Button>
    );
};
