import { Trans } from "@lingui/macro";

import Loading from "components/loading";

import { useCheckInternet } from "utils/queries";

import { useHotspotData } from "../hotspotQueries";

const TestBox = ({
    title,
    testPassed,
    isFetching,
    onClick,
    testId,
    children,
}) => {
    const bgClasses = {
        true: "bg-success",
        false: "bg-error",
    };
    const bgClass = bgClasses[testPassed] || "bg-gray";
    return (
        <div
            className={`flex-grow-1 d-flex-column ${bgClass} p-05-1 rounded cursor-pointer`}
            onClick={onClick}
            data-testid={testId}
        >
            <div className="d-flex">
                <div className="flex-grow-1"> {title} </div>
                <div>⟳</div>
            </div>
            <div className="d-flex flex-grow-1 ">
                {isFetching ? (
                    <div className="flex-grow-1 justify-content-center">
                        <Loading
                            color={bgClass !== "bg-gray" ? "white" : null}
                        />
                    </div>
                ) : (
                    <div className="d-flex flex-grow-1">{children}</div>
                )}
            </div>
        </div>
    );
};

export const ConnectionToThePhone = () => {
    const { data, isFetching, refetch } = useHotspotData();
    return (
        <TestBox
            title={<Trans>Connection to the cellphone</Trans>}
            isFetching={isFetching}
            testPassed={data?.connected}
            onClick={refetch}
            testId="hotspot-phone-test"
        >
            {data?.connected === true && (
                <div className="d-flex flex-grow-1 align-items-baseline">
                    <div>
                        <Trans>Connected</Trans>
                    </div>
                    <div className="ml-auto">
                        <span className="font-size-2">{data.signal}</span>
                        <span>dBm</span>
                    </div>
                </div>
            )}
            {data?.connected === false && (
                <div className="d-flex">
                    <div>
                        <Trans>Not Connected</Trans>
                    </div>
                </div>
            )}
        </TestBox>
    );
};

export const ConnectionToTheInternet = () => {
    const { data, isFetching, refetch } = useCheckInternet();
    return (
        <TestBox
            title={<Trans>Connection to the internet</Trans>}
            isFetching={isFetching}
            testPassed={data?.connected}
            onClick={refetch}
            testId="hotspot-internet-test"
        >
            {data?.connected === true && (
                <div className="d-flex">
                    <div>
                        <Trans>Connected</Trans>
                    </div>
                </div>
            )}
            {data?.connected === false && (
                <div className="d-flex">
                    <div>
                        <Trans>Not Connected</Trans>
                    </div>
                </div>
            )}
        </TestBox>
    );
};
