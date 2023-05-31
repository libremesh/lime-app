import { Trans } from "@lingui/macro";
import { useCallback } from "preact/compat";
import { to } from "react-spring";

import { Button } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import Divider from "components/divider";

import { FullScreenModal } from "containers/Modal/FullScreenModal";
import { useModal } from "containers/Modal/Modal";

import {
    EditOrDelete,
    StatusAndButton,
} from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide/src/components/configPage/OptionForm";
import {
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide/src/components/modals";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const MeshWideConfigPage = () => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});
    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    const { toggleModal: toggleEditModal, actionModal: editProperty } =
        useEditPropModal();

    return (
        <>
            <FullScreenModal
                title={<Trans>Mesh wide config</Trans>}
                isLoading={isLoading}
            >
                {meshWideConfig && (
                    <>
                        <div className={"flex flex-col gap-3"}>
                            {meshWideConfig.map((dropdown, index) => (
                                <Collapsible
                                    key={index}
                                    title={dropdown.name}
                                    initCollapsed={true}
                                    optionsComponent={
                                        <EditOrDelete
                                            onEdit={(e) => {
                                                e.stopPropagation();
                                                editProperty(
                                                    dropdown.name,
                                                    () => {
                                                        console.log(
                                                            "edit stuff"
                                                        );
                                                        toggleEditModal();
                                                    }
                                                );
                                            }}
                                            onDelete={(e) => {
                                                e.stopPropagation();
                                                deletePropModal(
                                                    dropdown.name,
                                                    () => {
                                                        console.log(
                                                            "delete stuff"
                                                        );
                                                        toggleDeleteModal();
                                                    }
                                                );
                                            }}
                                        />
                                    }
                                >
                                    {Object.entries(dropdown.options).map(
                                        ([key, value]) => (
                                            <OptionContainer
                                                key={key}
                                                keyString={key}
                                                value={value}
                                            />
                                        )
                                    )}
                                </Collapsible>
                            ))}
                            <Button
                                color={"info"}
                                // onClick={openModalWithContent}
                            >
                                <Trans>Add new section</Trans>
                            </Button>
                        </div>
                        <div className="z-50 fixed bottom-0 w-full flex flex-col items-center bg-white px-10">
                            <Divider />
                            <StatusAndButton isError={false} btn={"Update"}>
                                <div className={"flex flex-col "}>
                                    <Trans>
                                        10 of 12 node are ready to update
                                    </Trans>
                                    <br />
                                    <span className={"text-xl"}>
                                        <Trans>
                                            Last update: 30 second ago
                                        </Trans>
                                    </span>
                                </div>
                            </StatusAndButton>
                        </div>
                    </>
                )}
            </FullScreenModal>
        </>
    );
};

export default MeshWideConfigPage;
