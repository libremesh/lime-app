import { Trans } from "@lingui/macro";

import {
    FullScreenModal,
    IFullScreenModalProps,
} from "components/Modal/FullScreenModal";

import {
    AddNewSectionBtn,
    ConfigSection,
} from "plugins/lime-plugin-mesh-wide-config/src/components/ConfigSection";
import { MeshStatus } from "plugins/lime-plugin-mesh-wide-config/src/components/MeshStatus";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";

const EditConfiguration = (props: Partial<IFullScreenModalProps>) => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});

    return (
        <FullScreenModal
            title={<Trans>Mesh wide config</Trans>}
            isLoading={isLoading}
            {...props}
        >
            {meshWideConfig && (
                <>
                    <div className={"flex flex-col gap-3"}>
                        {Object.entries(meshWideConfig).map(
                            ([title, dropdown], index) => (
                                <ConfigSection
                                    key={index}
                                    title={title}
                                    dropdown={dropdown}
                                />
                            )
                        )}
                        <AddNewSectionBtn />
                    </div>
                    <MeshStatus />
                </>
            )}
        </FullScreenModal>
    );
};

export default EditConfiguration;
