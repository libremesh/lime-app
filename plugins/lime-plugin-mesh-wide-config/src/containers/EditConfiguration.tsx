import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
} from "react-hook-form";

import {
    FullScreenModal,
    IFullScreenModalProps,
} from "components/Modal/FullScreenModal";

import {
    AddNewElementBtn,
    ConfigSection,
} from "plugins/lime-plugin-mesh-wide-config/src/components/ConfigSection";
import { MeshStatus } from "plugins/lime-plugin-mesh-wide-config/src/components/MeshStatus";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

const EditConfiguration = (props: Partial<IFullScreenModalProps>) => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});

    return (
        <FullScreenModal
            title={<Trans>Mesh wide config</Trans>}
            isLoading={isLoading}
            {...props}
        >
            {!!meshWideConfig && (
                // <DynamicForm meshWideConfig={meshWideConfig} />
                <EditConfigurationInner meshWideConfig={meshWideConfig} />
            )}
        </FullScreenModal>
    );
};

const EditConfigurationInner = ({
    meshWideConfig,
}: {
    meshWideConfig: IMeshWideConfig;
}) => {
    const fMethods = useForm<IMeshWideConfig>({
        defaultValues: meshWideConfig,
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };
    return (
        <FormProvider {...fMethods}>
            <form onSubmit={fMethods.handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-3"}>
                    <DrawForm />
                    <AddNewElementBtn />
                </div>
                <MeshStatus />
            </form>
        </FormProvider>
    );
};

const DrawForm = () => {
    const { watch } = useFormContext<IMeshWideConfig>();
    const formData = watch();

    console.log("formData", formData);
    return (
        <>
            {Object.entries(formData).map(([title, dropdown], index) => (
                <ConfigSection key={index} title={title} dropdown={dropdown} />
            ))}
        </>
    );
};

export default EditConfiguration;
