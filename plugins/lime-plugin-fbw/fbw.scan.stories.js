import { action } from "@storybook/addon-actions";

import { Scan } from "./src/containers/Scan";


const networksScanning = [
    {
        config: {
            wifi: {},
        },
        file: "",
    },
]

const networkOptions = [
    {
        ap: "ql-graciela",
        config: {
            wifi: {
                apname_ssid: "quintanalibre.org.ar/%H",
                ap_ssid: "quintanalibre.org.ar",
            },
        },
        file: "lime_default-ql-graciela",
    },
    {
        ap: "ql-oncelotes",
        config: {
            wifi: {
                apname_ssid: "quintanalibre.org.ar/%H",
                ap_ssid: "quintanalibre.org.ar",
            },
        },
        file: "lime_default-ql-oncelotes",
    },
]

export default {
    title: "Containers/First boot wizard",
}

export const ScanningForNetwork = () => (
    <Scan
        networks={networksScanning}
        status={"scanning"}
        searchNetworks={action("searchNetworks")}
        setNetwork={action("setNetwork")}
        toggleForm={() => action("toggleForm")}
    />
)

export const SelectANetwork = () => (
    <Scan
        networks={networkOptions}
        status={"scanned"}
        searchNetworks={action("searchNetworks")}
        setNetwork={action("setNetwork")}
        toggleForm={(data) => () => action("toggleForm")(data)}
    />
)
