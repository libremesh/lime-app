import { Trans } from "@lingui/macro";
import { ComponentType, VNode } from "preact";
import { useState } from "preact/hooks";

import Loading from "components/loading";
import { ErrorState } from "components/mesh-wide-wizard/ErrorState";
import Tabs from "components/tabs";

interface WrapperProps {
    isError?: boolean;
    error?: unknown;
    isLoading?: boolean;
    banner?: ComponentType;
    statusPage: ComponentType;
    nodesList: ComponentType;
    footer?: ComponentType;
}

const WizardWrapper = ({
    isError,
    error,
    isLoading,
    banner: Banner,
    statusPage: StatusPage,
    nodesList: NodesList,
    footer: Footer,
}: WrapperProps) => {
    const [showNodeList, setShowNodeList] = useState(0);

    if (isError) {
        return (
            <CenterFlex>
                <ErrorState
                    msg={
                        <div className={"flex flex-col gap-2 mt-4"}>
                            <Trans>Errors found getting info!</Trans>
                            {error && <div>{error.toString()}</div>}
                        </div>
                    }
                />
            </CenterFlex>
        );
    }

    if (isLoading) {
        return (
            <CenterFlex>
                <Loading />
            </CenterFlex>
        );
    }

    const tabs = [
        {
            key: 0,
            repr: (
                <div className={"flex"}>
                    <Trans>Show state</Trans>
                </div>
            ),
        },
        {
            key: 1,
            repr: (
                <div className={"flex"}>
                    <Trans>Show nodes</Trans>
                </div>
            ),
        },
    ];

    return (
        <div className={"flex flex-col h-full w-full max-h-full"}>
            {Banner && <Banner />}
            <div className={"flex-grow flex flex-col max-h-full w-full"}>
                <Tabs
                    tabs={tabs}
                    current={showNodeList}
                    onChange={setShowNodeList}
                />
                <div className="flex-grow overflow-auto">
                    {showNodeList === 0 && (
                        <CenterFlex>
                            <StatusPage />
                        </CenterFlex>
                    )}
                    {showNodeList === 1 && <NodesList />}
                </div>
            </div>
            {Footer && <Footer />}
        </div>
    );
};

export const CenterFlex = ({ children }: { children: VNode }) => {
    return (
        <div className="flex-grow flex flex-col justify-center content-center text-center h-full max-h-full">
            {children}
        </div>
    );
};

export default WizardWrapper;
