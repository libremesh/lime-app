import { i18n } from "@lingui/core";
import { Trans, defineMessage } from "@lingui/macro";
import { useEffect } from "preact/hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import colorScale from "simple-color-scale";

import { Box } from "components/box";

import { useBoardData, useCommunitySettings } from "utils/queries";

import { getNodeData } from "../../lime-plugin-rx/src/rxSelectors";
import MetricsBox from "./components/box";
import {
    getInternetStatus,
    getMetrics,
    getMetricsAll,
    getMetricsGateway,
    getNodeMetrics,
} from "./metricsActions";

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

export const Metrics = ({
    getNodeMetrics,
    getMetricsAll,
    getMetricsGateway,
    getInternetStatus,
    metrics,
    node,
}) => {
    const { data: boardData } = useBoardData();
    const { data: communitySettings } = useCommunitySettings();
    function clickGateway(gateway) {
        return () => {
            getMetricsGateway(gateway);
            getInternetStatus();
        };
    }

    function showButton(loading) {
        if (!loading) {
            return !isGateway(boardData.hostname, metrics.gateway) ? (
                <div class="row">
                    <br />
                    <button
                        class="button block u-full-width"
                        type="submit"
                        onClick={clickGateway(metrics.gateway)}
                    >
                        <Trans>Only gateway</Trans>
                    </button>
                    <button
                        class="button block u-full-width"
                        type="submit"
                        onClick={getMetricsAll}
                    >
                        <Trans>Full path metrics</Trans>
                    </button>
                </div>
            ) : (
                <div class="row">
                    <br />
                    <p>
                        <b>
                            <Trans>This node is the gateway</Trans>
                        </b>
                        <br />
                        <Trans>
                            You don't go through any paths to get here.
                        </Trans>
                    </p>
                </div>
            );
        }
        return <div />;
    }

    function showLoading(loading) {
        if (!loading) {
            return;
        }

        const loadingMessages = {
            metrics_status_gateway: defineMessage({
                message: "Searching gateway",
            }),
            metrics_status_path: defineMessage({
                message: "Calculating network path",
            }),
            metrics_status_stations: defineMessage({
                message: "Measuring links",
            }),
            load_last_known_internet_path: defineMessage({
                message: "Load last known Internet path",
            }),
        };

        return (
            <p style={style.textLoading}>
                {i18n._(loadingMessages[metrics.status])}
            </p>
        );
    }

    function showInternetStatus(loading, node) {
        if (!loading) {
            return (
                <Box
                    title={<Trans>Internet connection</Trans>}
                    style={{ marginTop: "15px" }}
                >
                    <span>
                        <b>
                            {" "}
                            {node.internet.IPv4.working === true ? (
                                <span style={{ color: "green" }}>✔</span>
                            ) : (
                                <span style={{ color: "red" }}>✘</span>
                            )}{" "}
                            IPv4{" "}
                        </b>
                        <b>
                            {" "}
                            {node.internet.IPv6.working === true ? (
                                <span style={{ color: "green" }}>✔</span>
                            ) : (
                                <span style={{ color: "red" }}>✘</span>
                            )}{" "}
                            IPv6{" "}
                        </b>
                        <b>
                            {" "}
                            {node.internet.DNS.working === true ? (
                                <span style={{ color: "green" }}>✔</span>
                            ) : (
                                <span style={{ color: "red" }}>✘</span>
                            )}{" "}
                            DNS{" "}
                        </b>
                    </span>
                </Box>
            );
        }
        return <div />;
    }

    function showError(error) {
        if (error !== null) {
            return (
                <p style={style.textError}>
                    <Trans>This your last working path to the Internet</Trans>
                </p>
            );
        }
        return;
    }

    function isGateway(hostname, gateway) {
        return hostname === gateway;
    }

    useEffect(() => {
        if (!boardData.hostname) return;
        getMetricsGateway(boardData.hostname);
        getInternetStatus();
        colorScale.setConfig({
            outputStart: 1,
            outputEnd: 100,
            inputStart: 0,
            inputEnd: 30,
        });
        return () => {};
    }, [boardData, getMetricsGateway, getInternetStatus]);

    return (
        <div class="container container-padded" style={{ textAlign: "center" }}>
            {metrics.loading
                ? showLoading(metrics.loading)
                : metrics.error.map((x) => showError(x))}
            <div style={style.box}>
                <Trans>From</Trans> {boardData.hostname}
            </div>
            {metrics.metrics.map((station, key) => (
                <MetricsBox
                    key={key}
                    settings={communitySettings}
                    station={station}
                    gateway={isGateway(station.host.hostname, metrics.gateway)}
                    loading={
                        metrics.loading &&
                        station.loading &&
                        (key === 0 ||
                            metrics.metrics[key - 1].loading === false)
                    }
                    click={getNodeMetrics}
                />
            ))}
            <div style={style.box}>
                <Trans>To Internet</Trans>
            </div>
            {showInternetStatus(metrics.loading, node)}
            {showButton(metrics.loading)}
            <br />
        </div>
    );
};

const mapStateToProps = (state) => ({
    metrics: state.metrics,
    node: getNodeData(state),
});

const mapDispatchToProps = (dispatch) => ({
    getMetrics: bindActionCreators(getMetrics, dispatch),
    getMetricsGateway: bindActionCreators(getMetricsGateway, dispatch),
    getMetricsAll: bindActionCreators(getMetricsAll, dispatch),
    getInternetStatus: bindActionCreators(getInternetStatus, dispatch),
    getNodeMetrics: bindActionCreators(getNodeMetrics, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
