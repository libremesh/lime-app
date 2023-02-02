import {
    GET_INTERNET_STATUS_SUCCESS,
    GET_NODE_STATUS,
    GET_NODE_STATUS_ERROR,
    GET_NODE_STATUS_SUCCESS,
    GET_SIGNAL_SUCCESS,
    GET_TRAFFIC_SUCCESS,
} from "./rxConstants";

export const initialState = {
    loading: false,
    interval: 2000,
    data: {
        internet: {
            IPv4: { working: null },
            IPv6: { working: null },
            DNS: { working: null },
        },
    },
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_NODE_STATUS:
            return Object.assign(initialState, {
                loading: true,
                data: {
                    internet: {
                        IPv4: { working: null },
                        IPv6: { working: null },
                        DNS: { working: null },
                    },
                },
            });
        case GET_NODE_STATUS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: Object.assign({}, state.data, payload),
            });
        case GET_NODE_STATUS_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: Object.assign({}, state.data, payload),
            });
        case GET_SIGNAL_SUCCESS:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    most_active: Object.assign({}, state.data.most_active, {
                        signal: payload.signal,
                    }),
                }),
            });
        case GET_TRAFFIC_SUCCESS:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    most_active: Object.assign({}, state.data.most_active, {
                        tx_bytes: payload.tx_bytes,
                        rx_bytes: payload.rx_bytes,
                    }),
                }),
            });
        case GET_INTERNET_STATUS_SUCCESS:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, { internet: payload }),
            });
        default:
            return state;
    }
};
