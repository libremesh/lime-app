import { Trans } from "@lingui/macro";
import { useFormContext } from "react-hook-form";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import { AddNewConfigSection } from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide-config/src/components/FormOption";
import {
    DeletePropModal,
    EditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { IMeshWideSection } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const FormSection = ({
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
            <AddNewConfigSection sectionName={title} />
        </Collapsible>
    );
};

export const SectionEditOrDelete = ({ name }) => {
    const {
        open: isDeleteModalOpen,
        onOpen: openDeleteModal,
        onClose: onCloseDeleteModal,
    } = useDisclosure();
    const { showToast } = useToast();
    const { watch, setValue, reset } = useFormContext();

    const onDelete = async () => {
        const form = watch();
        const newForm = { ...form };
        delete newForm[name];
        reset(newForm);
        onCloseDeleteModal();
        showToast({
            text: (
                <Trans>
                    Deleted {name} - {new Date().toDateString()}
                </Trans>
            ),
            onAction: () => {
                reset(form);
            },
        });
    };

    return (
        <>
            <EditOrDelete onDelete={openDeleteModal} />
            <DeletePropModal
                prop={name}
                isOpen={isDeleteModalOpen}
                onDelete={onDelete}
                onClose={onCloseDeleteModal}
            />
        </>
    );
};
