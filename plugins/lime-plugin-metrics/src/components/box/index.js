import { Trans } from "@lingui/macro";
import colorScale from "simple-color-scale";

import Loading from "components/loading";

import { useCommunitySettings } from "utils/queries";

import { useMetrics } from "../../metricsQueries";

const style = {
    box: {
        margin: "3px",
        padding: "10px",
        background: "#f5f5f5",
        textAalign: "center",
        transition: "height 04s ease",
        overflow: "hidden",
        height: "auto",
        cursor: "pointer",
    },
    loading: {
        margin: "3px",
        padding: "10px",
        background: "#f5f5f5",
        textAalign: "center",
        overflow: "hidden",
        height: "auto",
        transition: "height 04s ease",
    },
    line: {
        margin: "0 auto",
        height: "8px",
        backgroundColor: "#ccc",
    },
    gateway: {
        marginButtom: "0px",
        marginTop: "-9px",
        fontSize: "2.4rem",
        lineHeight: "1.35",
    },
};

const Box = ({ station, gateway, loading }) => {
    const {
        data: metrics,
        isFetching: metricsIsLoading,
        isError,
        refetch: getMetrics,
    } = useMetrics(station.ip, {
        refetchOnWindowFocus: false,
        enabled: false,
    });

    const { data: settings } = useCommunitySettings();

    function barStyle(loss) {
        return Object.assign({}, style.line, {
            width: `${(
                (metrics.bandwidth * 100) / settings.good_bandwidth || 3
            ).toString()}%`,
            maxWidth: "100%",
            backgroundColor: colorScale.getColor(loss),
        });
    }

    function onClick() {
        getMetrics();
    }

    // colorScale.setConfig({
    // 	outputStart: 1,
    // 	outputEnd: 100,
    // 	inputStart: 0,
    // 	inputEnd: settings.acceptable_loss
    // });
    const stationName = station.hostname === "" ? station.ip : station.hostname;

    const loadingMetrics = metricsIsLoading;

    return (
        <div
            style={loadingMetrics && !loading ? style.loading : style.box}
            onClick={onClick}
        >
            <span>
                <b>
                    {gateway === true
                        ? `${stationName} (Gateway)`
                        : stationName}
                    {(metrics !== undefined &&
                        Number(metrics.bandwidth || "0") === 0 &&
                        metrics.loss) ||
                    isError ? (
                        <b>
                            {" "}
                            (<Trans>Error</Trans>)
                        </b>
                    ) : (
                        false
                    )}
                </b>
                <br />
            </span>
            {loadingMetrics ? (
                <Loading />
            ) : metrics !== undefined && metrics.bandwidth ? (
                <div>
                    {metrics.bandwidth} Mbps /{" "}
                    <span>
                        <Trans>Packet loss</Trans>
                    </span>{" "}
                    {metrics.loss}%<br />
                    <div style={barStyle(metrics.loss)} />
                </div>
            ) : (
                false
            )}
        </div>
    );
};

export default Box;
