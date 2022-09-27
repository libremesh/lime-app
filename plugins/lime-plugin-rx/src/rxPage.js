import { Trans, plural } from "@lingui/macro";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Box } from "components/box";

import { useBatHost, useBoardData } from "utils/queries";

import { getNodeStatus, getNodeStatusTimer, stopTimer } from "./rxActions";
import { getNodeData, isLoading } from "./rxSelectors";

function stripIface(hostIface) {
    return hostIface.split("_wlan")[0].replace("_", "-");
}

const toHHMMSS = (seconds, plus) => {
    let secNum = parseInt(seconds, 10) + plus;
    let days = Math.floor(secNum / 86400);
    let hours = Math.floor(secNum / 3600) % 24;
    let mins = Math.floor(secNum / 60) % 60;
    let secs = secNum % 60;
    const daysText = days
        ? plural(days, { one: "# day", other: "# days" })
        : null;
    const hoursText = hours
        ? plural(hours, { one: "# hour", other: "# hours" })
        : null;
    const minsText = mins
        ? plural(mins, { one: "# minute", other: "# minutes" })
        : null;
    const secsText = secs
        ? plural(secs, { one: "# second", other: "# seconds" })
        : null;
    const allTexts = [daysText, hoursText, minsText, secsText];
    return allTexts.filter((x) => x !== null).join(", ");
};

const SystemBox = ({ uptime, firmwareVersion, boardModel }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(async () => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    let actualUptime = "?";
    if (typeof uptime !== "undefined") {
        actualUptime = toHHMMSS(uptime, count);
    }
    actualUptime = toHHMMSS(uptime, count);
    return (
        <Box title={<Trans>System</Trans>}>
            <span>
                <b>
                    <Trans>Uptime</Trans>
                </b>{" "}
                {actualUptime} <br />
            </span>
            <span>
                <b>
                    <Trans>Device</Trans>
                </b>{" "}
                {boardModel}
                <br />
            </span>
            <span style={{ whiteSpace: "nowrap" }}>
                <b>
                    <Trans>Firmware</Trans>{" "}
                </b>
                {firmwareVersion}
                <br />
            </span>
        </Box>
    );
};

const MostActiveBox = ({ node, changeNode }) => {
    const { data: bathost } = useBatHost(
        node.most_active && node.most_active.station_mac,
        node.most_active && node.most_active.iface,
        { enabled: node.most_active }
    );

    if (node.most_active === undefined) {
        return <span />;
    }

    return (
        <Box title={<Trans>Most Active</Trans>}>
            <span style={{ float: "right", fontSize: "2.7em" }}>
                {node.most_active.signal}
            </span>
            {bathost && bathost.hostname ? (
                <a
                    style={{ fontSize: "1.4em" }}
                    onClick={() => changeNode(bathost.hostname)}
                >
                    <b>{stripIface(bathost.hostname)}</b>
                </a>
            ) : (
                <span class="withLoadingEllipsis">
                    <Trans>Fetching name</Trans>
                </span>
            )}
            <br />
            <b>
                <Trans>Interface</Trans>{" "}
            </b>
            {node.most_active.iface.split("-")[0]}
            <br />
            <b>
                <Trans>Traffic</Trans>{" "}
            </b>{" "}
            {Math.round(
                (node.most_active.rx_bytes + node.most_active.tx_bytes) /
                    1024 /
                    1024
            )}
            MB
            <div style={{ clear: "both" }} />
        </Box>
    );
};

export const Page = ({
    getNodeStatusTimer,
    getNodeStatus,
    stopTimer,
    isLoading,
    nodeData,
}) => {
    const { data: boardData, isLoading: loadingBoardData } = useBoardData();

    function loading(option, nodeData) {
        if (!option && !loadingBoardData) {
            return nodeStatus(nodeData);
        }
        return (
            <h4 style={{ textAlign: "center" }}>
                <Trans>Loading node status...</Trans>
            </h4>
        );
    }

    function _changeNode(hostname) {
        window.location.href = `http://${hostname}`;
    }

    function nodeStatus(node) {
        if (node.hostname) {
            return (
                <div>
                    <MostActiveBox node={node} changeNode={_changeNode} />

                    <SystemBox
                        uptime={node.uptime}
                        firmwareVersion={boardData.release.description}
                        boardModel={boardData.model}
                    />

                    <Box title={<Trans>Internet connection</Trans>}>
                        <span>
                            <b>
                                {" "}
                                {node.internet.IPv4.working === true ? (
                                    <span style={{ color: "#38927f" }}>✔</span>
                                ) : (
                                    <span style={{ color: "#b11" }}>✘</span>
                                )}{" "}
                                IPv4{" "}
                            </b>
                            <b>
                                {" "}
                                {node.internet.IPv6.working === true ? (
                                    <span style={{ color: "#38927f" }}>✔</span>
                                ) : (
                                    <span style={{ color: "#b11" }}>✘</span>
                                )}{" "}
                                IPv6{" "}
                            </b>
                            <b>
                                {" "}
                                {node.internet.DNS.working === true ? (
                                    <span style={{ color: "#38927f" }}>✔</span>
                                ) : (
                                    <span style={{ color: "#b11" }}>✘</span>
                                )}{" "}
                                DNS{" "}
                            </b>
                        </span>
                    </Box>

                    <Box title={<Trans>IP Addresses</Trans>}>
                        {node.ips.map((ip, key) => (
                            <span
                                key={key}
                                style={key === 0 ? { fontSize: "1.4em" } : {}}
                            >
                                <b>IPv{ip.version} </b> {ip.address}
                                <br />
                            </span>
                        ))}
                    </Box>
                </div>
            );
        }
    }

    useEffect(() => {
        getNodeStatusTimer();
        getNodeStatus();
        return stopTimer;
    }, [getNodeStatusTimer, getNodeStatus, stopTimer]);

    return (
        <div className="container container-padded">
            {loading(isLoading, nodeData)}
        </div>
    );
};

export const mapStateToProps = (state) => ({
    nodeData: getNodeData(state),
    isLoading: isLoading(state),
});

export const mapDispatchToProps = (dispatch) => ({
    getNodeStatusTimer: bindActionCreators(getNodeStatusTimer, dispatch),
    getNodeStatus: bindActionCreators(getNodeStatus, dispatch),
    stopTimer: bindActionCreators(stopTimer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
