import { Trans } from "@lingui/macro";
import { useEffect } from "preact/hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getGroundRouting } from "./groundRoutingActions";
import "./style.less";

const Page = ({ getGroundRouting, loading, configuration }) => {
    useEffect(() => {
        getGroundRouting();
    }, [getGroundRouting]);

    const preStyle = {
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        padding: "15px",
        border: "1px solid #ccc",
    };

    return (
        <div className="container" style={{ paddingTop: "100px" }}>
            <h4>
                <Trans>Ground Routing configuration</Trans>
            </h4>
            <pre style={preStyle}>
                {loading
                    ? "Loading..."
                    : JSON.stringify(configuration, null, "  ")}
            </pre>
            <button onClick={getGroundRouting}>
                <Trans>Reload</Trans>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    configuration: state.groundrouting.configuration,
    loading: state.groundrouting.loading,
});

const mapDispatchToProps = (dispatch) => ({
    getGroundRouting: bindActionCreators(getGroundRouting, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
