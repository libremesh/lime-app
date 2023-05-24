import { Trans } from "@lingui/macro";

import { Collapsible } from "components/collapsible";

import { FullScreenModal } from "containers/Modal/FullScreenModal";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";
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
                                <Collapsible
                                    key={index}
                                    title={dropdown.name}
                                    initCollapsed={true}
                                >
                                    <div className="p-4">
                                        {Object.entries(dropdown.options).map(
                                            ([key, value]) => (
                                                <div key={key}>
                                                    <span>{key}: </span>
                                                    <span>{value}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Collapsible>
                            ))}
                        </div>
                        <div className="z-50 fixed bottom-0 w-full flex flex-col items-center bg-white px-10">
                            <div class="flex-grow border-t-2 border-gray-300 w-11/12" />
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
