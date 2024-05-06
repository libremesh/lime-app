import { i18n } from "@lingui/core";
import { Trans, defineMessage } from "@lingui/macro";

import { useBoardData } from "utils/queries";
import queryCache from "utils/queryCache";

import { useInternetStatus } from "../../lime-plugin-rx/src/rxQueries";
import MetricsBox from "./components/box";
import { InternetStatus } from "./components/internetStatus";
import { ShowPathButton } from "./components/showPathButton";
import { useAllMetrics, useGateway, usePath } from "./metricsQueries";

const style = {
    textLoading: {
        textAlign: "center",
        display: "block",
        background: "#3bc1a5",
        color: "#fff",
        padding: "5px",
        borderRadius: "4px",
        fontWeight: "bold",
    },
    textError: {
        textAlign: "center",
        display: "block",
        background: "#d55206",
        color: "#fff",
        padding: "5px",
        borderRadius: "4px",
        fontWeight: "bold",
    },
    box: {
        margin: "3px",
        padding: "10px",
        fontSize: "1.4em",
        background: "#f5f5f5",
        textAalign: "center",
        overflow: "hidden",
        height: "auto",
    },
};

export const Metrics = () => {
    const { data: boardData } = useBoardData();

    const {
        data: internet,
        isLoading: isInternetLoading,
        refetch: getInternetStatus,
    } = useInternetStatus();

    const internetError =
        !internet?.IPv4?.working ?? !internet?.IPv6?.working ?? true;

    const {
        data: path,
        isFetching: pathIsLoading,
        refetch: getPath,
    } = usePath({
        refetchOnWindowFocus: false,
        enabled: false,
    });

    const { refetch: getAllMetrics, isFetching: metricsIsLoading } =
        useAllMetrics(path?.map((station) => station.ip) ?? [], {
            refetchOnWindowFocus: false,
            enabled: false,
            initialData: [],
        });

    const {
        data: gateway,
        isFetching: gatewayIsLoading,
        isError: gatewayNotFound,
        refetch: getMetricsGateway,
    } = useGateway({
        refetchOnWindowFocus: false,
        enabled: true,
        onSuccess: getPath,
        onError: getPath,
    });

    function showLoading(loading) {
        if (!loading) {
            return;
        }

        let msg = "";
        if (gatewayIsLoading) {
            // @ts-ignore
            msg = defineMessage({
                message: "Searching gateway",
            });
        } else if (pathIsLoading) {
            // @ts-ignore
            msg = defineMessage({
                message: "Calculating network path",
            });
        } else if (metricsIsLoading) {
            // @ts-ignore
            msg = defineMessage({
                message: "Measuring links",
            });
        } else if (gatewayNotFound || internetError) {
            // @ts-ignore
            msg = defineMessage({
                message: "Load last known Internet path",
            });
        }

        // @ts-ignore
        return <p style={style.textLoading}>{i18n._(msg)}</p>;
    }

    function showError() {
        if (gatewayNotFound || internetError) {
            return (
                // @ts-ignore
                <p style={style.textError}>
                    <Trans>This your last working path to the Internet</Trans>
                </p>
            );
        }
    }

    async function refetchGetAllMetrics() {
        await getMetricsGateway();
        await getAllMetrics();
    }

    async function getGatewayMetrics() {
        getInternetStatus();
        await queryCache.fetchQuery({
            queryKey: ["lime-metrics", "get_metrics", gateway?.ip],
        });
    }

    function isGateway(hostname, gateway) {
        return hostname === gateway;
    }

    const isLoading = gatewayIsLoading || pathIsLoading || metricsIsLoading;

    return (
        <div
            className="container container-padded"
            style={{ textAlign: "center" }}
        >
            {isLoading ? showLoading(isLoading) : showError()}
            <div style={style.box}>
                <Trans>From</Trans> {boardData.hostname}
            </div>
            {path &&
                path.map((station, key) => (
                    <MetricsBox
                        key={key}
                        station={station}
                        gateway={isGateway(station.ip, gateway?.ip ?? "")}
                        loading={isLoading}
                    />
                ))}
            <div style={style.box}>
                <Trans>To Internet</Trans>
            </div>
            <InternetStatus isLoading={isInternetLoading} internet={internet} />
            <ShowPathButton
                isLoading={isLoading}
                isGateway={isGateway(boardData?.hostname, gateway?.hostname)}
                getMetricsAll={refetchGetAllMetrics}
                getGatewayMetrics={getGatewayMetrics}
            />
            <br />
        </div>
    );
};

export default Metrics;
