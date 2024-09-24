import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const getMeshWideConfig = async () => meshWideConfig;

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
