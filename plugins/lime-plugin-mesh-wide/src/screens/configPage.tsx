import { Trans } from "@lingui/macro";
import { ComponentChild } from "preact";
import { useState } from "preact/hooks";
import { FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

import { Button } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import Divider from "components/divider";
import { BinIcon } from "components/icons/bin";
import { EditIcon } from "components/icons/edit";
import InputField from "components/inputs/InputField";

import { FullScreenModal } from "containers/Modal/FullScreenModal";

import {
    EditOrDelete,
    StatusAndButton,
} from "plugins/lime-plugin-mesh-wide/src/components/Components";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide/src/components/configPage/OptionForm";
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
                                    optionsComponent={
                                        <EditOrDelete
                                            onEdit={() => {}}
                                            onDelete={() => {}}
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
                            <Button color={"info"}>
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
