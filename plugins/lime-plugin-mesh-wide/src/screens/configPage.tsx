import { Trans } from "@lingui/macro";

import { FullScreenModal } from "components/Modal/FullScreenModal";
import { Button } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import Divider from "components/divider";
import { useToast } from "components/toast/toastProvider";

import {
    EditOrDelete,
    StatusAndButton,
} from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide/src/components/configPage/OptionForm";
import {
    useAddNewSectionModal,
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide/src/components/modals";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const MeshWideConfigPage = () => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});
    const { toggleModal: toggleDeleteModal, actionModal: deletePropModal } =
        useDeletePropModal();
    const { toggleModal: toggleEditModal, actionModal: editPropertyModal } =
        useEditPropModal();
    const { toggleModal: toggleNewSectionModal, actionModal: addSectionModal } =
        useAddNewSectionModal();

    const { showToast, hideToast } = useToast();

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
                                                editPropertyModal(
                                                    dropdown.name,
                                                    () => {
                                                        console.log(
                                                            "edit stuff"
                                                        );
                                                        toggleEditModal();
                                                        showToast({
                                                            text: (
                                                                <>
                                                                    <Trans>
                                                                        Edited
                                                                    </Trans>
                                                                    {
                                                                        dropdown.name
                                                                    }
                                                                    {" - "}
                                                                    {new Date().toDateString()}
                                                                </>
                                                            ),
                                                            duration: 5000,
                                                            onAction: () => {
                                                                console.log(
                                                                    "Undo action"
                                                                );
                                                            },
                                                        });
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
                                                        showToast({
                                                            text: (
                                                                <>
                                                                    <Trans>
                                                                        Deleted
                                                                    </Trans>{" "}
                                                                    {
                                                                        dropdown.name
                                                                    }
                                                                    {" - "}
                                                                    {new Date().toDateString()}
                                                                </>
                                                            ),
                                                            duration: 5000,
                                                            onAction: () => {
                                                                console.log(
                                                                    "Undo action"
                                                                );
                                                            },
                                                        });
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
                                onClick={() => {
                                    addSectionModal((data) => {
                                        console.log(`Added`, data);
                                        toggleNewSectionModal();
                                        showToast({
                                            text: (
                                                <>
                                                    <Trans>
                                                        Added section{" "}
                                                    </Trans>{" "}
                                                    {data.name}
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
                        </div>
                        <div className="z-50 fixed bottom-0 w-full flex flex-col items-center bg-white px-10">
                            <Divider />
                            <StatusAndButton
                                isError={false}
                                btn={"Update"}
                                onClick={() => {
                                    showToast({
                                        text: (
                                            <>
                                                <Trans>
                                                    Updating shared state
                                                </Trans>{" "}
                                                {new Date().toDateString()}
                                            </>
                                        ),
                                        duration: 5000,
                                    });
                                }}
                            >
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
