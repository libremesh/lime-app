import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { useBoardData } from "utils/queries";

import { loadStations } from "./changeNodeActions";
import { getStations } from "./changeNodeSelectors";

export const ChangeNode = ({ stations, loadStations }) => {
    const { data: boardData } = useBoardData();

    const [state, setState] = useState({
        station: boardData && boardData.hostname,
    });

    useEffect(() => {
        setState({
            station: boardData.hostname,
        });
        return () => {};
    }, [boardData]);

    useEffect(() => {
        loadStations();
    }, [loadStations]);

    function handleChange(e) {
        setState({ station: e.target.value });
        e.target.value;
    }

    function nextStation(e) {
        e.preventDefault();
        if (typeof state.station !== "undefined") {
            window.location.href = "http://".concat(state.station);
        }
    }

    function sortStations(stations) {
        const result = stations.filter((x) => x !== boardData.hostname).sort();
        result.push(boardData.hostname);
        return result;
    }

    return (
        <div class="container container-padded">
            <h4>
                <Trans>Visit a neighboring node</Trans>
            </h4>
            <p>
                <Trans>
                    Select another node and use the LimeApp as you were there
                </Trans>
            </p>
            <form onSubmit={nextStation}>
                <p>
                    <label>
                        <Trans>Select new node</Trans>
                    </label>
                    <select
                        class="u-full-width"
                        onChange={handleChange}
                        value={state.station}
                    >
                        {sortStations(stations).map((x, y) => (
                            <option value={x} key={y}>
                                {x}
                            </option>
                        ))}
                    </select>
                </p>
                <button class="button block" type="submit">
                    <Trans>Visit</Trans>
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    stations: getStations(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadStations: bindActionCreators(loadStations, dispatch),
});

const changeNodeConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeNode);
export default changeNodeConnected;
