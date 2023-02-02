import { GET_NODE_STATUS, TIMER_START, TIMER_STOP } from "./rxConstants";

export const getNodeStatus = () => ({
    type: GET_NODE_STATUS,
    payload: {},
});

export const getNodeStatusTimer = () => ({
    type: TIMER_START,
    payload: {},
});

export const stopTimer = () => ({
    type: TIMER_STOP,
});
