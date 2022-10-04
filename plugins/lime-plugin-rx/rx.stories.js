import { action } from "@storybook/addon-actions";

import { Page } from "./src/rxPage";

const nodeData = {
    internet: {
        DNS: {
            working: true,
        },
        IPv6: {
            working: false,
        },
        status: "ok",
        IPv4: {
            working: true,
        },
    },
    ips: [
        {
            version: "4",
            address: "10.5.0.36/21",
        },
        {
            version: "6",
            address: "2801:1e8:2::7288:d100/64",
        },
        {
            version: "6",
            address: "fe80::6670:2ff:fed1:8872/64",
        },
    ],
    hostname: "ql-anaymarcos",
    status: "ok",
    uptime: "93055.80\n",
    most_active: {
        rx_bytes: 82509781,
        station_mac: "A8:40:41:1C:84:05",
        station_hostname: "ql_graciela_wlan2_adhoc",
        tx_bytes: 12806307,
        iface: "wlan1-adhoc",
        attributes: {
            inactive: 20,
            signal: "-63",
            channel: 136,
        },
        link_type: "wifi",
        signal: "-62",
    },
};

const newVersionAvailable = {
    version: "LibreRouter 1.5",
};

const actions = {
    getNodeStatusTimer: action("getNodeStatusTimer"),
    getNodeStatus: action("getNodeStatus"),
    stopTimer: action("stopTimer"),
    changeNode: action("changeNode"),
};

export default {
    title: "Containers/Home Screen (Rx)",
    component: Page,
};

export const withData = (args) => <Page {...actions} {...args} />;
withData.args = {
    nodeData,
    isLoading: false,
    queries: [
        [
            ["bat-hosts", "get_bathost", "A8:40:41:1C:84:05", "wlan1-adhoc"],
            { hostname: "ql-graciela", iface: "wlan2-adhoc" },
        ],
    ],
};

export const loadingNodeData = (args) => <Page {...actions} {...args} />;
loadingNodeData.args = {
    nodeData,
    isLoading: true,
};

export const newVersionIsAvailable = (args) => <Page {...actions} {...args} />;
newVersionIsAvailable.args = {
    nodeData,
    isLoading: false,
    queries: [[["eupgrade", "is_new_version_available"], newVersionAvailable]],
};

export const needToConfirmUpgrade = (args) => <Page {...actions} {...args} />;
needToConfirmUpgrade.args = {
    nodeData: { ...nodeData, uptime: "60\n" },
    isLoading: false,
    queries: [
        [
            ["lime-utils", "get_upgrade_info"],
            {
                suCounter: 300,
            },
        ],
    ],
};

export const changesNeedReboot = (args) => <Page {...actions} {...args} />;
changesNeedReboot.args = {
    nodeData: { ...nodeData, uptime: "60\n" },
    isLoading: false,
    queries: [["changes-need-reboot", true]],
};
