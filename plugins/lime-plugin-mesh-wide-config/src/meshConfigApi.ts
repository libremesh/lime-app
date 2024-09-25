import {
    IMeshWideConfig,
    MeshWideConfigState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const getMeshWideConfigState = async () => meshWideConfigState;

export const getMeshWideConfig = async () => meshWideConfig;

const meshWideConfigState: MeshWideConfigState = {
    node1: {
        state: "DEFAULT",
        timestamp: "2021-09-01T00:00:00Z",
        main_node: "NO",
        error: "",
        node_ip: "",
        bleachTTL: 0,
        author: "node1",
    },
    node2: {
        state: "DEFAULT",
        timestamp: "2021-09-01T00:00:00Z",
        main_node: "NO",
        error: "",
        node_ip: "",
        bleachTTL: 0,
        author: "node2",
    },
};

const options = {
    primary_interface: "eth0",
    main_ipv4_address: "10.170.128.0/16/17",
};

const meshWideConfig: IMeshWideConfig = [
    {
        name: "lime system",
        options,
    },
    {
        name: "lime network",
        options,
    },
    {
        name: "lime wifi",
        options,
    },
    {
        name: "generic_uci_config prometheus",
        options,
    },
    {
        name: "run_asset prometheus_enable",
        options,
    },
];
