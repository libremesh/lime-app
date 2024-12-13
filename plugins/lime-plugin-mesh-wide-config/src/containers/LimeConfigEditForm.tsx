import { Trans } from "@lingui/macro";
import { useEffect, useRef, useState } from "preact/hooks";
import { FormProvider, useForm } from "react-hook-form";

import {
    FullScreenModal,
    IFullScreenModalProps,
} from "components/Modal/FullScreenModal";

import { AddNewConfigSection } from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";
import { FormFooter } from "plugins/lime-plugin-mesh-wide-config/src/components/FormFooter";
import { FormSection } from "plugins/lime-plugin-mesh-wide-config/src/components/FormSection";
import { useCommunityConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

import { isEmpty } from "utils/utils";

const LimeConfigEditForm = (props: Partial<IFullScreenModalProps>) => {
    const { data: meshWideConfig, isLoading } = useCommunityConfig({});

    return (
        <FullScreenModal
            title={<Trans>Mesh wide config</Trans>}
            isLoading={isLoading}
            {...props}
        >
            {!!meshWideConfig && (
                <EditConfigForm
                    meshWideConfig={meshWideConfig}
                    onClose={props.onClose}
                />
            )}
        </FullScreenModal>
    );
};

const EditConfigForm = ({
    meshWideConfig,
    onClose,
}: {
    meshWideConfig: IMeshWideConfig;
} & Pick<IFullScreenModalProps, "onClose">) => {
    const [isDirty, setIsDirty] = useState(false);
    const fMethods = useForm<IMeshWideConfig>({
        defaultValues: meshWideConfig,
    });
    const defaultValuesRef = useRef(meshWideConfig);

    const formData = fMethods.watch();

    // compare values on each change
    useEffect(() => {
        setIsDirty(
            JSON.stringify(formData) !==
                JSON.stringify(defaultValuesRef.current)
        );
    }, [formData]);

    return (
        <FormProvider {...fMethods}>
            <form className="flex flex-col w-full h-full max-h-full grow justify-between mb-0">
                <div className="flex flex-col grow overflow-y-auto max-h-full gap-3 px-2 mb-4">
                    {Object.entries(formData).map(
                        ([title, dropdown], index) => (
                            <FormSection
                                key={index}
                                title={title}
                                dropdown={dropdown}
                            />
                        )
                    )}
                    {!formData ||
                        (isEmpty(formData) && (
                            <Trans>
                                Your Lime Community file seems empty! Please add
                                some configurations.
                            </Trans>
                        ))}
                    <AddNewConfigSection />
                </div>
                <FormFooter onClose={onClose} isDirty={isDirty} />
            </form>
        </FormProvider>
    );
};

export default LimeConfigEditForm;
