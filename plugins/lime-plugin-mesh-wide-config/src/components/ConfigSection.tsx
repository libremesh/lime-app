import { Trans } from "@lingui/macro";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Button } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide-config/src/components/OptionForm";
import {
    AddNewSectionFormProps,
    AddNewSectionModal,
    DeletePropModal,
    EditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { IMeshWideSection } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

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
    const {
        open: isEditOpen,
        onOpen: openEdit,
        onClose: onCloseEdit,
    } = useDisclosure();
    const {
        open: isDeleteModalOpen,
        onOpen: openDeleteModal,
        onClose: onCloseDeleteModal,
    } = useDisclosure();
    const { showToast } = useToast();

    const onEdit = async () => {
        console.log("edit stuff");
        onCloseEdit();
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
    };

    const onDelete = async () => {
        console.log("delete stuff");
        onCloseDeleteModal();
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
    };

    return (
        <>
            <EditOrDelete onEdit={openEdit} onDelete={openDeleteModal} />
            <EditPropModal
                prop={name}
                isOpen={isEditOpen}
                onSuccess={onEdit}
                onClose={onCloseEdit}
            />
            <DeletePropModal
                prop={name}
                isOpen={isDeleteModalOpen}
                onDelete={onDelete}
                onClose={onCloseDeleteModal}
            />
        </>
    );
};

export const AddNewSectionBtn = () => {
    const { open, onOpen, onClose } = useDisclosure();
    const { showToast } = useToast();

    const onSuccess = (data: AddNewSectionFormProps) => {
        console.log(`Added`, data);
        onClose();
        showToast({
            text: (
                <Trans>
                    Added section {data.name} - {new Date().toDateString()}
                </Trans>
            ),
        });
    };
    return (
        <>
            <Button color={"info"} onClick={onOpen}>
                <Trans>Add new section</Trans>
            </Button>
            <AddNewSectionModal
                isOpen={open}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </>
    );
};
