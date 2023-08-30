import { Trans } from "@lingui/macro";

import { FullScreenModal } from "components/Modal/FullScreenModal";
import Divider from "components/divider";

import {
    AddNewSectionBtn,
    ConfigSection,
} from "plugins/lime-plugin-mesh-wide/src/components/configPage/ConfigSection";
import { MeshStatus } from "plugins/lime-plugin-mesh-wide/src/components/configPage/MeshStatus";
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
