import { i18n } from "@lingui/core";
import { Trans, defineMessage } from "@lingui/macro";
import { useState } from "preact/hooks";

import { useBoardData } from "utils/queries";
import queryCache from "utils/queryCache";

import { useInternetStatus } from "../../lime-plugin-rx/src/rxQueries";
import MetricsBox from "./components/box";
import { InternetStatus } from "./components/internetStatus";
import { ShowPathButton } from "./components/showPathButton";
import { useGateway, usePath } from "./metricsQueries";

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
    const [measuresAreLoading, setMeasuresAreLoading] = useState([]);

    const updateMeasureIsLoading = (ip, isLoading) => {
        if (measuresAreLoading.length > 0) {
            const next = measuresAreLoading.map((station) => {
                if (station.ip === ip) {
                    return {
                        ...station,
                        isLoading,
                    };
                }
                return station;
            });
            setMeasuresAreLoading(next);
        }
    };

    const isAMeasureLoading = () => {
        for (const m of measuresAreLoading) {
            if (m.isLoading === true) return true;
        }
        return false;
    };

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
        onSuccess: (path) => {
            setMeasuresAreLoading(
                path?.map((station) => ({
                    ip: station.ip,
                    isLoading: true,
                }))
            );
        },
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
            msg = defineMessage({
                message: "Searching gateway",
            });
        } else if (pathIsLoading) {
            msg = defineMessage({
                message: "Calculating network path",
            });
        } else if (isAMeasureLoading()) {
            msg = defineMessage({
                message: "Measuring links",
            });
        } else if (gatewayNotFound || internetError) {
            msg = defineMessage({
                message: "Load last known Internet path",
            });
        }

        return <p style={style.textLoading}>{i18n._(msg)}</p>;
    }

    function showError() {
        if (gatewayNotFound || internetError) {
            return (
                <p style={style.textError}>
                    <Trans>This your last working path to the Internet</Trans>
                </p>
            );
        }
    }

    async function getAllMetrics() {
        await getMetricsGateway();
        await queryCache.invalidateQueries({
            queryKey: ["lime-metrics", "get_metrics"],
        });
    }

    async function getGatewayMetrics() {
        getInternetStatus();
        await queryCache.invalidateQueries({
            queryKey: ["lime-metrics", "get_metrics", gateway?.ip],
        });
    }

    function isGateway(hostname, gateway) {
        return hostname === gateway;
    }

    const isLoading = gatewayIsLoading || pathIsLoading || isAMeasureLoading();

    return (
        <div class="container container-padded" style={{ textAlign: "center" }}>
            {isLoading ? showLoading(isLoading) : showError()}
            <div style={style.box}>
                <Trans>From</Trans> {boardData.hostname}
            </div>
            {path &&
                path.map((station, key) => (
                    <MetricsBox
                        key={key}
                        station={station}
                        gateway={isGateway(station.ip, gateway.ip)}
                        loading={isLoading}
                        updateImLoading={updateMeasureIsLoading}
                    />
                ))}
            <div style={style.box}>
                <Trans>To Internet</Trans>
            </div>
            <InternetStatus isLoading={isInternetLoading} internet={internet} />
            <ShowPathButton
                isLoading={isLoading}
                isGateway={isGateway(boardData?.hostname, gateway?.hostname)}
                getMetricsAll={getAllMetrics}
                getGatewayMetrics={getGatewayMetrics}
            />
            <br />
        </div>
    );
};

export default Metrics;
