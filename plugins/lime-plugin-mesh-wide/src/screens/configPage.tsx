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
import {
    AddNewSectionBtn,
    ConfigSection,
    SectionEditOrDelete,
} from "plugins/lime-plugin-mesh-wide/src/components/configPage/ConfigSection";
import { MeshStatus } from "plugins/lime-plugin-mesh-wide/src/components/configPage/MeshStatus";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide/src/components/configPage/OptionForm";
import {
    useAddNewSectionModal,
    useDeletePropModal,
    useEditPropModal,
} from "plugins/lime-plugin-mesh-wide/src/components/modals";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const MeshWideConfigPage = () => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});

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
                                <ConfigSection
                                    key={index}
                                    dropdown={dropdown}
                                />
                            ))}
                            <AddNewSectionBtn />
                        </div>
                        <div className="z-50 fixed bottom-0 w-full flex flex-col bg-white px-2">
                            <Divider />
                            <MeshStatus />
                        </div>
                    </>
                )}
            </FullScreenModal>
        </>
    );
};

export default MeshWideConfigPage;
