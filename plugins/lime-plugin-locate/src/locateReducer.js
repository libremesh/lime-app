import {
    LOCATION_CHANGE,
    LOCATION_CHANGE_SUCCESS,
    LOCATION_LOAD_LINKS_SUCCESS,
    LOCATION_LOAD_SUCCESS,
    LOCATION_TOOGLE_EDIT,
    LOCATION_USER_SET,
} from "./locateConstants";

export const initialState = {
    station: undefined,
    user: {
        lon: 0,
        lat: 0,
    },
    submitting: false,
    editting: false,
    isCommunity: false,
    nodesData: {},
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOCATION_CHANGE:
            return Object.assign({}, state, {
                submitting: true,
                editting: false,
            });

        case LOCATION_CHANGE_SUCCESS:
            return Object.assign({}, state, { submitting: false });

        case LOCATION_LOAD_SUCCESS:
            return Object.assign({}, state, {
                station: payload.location || payload,
                isCommunity: payload.default || false,
            });

        case LOCATION_LOAD_LINKS_SUCCESS:
            return Object.assign({}, state, { nodesData: payload });

        case LOCATION_USER_SET:
            return Object.assign({}, state, { user: payload });

        case LOCATION_TOOGLE_EDIT:
            return Object.assign({}, state, { editting: payload });

        default:
            return state;
    }
};
