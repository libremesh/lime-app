import { Trans } from "@lingui/macro";
import React from "react";

import { FullScreenModal } from "components/Modal/FullScreenModal";

import {
    AddNewSectionBtn,
    ConfigSection,
} from "plugins/lime-plugin-mesh-wide-config/src/components/ConfigSection";
import { MeshStatus } from "plugins/lime-plugin-mesh-wide-config/src/components/MeshStatus";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";

const MeshConfigPage = () => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});

    return (
        <FullScreenModal
            title={<Trans>Mesh wide config</Trans>}
            isLoading={isLoading}
        >
            {meshWideConfig && (
                <>
                    <div className={"flex flex-col gap-3"}>
                        {meshWideConfig.map((dropdown, index) => (
                            <ConfigSection key={index} dropdown={dropdown} />
                        ))}
                        <AddNewSectionBtn />
                    </div>
                    <MeshStatus />
                </>
            )}
        </FullScreenModal>
    );
};

export default MeshConfigPage;
