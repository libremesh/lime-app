import { Trans } from "@lingui/macro";

import { SharedStateDataTypeKeys } from "components/shared-state/SharedStateTypes";

import { Row } from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/index";
import { dataTypeNameMapping } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import { ErrorsDetails } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const ShowErrorsDetail = ({ errors }: { errors: ErrorsDetails }) => {
    return (
        <div className={"flex flex-col gap-6"}>
            {errors.invalidNodes.size > 0 && (
                <div>
                    <Row>
                        <div className={"text-3xl"}>
                            <Trans>Invalid Nodes</Trans>
                        </div>
                    </Row>
                    <Row>
                        <Trans>
                            The following nodes are not located or have not
                            reference state. Please, set their location to see
                            them on the map:
                        </Trans>
                    </Row>
                    {[...errors.invalidNodes].map((name, k) => (
                        <div key={k}>{name}</div>
                    ))}
                </div>
            )}
            {errors.dataNotSetErrors.length > 0 && (
                <div>
                    <Row>
                        <div className={"text-3xl"}>
                            <Trans>Reference State is not set</Trans>
                        </div>
                    </Row>
                    <Row>
                        <Trans>
                            The following shared states packages have not data
                            set
                        </Trans>
                    </Row>
                    <div className={"flex flex-column gap-5"}>
                        {[...errors.dataNotSetErrors].map((data, k) => {
                            const dataType = data.queryKey[2]["data_type"];
                            const nodes = data.nodeNames.join(", ");
                            return (
                                <div key={k} className={"flex flex-row gap-5"}>
                                    <div className={"text-2xl font-bold"}>
                                        {dataTypeNameMapping(dataType)}
                                    </div>
                                    {nodes && (
                                        <Trans>
                                            for the following nodes: {nodes}
                                        </Trans>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {errors.meshWideDataErrors.length > 0 && (
                <div>
                    <Row>
                        <div className={"text-3xl"}>
                            <Trans>Shared state error</Trans>
                        </div>
                    </Row>
                    <Row>
                        <Trans>
                            The following shared states packages have errors.
                            Are they installed or properly initialized?
                        </Trans>
                    </Row>
                    {[...errors.meshWideDataErrors].map((data, k) => {
                        const queryKey = JSON.stringify(
                            data.queryKey,
                            null,
                            2
                        ) as SharedStateDataTypeKeys;
                        return (
                            <div key={k}>
                                {dataTypeNameMapping(queryKey)}:{" "}
                                {data?.error?.toString()}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
