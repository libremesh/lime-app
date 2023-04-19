import { GROUNDROUTING_GET, GROUNDROUTING_SET } from "./groundRoutingConstants";

export const getGroundRouting = () => ({
    type: GROUNDROUTING_GET,
});

export const setGroundRouting = (config) => ({
    type: GROUNDROUTING_SET,
    payload: { config },
});
