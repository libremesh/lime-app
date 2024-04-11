import { Trans } from "@lingui/macro";

import { Button } from "components/buttons/button";

import { Row } from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/index";
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
                            let dataType = data.queryKey[2]["data_type"];
                            if (!dataType) {
                                dataType = JSON.stringify(
                                    data.queryKey,
                                    null,
                                    2
                                );
                            }
                            return (
                                <div
                                    className={"flex flex-column gap-5"}
                                    key={k}
                                >
                                    <div className={"text-3xl"}>{dataType}</div>
                                    <Button
                                        onClick={() => {
                                            // todo(kon): implement set reference state
                                            console.log("todo");
                                        }}
                                    >
                                        <Trans>
                                            Set {dataType} reference state
                                        </Trans>
                                    </Button>
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
                    {[...errors.meshWideDataErrors].map((data, k) => (
                        <div key={k}>
                            {JSON.stringify(data.queryKey, null, 2)}:{" "}
                            {data?.error?.toString()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
