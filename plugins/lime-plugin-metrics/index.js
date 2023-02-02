import * as constants from "./src/metricsConstants";
import epics from "./src/metricsEpics";
import { MetricsMenu } from "./src/metricsMenu";
import Metrics from "./src/metricsPage";
import { reducer } from "./src/metricsReducer";

export default {
    name: "Metrics",
    page: Metrics,
    menu: MetricsMenu,
    store: {
        name: "metrics",
        epics,
        reducer,
        constants,
    },
};
