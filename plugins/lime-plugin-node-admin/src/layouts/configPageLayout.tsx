import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";
import { route } from "preact-router";

import Loading from "components/loading";
import Toast from "components/toast";

import { useTimeoutToggle } from "../hooks/timeoutToggle";

type ConfigPageLayoutProps = {
    title: ComponentChildren;
    children: ComponentChildren;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    backUrl?: string;
};

const ConfigPageLayout = ({
    title,
    isLoading,
    isSuccess,
    isError,
    children,
    backUrl = "/nodeadmin",
}: ConfigPageLayoutProps) => {
    const showSuccess = useTimeoutToggle(isSuccess, 1500);
    const showError = useTimeoutToggle(isError, 1500);

    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container container-padded d-flex flex-column flex-grow-1">
            <div className="d-flex">
                <div
                    className="clickable"
                    aria-label="back"
                    onClick={() => route(backUrl)}
                >
                    ❮
                </div>
                <h4 className="flex-grow-1 text-center">{title}</h4>
            </div>
            <div className="d-flex flex-grow-1 flex-column">{children}</div>
            {showSuccess && (
                <Toast type="success" text={<Trans>Saved</Trans>} />
            )}
            {showError && (
                <Toast type="error" text={<Trans>Error: Not Saved</Trans>} />
            )}
        </div>
    );
};

export default ConfigPageLayout;
