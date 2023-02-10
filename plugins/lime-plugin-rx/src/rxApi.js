import api from "utils/uhttpd.service";

export const getNodeStatus = () => {
    return mock_node_status;
    // return api.call("lime-utils", "get_node_status", {});
};

export const getInternetStatus = () => mock_get_internet_status;
// api.call("lime-metrics", "get_internet_status", {});

const mock_get_internet_status = {
    DNS: {
        working: false,
    },
    IPv6: {
        working: true,
    },
    status: "ok",
    IPv4: {
        working: false,
    },
};

const mock_node_status = {
    ips: [
        {
            version: "4",
            address: "10.219.123.10/16",
        },
        {
            version: "6",
            address: "fddb:f81c:47ba::a7b:be00/64",
        },
        {
            version: "6",
            address: "fe80::c24a:ff:febe:7b0a/64",
        },
    ],
    hostname: "lapastoramesh-c",
    switch_status: [
        {
            device: "eth0.1",
            num: 2,
            role: "lan",
            link: "up",
        },
        {
            device: "eth0.1",
            num: 3,
            role: "lan",
            link: "down",
        },
        {
            device: "eth0.1",
            num: 4,
            role: "lan",
            link: "down",
        },
        {
            device: "eth0.1",
            num: 5,
            role: "lan",
            link: "down",
        },
        {
            device: "eth0.1",
            num: 0,
            role: "cpu",
            link: "up",
        },
        {
            device: "eth0.2",
            num: 1,
            role: "wan",
            link: "down",
        },
        {
            device: "eth0.2",
            num: 0,
            role: "cpu",
            link: "up",
        },
    ],
    status: "ok",
    uptime: "3186.15",
    most_active: {
        rx_short_gi: true,
        station_mac: "C0:4A:00:DD:69:1C",
        tx_bytes: 13809119,
        rx_vht: false,
        rx_mhz: 40,
        rx_40mhz: true,
        tx_packets: 31706,
        tx_mhz: 40,
        rx_packets: 97813,
        rx_ht: true,
        tx_mcs: 15,
        noise: -90,
        rx_mcs: 15,
        chains: [-17, -16],
        rx_bytes: 19464143,
        tx_ht: true,
        iface: "wlan1-mesh",
        tx_rate: 300000,
        inactive: 30,
        tx_short_gi: true,
        tx_40mhz: true,
        expected_throughput: 59437,
        tx_vht: false,
        rx_rate: 300000,
        signal: -14,
    },
};

const last_internet_path = [
    { ip: "10.219.105.28", hostname: "nodo11s" },
    { ip: "10.1.61.129", hostname: "" },
    { ip: "10.75.0.1", hostname: "" },
];
