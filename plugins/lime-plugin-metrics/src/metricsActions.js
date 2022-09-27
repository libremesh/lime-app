import { GET_INTERNET_STATUS } from "../../lime-plugin-rx/src/rxConstants";
import {
    LOAD_HOST_METRICS,
    LOAD_METRICS,
    LOAD_METRICS_ALL,
} from "./metricsConstants";

export const getMetrics = () => ({
    type: LOAD_METRICS,
});

export const getMetricsAll = () => ({
    type: LOAD_METRICS_ALL,
});

export const getInternetStatus = () => ({
    type: GET_INTERNET_STATUS,
});

export const getMetricsGateway = (hostname) => ({
    type: LOAD_METRICS,
    payload: hostname,
});

export const getNodeMetrics = (hostname) => ({
    type: LOAD_HOST_METRICS,
    payload: hostname,
});
