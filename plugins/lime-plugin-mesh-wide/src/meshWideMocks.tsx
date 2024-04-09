import {
    IBatManLinkData,
    IBatmanLinks,
    ILinks,
    IMeshWideConfig,
    INodes,
    IWifiLinkData,
    IWifiLinks,
    LinkType,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

// todo(kon): if a mac disappear from mac list and a link with this mac as src mac disappear also, is not shown on the map.

export const nodesReferenceState: INodes = {
    "LiMe-462895": {
        bleachTTL: 12,
        author: "LiMe-462895",
        coordinates: {
            long: "-64.42703",
            lat: "-31.80874",
        },
        macs: ["a0:f3:c1:46:28:96", "a0:f3:c1:46:28:97", "a0:f3:c1:46:11:97"],
        ipv4: "192.168.1.1",
        ipv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        firmware_version: "1.0.0",
        uptime: 1010.03,
        device: "Router",
        board: "",
        hostname: "",
    },
    "LiMe-da4eaa": {
        bleachTTL: 12,
        author: "LiMe-da4eaa",
        coordinates: {
            long: "-64.42315",
            lat: "-31.79461",
        },
        macs: [
            "14:cc:20:da:4e:ab",
            "14:cc:20:da:4e:ac",
            // Following macs are related to batman links
            "02:ab:46:fc:3a:bd",
            "02:58:47:fc:3a:bd",
        ],
        ipv4: "192.168.1.2",
        ipv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7335",
        firmware_version: "1.0.1",
        uptime: 37.89,
        device: "Switch",
        board: "",
        hostname: "",
    },
    primero: {
        bleachTTL: 12,
        author: "primero",
        coordinates: {
            long: "-64.41609",
            lat: "-31.80461",
        },
        macs: [
            "a8:40:41:1d:f9:35",
            "a8:40:41:1d:f9:35",
            // Following macs are related to batman links
            "02:db:d6:46:28:95",
            "02:ab:46:46:28:95",
            "02:58:47:46:28:95",
        ],
        ipv4: "192.168.1.3",
        ipv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7336",
        firmware_version: "1.0.2",
        uptime: 37.89,
        device: "Hub",
        board: "",
        hostname: "",
    },
    segundo: {
        bleachTTL: 12,
        author: "segundo",
        coordinates: {
            long: "-64.43209",
            lat: "-31.79461",
        },
        macs: [
            "a8:40:41:1d:f9:ff",
            "a8:40:41:1d:f9:aa",
            // Following macs are related to batman links
            "02:db:d6:da:4e:aa",
            "02:58:47:da:4e:aa",
            "02:ab:46:da:4e:aa",
        ],
        ipv4: "192.168.1.3",
        ipv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7336",
        firmware_version: "1.0.2",
        uptime: 37.89,
        device: "Hub",
        board: "",
        hostname: "",
    },
};

export const linksReferenceState: IWifiLinks = {
    primero: [
        {
            tx_rate: 150000,
            dst_mac: "A0:F3:C1:46:28:97",
            chains: [-63, -59],
            signal: -58,
            rx_rate: 180000,
            src_mac: "a8:40:41:1d:f9:35",
        },
        {
            tx_rate: 162000,
            dst_mac: "14:CC:20:DA:4E:AC",
            chains: [-57, -51],
            signal: -50,
            rx_rate: 240000,
            src_mac: "a8:40:41:1d:f9:35",
        },
    ],
    segundo: [
        {
            tx_rate: 150000,
            dst_mac: "A0:F3:C1:46:11:97",
            chains: [-58, -59],
            signal: -58,
            rx_rate: 180000,
            src_mac: "a8:40:41:1d:f9:ff",
        },
        {
            tx_rate: 162000,
            dst_mac: "14:CC:20:DA:4E:AC",
            chains: [-52, -51],
            signal: -50,
            rx_rate: 240000,
            src_mac: "a8:40:41:1d:f9:aa",
        },
    ] as IWifiLinkData[],
    "LiMe-da4eaa": [
        {
            tx_rate: 65000,
            dst_mac: "A0:F3:C1:46:28:96",
            chains: [-25, -25],
            src_mac: "14:cc:20:da:4e:ab",
            rx_rate: 65000,
            signal: -25,
        },
        {
            tx_rate: 270000,
            dst_mac: "A0:F3:C1:46:28:97",
            chains: [-50, -47],
            src_mac: "14:cc:20:da:4e:ac",
            rx_rate: 150000,
            signal: -45,
        },
        {
            tx_rate: 243000,
            dst_mac: "A8:40:41:1D:F9:35",
            chains: [-75, -64],
            src_mac: "14:cc:20:da:4e:ac",
            rx_rate: 162000,
            signal: -64,
        },
        {
            tx_rate: 243000,
            dst_mac: "A8:40:41:1D:F9:aa",
            chains: [-75, -64],
            src_mac: "14:cc:20:da:4e:ac",
            rx_rate: 162000,
            signal: -64,
        },
    ] as IWifiLinkData[],
    "LiMe-462895": [
        {
            tx_rate: 78000,
            dst_mac: "14:CC:20:DA:4E:AB",
            chains: [-43, -46],
            src_mac: "a0:f3:c1:46:28:96",
            rx_rate: 78000,
            signal: 2,
        },
        {
            tx_rate: 243000,
            dst_mac: "14:CC:20:DA:4E:AC",
            chains: [-68, -41],
            src_mac: "a0:f3:c1:46:28:97",
            rx_rate: 216000,
            signal: -41,
        },
        {
            tx_rate: 240000,
            dst_mac: "A8:40:41:1D:F9:35",
            chains: [-77, -65],
            src_mac: "a0:f3:c1:46:28:97",
            rx_rate: 135000,
            signal: -65,
        },
        {
            tx_rate: 240000,
            dst_mac: "A8:40:41:1D:F9:ff",
            chains: [-64, -65],
            src_mac: "a0:f3:c1:46:11:97",
            rx_rate: 135000,
            signal: -65,
        },
    ] as IWifiLinkData[],
};

export const batManReferenceState: IBatmanLinks = {
    primero: [
        {
            hard_ifindex: 18,
            last_seen_msecs: 1300,
            iface: "eth0-1_250",
            dst_mac: "02:db:d6:da:4e:aa",
            src_mac: "02:db:d6:46:28:95",
        },
        {
            hard_ifindex: 26,
            last_seen_msecs: 20,
            iface: "wlan1-mesh_250",
            dst_mac: "02:ab:46:da:4e:aa",
            src_mac: "02:ab:46:46:28:95",
        },
        {
            hard_ifindex: 26,
            last_seen_msecs: 40,
            iface: "wlan1-mesh_250",
            dst_mac: "02:ab:46:fc:3a:bd",
            src_mac: "02:ab:46:46:28:95",
        },
        {
            hard_ifindex: 28,
            last_seen_msecs: 1710,
            iface: "wlan0-mesh_250",
            dst_mac: "02:58:47:fc:3a:bd",
            src_mac: "02:58:47:46:28:95",
        },
        {
            hard_ifindex: 28,
            last_seen_msecs: 1450,
            iface: "wlan0-mesh_250",
            dst_mac: "02:58:47:da:4e:aa",
            src_mac: "02:58:47:46:28:95",
        },
    ] as IBatManLinkData[],
    "LiMe-da4eaa": [
        {
            hard_ifindex: 26,
            last_seen_msecs: 1670,
            iface: "wlan1-mesh_250",
            dst_mac: "02:ab:46:da:4e:aa",
            src_mac: "02:ab:46:fc:3a:bd",
        },
        {
            hard_ifindex: 26,
            last_seen_msecs: 1350,
            iface: "wlan1-mesh_250",
            dst_mac: "02:ab:46:46:28:95",
            src_mac: "02:ab:46:fc:3a:bd",
        },
        {
            hard_ifindex: 28,
            last_seen_msecs: 1430,
            iface: "wlan0-mesh_250",
            dst_mac: "02:58:47:46:28:95",
            src_mac: "02:58:47:fc:3a:bd",
        },
        {
            hard_ifindex: 28,
            last_seen_msecs: 1030,
            iface: "wlan0-mesh_250",
            dst_mac: "02:58:47:da:4e:aa",
            src_mac: "02:58:47:fc:3a:bd",
        },
    ],
    segundo: [
        {
            hard_ifindex: 18,
            last_seen_msecs: 1670,
            src_mac: "02:db:d6:da:4e:aa",
            dst_mac: "02:db:d6:46:28:95",
            iface: "eth0-1_250",
        },
        {
            hard_ifindex: 26,
            last_seen_msecs: 550,
            src_mac: "02:58:47:da:4e:aa",
            dst_mac: "02:58:47:46:28:95",
            iface: "wlan0-mesh_250",
        },
        {
            hard_ifindex: 26,
            last_seen_msecs: 260,
            src_mac: "02:58:47:da:4e:aa",
            dst_mac: "02:58:47:fc:3a:bd",
            iface: "wlan0-mesh_250",
        },
        {
            hard_ifindex: 28,
            last_seen_msecs: 340,
            src_mac: "02:ab:46:da:4e:aa",
            dst_mac: "02:ab:46:fc:3a:bd",
            iface: "wlan1-mesh_250",
        },
        {
            hard_ifindex: 28,
            last_seen_msecs: 550,
            src_mac: "02:ab:46:da:4e:aa",
            dst_mac: "02:ab:46:46:28:95",
            iface: "wlan1-mesh_250",
        },
    ] as IBatManLinkData[],
};

// Use the same as on the reference state deleting a specific node
// const nodeName = "LiMe-462895";
const nodeName = "primero";

// Used to delete a mac from a node. To see what happend if the returning list is different
// This will delete a mac from the node macs list
const macToDelete = "";
// const macToDelete = "a0:f3:c1:46:11:97";
// delete a link where the src_mac is
// const linkToDelete = macToDelete;
const linkToDelete = "a0:f3:c1:46:11:97";
// const linkToDelete = "";

export const links = <T extends LinkType>(type: T): ILinks<T> => {
    const data = type === "wifi" ? linksReferenceState : batManReferenceState;

    // Create a deep copy of the state to avoid mutating the original object
    const newState: ILinks<T> = JSON.parse(JSON.stringify(data));

    let source_macs_to_remove = [];
    if (nodeName) {
        // Get source_macs from the node to be removed
        source_macs_to_remove = newState[nodeName].map((item: any) =>
            item.src_mac.toLowerCase()
        );

        // Remove the specified node
        delete newState[nodeName];
    }

    // Remove data items with matching dest_mac in other objects
    Object.keys(newState).forEach((key: string) => {
        newState[key] = newState[key].filter((item) => {
            return (
                !source_macs_to_remove.includes(item.dst_mac.toLowerCase()) ||
                // Added to delete a specific link of a node and not an entire node
                item.src_mac.toLowerCase() === linkToDelete.toLowerCase() ||
                item.dst_mac.toLowerCase() === linkToDelete.toLowerCase()
            );
        });
    });

    return newState;
};

export const nodes = (): INodes => {
    const newState = JSON.parse(JSON.stringify(nodesReferenceState)) as INodes;

    // This only delete a particular mac from the list of macs
    for (const [k, v] of Object.entries(newState)) {
        v.macs = v.macs.filter((mac) => mac !== macToDelete);
    }

    // This delete an entire node
    delete newState[nodeName];

    return newState;
};

export const getMeshWideConfig = async () => meshWideConfig;
//
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
// export const getRadioData = async () => radioDataResponse_simplified;

//
// export const radioDataResponse_simplified: IMeshWideStatusResponse = {
//     result: {
//         "ql-czuk-bbone": {
//             bleachTTL: 28,
//             data: {
//                 hostname: "ql-czuk-bbone",
//                 coordinates: {
//                     lon: "-64.41515",
//                     lat: "-31.80130",
//                 },
//                 macs: [
//                     "a8:40:41:1d:f8:5c",
//                     "a8:40:41:1d:2a:a0",
//                     "02:cc:4e:1d:2a:a2",
//                     "aa:40:41:1d:f8:5c",
//                     "a8:40:41:1c:86:73",
//                     "aa:40:41:1c:86:73",
//                     "02:ab:46:1d:2a:a2",
//                 ],
//                 links: ["a8:40:41:1c:83:dd", "a8:40:41:1d:fa:29"],
//             },
//             author: "ql-czuk-bbone",
//         },
//         "ql-graciela-bbone": {
//             bleachTTL: 28,
//             data: {
//                 hostname: "ql-graciela-bbone",
//                 coordinates: {
//                     lon: "-64.42703",
//                     lat: "-31.80874",
//                 },
//                 macs: [
//                     "02:cc:4e:1c:85:aa",
//                     "a8:40:41:1c:83:f8",
//                     "02:ab:46:1c:85:aa",
//                     "ae:40:41:1c:85:a8",
//                     "a8:40:41:1c:83:dd",
//                     "a8:40:41:1c:85:a8",
//                     "aa:40:41:1c:85:a8",
//                     "02:58:47:1c:85:aa",
//                 ],
//                 links: ["a8:40:41:1c:86:73", "a8:40:41:1d:f9:f2"],
//             },
//             author: "ql-graciela-bbone",
//         },
//         "ql-berta": {
//             bleachTTL: 28,
//             data: {
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: [
//                     "a8:40:41:1d:fa:29",
//                     "aa:40:41:1f:71:60",
//                     "a8:40:41:1f:71:60",
//                     "a8:40:41:1d:f9:f2",
//                     "02:cc:4e:1f:71:62",
//                     "02:ab:46:1f:71:62",
//                 ],
//                 links: ["a8:40:41:1c:83:f8", "a8:40:41:1d:f8:5c"],
//                 hostname: "ql-berta",
//             },
//             author: "ql-berta",
//         },
//     },
// };
//
// export const radioDataResponse: IMeshWideStatusResponse = {
//     result: {
//         "si-radio": {
//             bleachTTL: 23,
//             data: {
//                 hostname: "si-radio",
//                 coordinates: {
//                     lon: "-64.39240",
//                     lat: "-31.82056",
//                 },
//                 macs: [
//                     "aa:40:41:1c:85:50",
//                     "02:cc:4e:1c:85:52",
//                     "a8:40:41:1c:84:1a",
//                     "a8:40:41:1c:85:50",
//                     "02:58:47:1c:85:52",
//                     "ae:40:41:1c:85:50",
//                     "02:ab:46:1c:85:52",
//                     "a8:40:41:1c:84:16",
//                 ],
//                 links: [
//                     "64:66:b3:87:4e:d1",
//                     "14:cc:20:ad:b0:d9",
//                     "a8:40:41:1c:83:eb",
//                 ],
//             },
//             author: "si-radio",
//         },
//         "ql-berta": {
//             bleachTTL: 28,
//             data: {
//                 links: ["a8:40:41:1c:83:f8"],
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: [
//                     "a8:40:41:1d:fa:29",
//                     "aa:40:41:1f:71:60",
//                     "a8:40:41:1f:71:60",
//                     "a8:40:41:1d:f9:f2",
//                     "02:cc:4e:1f:71:62",
//                     "02:ab:46:1f:71:62",
//                 ],
//                 hostname: "ql-berta",
//             },
//             author: "ql-berta",
//         },
//         "ql-esteban": {
//             bleachTTL: 25,
//             data: {
//                 links: ["", ""],
//                 coordinates: {
//                     lon: "-64.41600680351257",
//                     lat: "-31.801688993108318",
//                 },
//                 macs: [
//                     "a0:f3:c1:48:cf:ec",
//                     "a0:f3:c1:48:cf:ed",
//                     "a2:f3:c1:48:cf:ec",
//                     "a2:f3:c1:48:cf:ed",
//                 ],
//                 hostname: "ql-esteban",
//             },
//             author: "ql-esteban",
//         },
//         "rl-hogardecristo": {
//             bleachTTL: 22,
//             data: {
//                 hostname: "rl-hogardecristo",
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: ["02:58:47:c2:e2:1a", "28:87:ba:c2:e2:1a"],
//                 links: ["a8:40:41:1c:85:a4"],
//             },
//             author: "rl-hogardecristo",
//         },
//         "ql-czuk-bbone": {
//             bleachTTL: 28,
//             data: {
//                 hostname: "ql-czuk-bbone",
//                 coordinates: {
//                     lon: "-64.41515",
//                     lat: "-31.80130",
//                 },
//                 macs: [
//                     "a8:40:41:1d:f8:5c",
//                     "a8:40:41:1d:2a:a0",
//                     "02:cc:4e:1d:2a:a2",
//                     "aa:40:41:1d:f8:5c",
//                     "a8:40:41:1c:86:73",
//                     "aa:40:41:1c:86:73",
//                     "02:ab:46:1d:2a:a2",
//                 ],
//                 links: ["a8:40:41:1c:84:20", "a8:40:41:1c:83:dd"],
//             },
//             author: "ql-czuk-bbone",
//         },
//         "ql-czuk": {
//             bleachTTL: 25,
//             data: {
//                 links: [
//                     "14:cc:20:ad:b0:83",
//                     "64:66:b3:87:4b:39",
//                     "a2:f3:c1:48:cf:ed",
//                 ],
//                 coordinates: {
//                     lon: "-64.41506",
//                     lat: "-31.80137",
//                 },
//                 macs: [
//                     "a8:40:41:1f:71:f0",
//                     "02:58:47:1f:71:f2",
//                     "a8:40:41:1c:86:7f",
//                     "a8:40:41:1c:86:96",
//                     "02:ab:46:1f:71:f2",
//                     "02:cc:4e:1f:71:f2",
//                 ],
//                 hostname: "ql-czuk",
//             },
//             author: "ql-czuk",
//         },
//         "ql-refu-bbone": {
//             bleachTTL: 25,
//             data: {
//                 links: [
//                     "a8:40:41:1d:f8:5c",
//                     "9c:a2:f4:8c:b8:58",
//                     "a8:40:41:1c:85:a4",
//                     "9c:a2:f4:8c:b9:48",
//                     "a8:40:41:1d:27:b4",
//                     "a8:40:41:1d:f8:f9",
//                 ],
//                 coordinates: {
//                     lon: "-64.385177",
//                     lat: "-31.837354",
//                 },
//                 macs: [
//                     "02:cc:4e:1c:85:46",
//                     "a8:40:41:1c:85:44",
//                     "02:ab:46:1c:85:46",
//                     "a8:40:41:1c:84:20",
//                     "02:58:47:1c:85:46",
//                     "a8:40:41:1c:84:28",
//                 ],
//                 hostname: "ql-refu-bbone",
//             },
//             author: "ql-refu-bbone",
//         },
//         "rl-vacas": {
//             bleachTTL: 25,
//             data: {
//                 hostname: "rl-vacas",
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: ["9c:a2:f4:8c:b9:48", "02:58:47:8c:b9:48"],
//                 links: [
//                     "a8:40:41:1c:85:44",
//                     "a8:40:41:1c:85:a4",
//                     "a8:40:41:1d:27:b4",
//                 ],
//             },
//             author: "rl-vacas",
//         },
//         "mc-escuela-larrea": {
//             bleachTTL: 23,
//             data: {
//                 links: [
//                     "a8:40:41:1c:85:5a",
//                     "a8:40:41:1c:84:99",
//                     "a8:40:41:1c:86:6d",
//                     "a8:40:41:1d:f9:26",
//                     "a8:40:41:1c:85:5a",
//                     "a8:40:41:1c:84:99",
//                 ],
//                 coordinates: {
//                     lon: "-64.37752",
//                     lat: "-31.85442",
//                 },
//                 macs: [
//                     "a8:40:41:1c:86:6e",
//                     "aa:40:41:1c:86:6d",
//                     "a8:40:41:1c:86:6d",
//                     "aa:40:41:1d:2a:b0",
//                     "a8:40:41:1d:2a:b0",
//                     "02:cc:4e:1d:2a:b2",
//                     "02:ab:46:1d:2a:b2",
//                 ],
//                 hostname: "mc-escuela-larrea",
//             },
//             author: "mc-escuela-larrea",
//         },
//         "ql-graciela": {
//             bleachTTL: 28,
//             data: {
//                 hostname: "ql-graciela",
//                 coordinates: {
//                     lon: "-64.42705",
//                     lat: "-31.80873",
//                 },
//                 macs: [
//                     "02:58:47:1c:85:3e",
//                     "ae:40:41:1c:85:3c",
//                     "02:cc:4e:1c:85:3e",
//                     "02:ab:46:1c:85:3e",
//                     "a8:40:41:1c:84:18",
//                     "a8:40:41:1c:84:05",
//                     "aa:40:41:1c:85:3c",
//                     "a8:40:41:1c:85:3c",
//                 ],
//                 links: [
//                     "a8:40:41:1c:86:1d",
//                     "a8:40:41:1d:2a:40",
//                     "a0:f3:c1:85:fb:42",
//                     "a8:40:41:1c:86:2d",
//                 ],
//             },
//             author: "ql-graciela",
//         },
//         "ql-quinteros": {
//             bleachTTL: 27,
//             data: {
//                 hostname: "ql-quinteros",
//                 coordinates: {
//                     lon: "-64.4300052523613",
//                     lat: "-31.805773853144796",
//                 },
//                 macs: [
//                     "aa:40:41:1d:2a:40",
//                     "02:cc:4e:1d:2a:42",
//                     "a8:40:41:1c:86:2d",
//                     "a8:40:41:1d:2a:40",
//                     "02:ab:46:1d:2a:42",
//                     "ae:40:41:1d:2a:40",
//                     "02:58:47:1d:2a:42",
//                     "a8:40:41:1c:86:1d",
//                 ],
//                 links: [
//                     "a0:f3:c1:85:fb:43",
//                     "a8:40:41:1d:f9:2c",
//                     "a8:40:41:1c:84:05",
//                     "a8:40:41:1c:85:3c",
//                     "a0:f3:c1:85:fb:42",
//                     "a8:40:41:1d:f8:fb",
//                     "a8:40:41:1c:84:18",
//                 ],
//             },
//             author: "ql-quinteros",
//         },
//         "mc-lidia": {
//             bleachTTL: 22,
//             data: {
//                 links: [
//                     "a8:40:41:1c:85:5a",
//                     "a8:40:41:1c:84:99",
//                     "a8:40:41:1c:86:6d",
//                 ],
//                 coordinates: {
//                     lon: "-64.37990",
//                     lat: "-31.85474",
//                 },
//                 macs: [
//                     "a8:40:41:1d:27:7c",
//                     "a8:40:41:1c:85:2e",
//                     "02:ab:46:1d:27:7e",
//                     "aa:40:41:1d:27:7c",
//                 ],
//                 hostname: "mc-lidia",
//             },
//             author: "mc-lidia",
//         },
//         "ql-ipem265": {
//             bleachTTL: 13,
//             data: {
//                 links: ["a8:40:41:1c:86:96"],
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: [
//                     "a8:40:41:1c:85:98",
//                     "02:ab:46:1c:85:9a",
//                     "aa:40:41:1c:85:98",
//                     "a8:40:41:1c:84:0b",
//                     "02:58:47:1c:85:9a",
//                     "02:cc:4e:1c:85:9a",
//                     "a8:40:41:1c:84:2e",
//                     "ae:40:41:1c:85:98",
//                 ],
//                 hostname: "ql-ipem265",
//             },
//             author: "ql-ipem265",
//         },
//         "ql-irenecasa": {
//             bleachTTL: 25,
//             data: {
//                 hostname: "ql-irenecasa",
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: [
//                     "66:70:02:4e:cc:e2",
//                     "02:ab:46:4e:cc:e1",
//                     "64:70:02:4e:cc:e2",
//                     "62:70:02:4e:cc:e2",
//                     "64:70:02:4e:cc:e3",
//                     "02:58:47:4e:cc:e1",
//                 ],
//                 links: ["64:66:b3:87:4b:38", "64:66:b3:87:4b:39"],
//             },
//             author: "ql-irenecasa",
//         },
//         "ql-flor": {
//             bleachTTL: 25,
//             data: {
//                 links: ["a8:40:41:1c:86:7f"],
//                 coordinates: {
//                     lon: "-64.41365",
//                     lat: "-31.79897",
//                 },
//                 macs: [
//                     "16:cc:20:ad:b0:82",
//                     "02:ab:46:ad:b0:81",
//                     "14:cc:20:ad:b0:83",
//                     "02:58:47:ad:b0:81",
//                     "14:cc:20:ad:b0:82",
//                 ],
//                 hostname: "ql-flor",
//             },
//             author: "ql-flor",
//         },
//         "si-andrea": {
//             bleachTTL: 23,
//             data: {
//                 links: ["a8:40:41:1c:85:50", "a8:40:41:1c:85:a4"],
//                 coordinates: {
//                     lon: "-64.40097",
//                     lat: "-31.81854",
//                 },
//                 macs: [
//                     "16:cc:20:ad:b0:d9",
//                     "14:cc:20:ad:b0:d9",
//                     "12:cc:20:ad:b0:d9",
//                     "02:ab:46:ad:b0:d8",
//                     "02:58:47:ad:b0:d8",
//                     "14:cc:20:ad:b0:da",
//                 ],
//                 hostname: "si-andrea",
//             },
//             author: "si-andrea",
//         },
//         "rl-tanque": {
//             bleachTTL: 23,
//             data: {
//                 links: [],
//                 coordinates: {
//                     lon: "-64.38414",
//                     lat: "-31.84013",
//                 },
//                 macs: ["a8:40:41:1d:f9:05", "a8:40:41:1d:fa:26"],
//                 hostname: "rl-tanque",
//             },
//             author: "rl-tanque",
//         },
//         "mc-yohana": {
//             bleachTTL: 23,
//             data: {
//                 links: ["a8:40:41:1c:85:a4", "a8:40:41:1d:27:b4"],
//                 coordinates: {
//                     lon: "-64.37864",
//                     lat: "-31.83969",
//                 },
//                 macs: ["9c:a2:f4:8c:b8:58", "02:58:47:8c:b8:58"],
//                 hostname: "mc-yohana",
//             },
//             author: "mc-yohana",
//         },
//         "mc-eli": {
//             bleachTTL: 21,
//             data: {
//                 links: ["a8:40:41:1d:29:68", "a8:40:41:1d:2a:1c"],
//                 coordinates: {
//                     lon: "-64.38097",
//                     lat: "-31.85566",
//                 },
//                 macs: ["9c:a2:f4:8c:b6:f4", "02:58:47:8c:b6:f4"],
//                 hostname: "mc-eli",
//             },
//             author: "mc-eli",
//         },
//         "si-soniam": {
//             bleachTTL: 23,
//             data: {
//                 links: [
//                     "a8:40:41:1c:85:50",
//                     "64:70:02:4e:cd:0b",
//                     "a8:40:41:1c:84:16",
//                 ],
//                 coordinates: {
//                     lon: "-64.39240",
//                     lat: "-31.82056",
//                 },
//                 macs: [
//                     "66:66:b3:87:4e:d0",
//                     "64:66:b3:87:4e:d0",
//                     "62:66:b3:87:4e:d0",
//                     "64:66:b3:87:4e:d1",
//                     "02:ab:46:87:4e:cf",
//                     "02:58:47:87:4e:cf",
//                 ],
//                 hostname: "si-soniam",
//             },
//             author: "si-soniam",
//         },
//         "mc-martinez": {
//             bleachTTL: 22,
//             data: {
//                 hostname: "mc-martinez",
//                 coordinates: {
//                     lon: "-64.37988",
//                     lat: "-31.85802",
//                 },
//                 macs: [
//                     "ae:40:41:1d:29:68",
//                     "02:ab:46:1d:29:6a",
//                     "02:58:47:1d:29:6a",
//                     "a8:40:41:1c:84:99",
//                     "02:cc:4e:1d:29:6a",
//                     "a8:40:41:1c:85:1f",
//                     "a8:40:41:1d:29:68",
//                     "aa:40:41:1d:29:68",
//                 ],
//                 links: [
//                     "a8:40:41:1c:85:5a",
//                     "a8:40:41:1c:86:6d",
//                     "a8:40:41:1c:85:2e",
//                     "9c:a2:f4:8c:b6:f4",
//                     "a8:40:41:1d:2a:1c",
//                     "a8:40:41:1c:85:5c",
//                 ],
//             },
//             author: "mc-martinez",
//         },
//         "mc-capilla": {
//             bleachTTL: 23,
//             data: {
//                 links: [
//                     "a8:40:41:1c:84:28",
//                     "a8:40:41:1c:86:6e",
//                     "a8:40:41:1c:86:6d",
//                 ],
//                 coordinates: {
//                     lon: "-64.37827",
//                     lat: "-31.85482",
//                 },
//                 macs: [
//                     "a8:40:41:1d:f9:26",
//                     "aa:40:41:1f:74:f4",
//                     "a8:40:41:1d:f8:f9",
//                     "02:cc:4e:1f:74:f6",
//                     "02:ab:46:1f:74:f6",
//                     "a8:40:41:1f:74:f4",
//                 ],
//                 hostname: "mc-capilla",
//             },
//             author: "mc-capilla",
//         },
//         "ql-refu-bbone-2": {
//             bleachTTL: 22,
//             data: {
//                 links: [
//                     "a8:40:41:1c:84:1a",
//                     "9c:a2:f4:8c:b8:58",
//                     "a8:40:41:1d:27:b4",
//                     "28:87:ba:c2:e2:1a",
//                 ],
//                 coordinates: {
//                     lon: "-64.385177",
//                     lat: "-31.837354",
//                 },
//                 macs: [
//                     "02:cc:4e:1c:85:a6",
//                     "a8:40:41:1c:85:a4",
//                     "a8:40:41:1c:83:eb",
//                     "aa:40:41:1c:83:e3",
//                     "a8:40:41:1c:83:e3",
//                     "aa:40:41:1c:83:eb",
//                     "02:58:47:1c:85:a6",
//                     "02:ab:46:1c:85:a6",
//                 ],
//                 hostname: "ql-refu-bbone-2",
//             },
//             author: "ql-refu-bbone-2",
//         },
//         "mc-rocio": {
//             bleachTTL: 22,
//             data: {
//                 links: [
//                     "a8:40:41:1c:85:1f",
//                     "a8:40:41:1d:29:68",
//                     "9c:a2:f4:8c:b6:f4",
//                     "a8:40:41:1c:84:99",
//                     "a8:40:41:1c:86:6d",
//                     "a8:40:41:1c:85:2e",
//                 ],
//                 coordinates: {
//                     lon: "-64.38025",
//                     lat: "-31.85570",
//                 },
//                 macs: [
//                     "a8:40:41:1c:85:5a",
//                     "02:cc:4e:1d:2a:1e",
//                     "aa:40:41:1c:85:5a",
//                     "a8:40:41:1c:85:5c",
//                     "aa:40:41:1c:85:5c",
//                     "02:ab:46:1d:2a:1e",
//                     "02:58:47:1d:2a:1e",
//                     "a8:40:41:1d:2a:1c",
//                 ],
//                 hostname: "mc-rocio",
//             },
//             author: "mc-rocio",
//         },
//         "lbl-mikigonza": {
//             bleachTTL: 28,
//             data: {
//                 hostname: "lbl-mikigonza",
//                 coordinates: {
//                     lon: "-64.425602",
//                     lat: "-31.734109",
//                 },
//                 macs: [
//                     "a0:f3:c1:86:1e:f2",
//                     "a0:f3:c1:86:1e:f3",
//                     "a2:f3:c1:86:1e:f2",
//                 ],
//                 links: [""],
//             },
//             author: "lbl-mikigonza",
//         },
//         "ql-graciela-bbone": {
//             bleachTTL: 28,
//             data: {
//                 hostname: "ql-graciela-bbone",
//                 coordinates: {
//                     lon: "-64.42703",
//                     lat: "-31.80874",
//                 },
//                 macs: [
//                     "02:cc:4e:1c:85:aa",
//                     "a8:40:41:1c:83:f8",
//                     "02:ab:46:1c:85:aa",
//                     "ae:40:41:1c:85:a8",
//                     "a8:40:41:1c:83:dd",
//                     "a8:40:41:1c:85:a8",
//                     "aa:40:41:1c:85:a8",
//                     "02:58:47:1c:85:aa",
//                 ],
//                 links: ["a8:40:41:1c:86:73", "a8:40:41:1d:f9:f2"],
//             },
//             author: "ql-graciela-bbone",
//         },
//         "rl-tanque-2": {
//             bleachTTL: 23,
//             data: {
//                 links: ["a8:40:41:1c:85:a4", "9c:a2:f4:8c:b8:58"],
//                 coordinates: {
//                     lon: "-64.41609",
//                     lat: "-31.80461",
//                 },
//                 macs: [
//                     "02:58:47:1d:27:b6",
//                     "a8:40:41:1c:85:50",
//                     "a8:40:41:1d:27:b4",
//                     "aa:40:41:1d:27:b4",
//                     "a8:40:41:1c:85:4f",
//                 ],
//                 hostname: "rl-tanque-2",
//             },
//             author: "rl-tanque-2",
//         },
//         "ql-cutieddo": {
//             bleachTTL: 28,
//             data: {
//                 links: ["a8:40:41:1c:86:2d", "a0:f3:c1:85:fb:43"],
//                 coordinates: {
//                     lon: "-64.43312",
//                     lat: "-31.80787",
//                 },
//                 macs: [
//                     "a8:40:41:1d:f9:2c",
//                     "a8:40:41:1f:75:c4",
//                     "aa:40:41:1f:75:c4",
//                     "a8:40:41:1d:f8:fb",
//                     "02:ab:46:1f:74:7a",
//                     "02:cc:4e:1f:74:7a",
//                 ],
//                 hostname: "ql-cutieddo",
//             },
//             author: "ql-cutieddo",
//         },
//         "si-claudio": {
//             bleachTTL: 21,
//             data: {
//                 hostname: "si-claudio",
//                 coordinates: {
//                     lon: "-64.39444",
//                     lat: "-31.82071",
//                 },
//                 macs: [
//                     "66:70:02:4e:cd:0a",
//                     "64:70:02:4e:cd:0b",
//                     "64:70:02:4e:cd:0a",
//                     "02:ab:46:4e:cd:09",
//                 ],
//                 links: ["64:66:b3:87:4e:d1", "a8:40:41:1c:84:16"],
//             },
//             author: "si-claudio",
//         },
//         "ql-irene": {
//             bleachTTL: 25,
//             data: {
//                 links: [
//                     "a2:f3:c1:48:cf:ec",
//                     "64:70:02:4e:cc:e2",
//                     "64:70:02:4e:cc:e3",
//                     "a2:f3:c1:48:cf:ed",
//                     "a8:40:41:1c:86:96",
//                 ],
//                 coordinates: {
//                     lon: "-64.41682",
//                     lat: "-31.80584",
//                 },
//                 macs: [
//                     "02:ab:46:87:4b:37",
//                     "66:66:b3:87:4b:38",
//                     "02:58:47:87:4b:37",
//                     "64:66:b3:87:4b:38",
//                     "64:66:b3:87:4b:39",
//                     "62:66:b3:87:4b:38",
//                 ],
//                 hostname: "ql-irene",
//             },
//             author: "ql-irene",
//         },
//         "ql-guillermina": {
//             bleachTTL: 27,
//             data: {
//                 links: [
//                     "a8:40:41:1c:85:3c",
//                     "a8:40:41:1d:2a:40",
//                     "a8:40:41:1f:71:f0",
//                     "a8:40:41:1c:86:2d",
//                     "a8:40:41:1d:f9:2c",
//                 ],
//                 coordinates: {
//                     lon: "-64.43312",
//                     lat: "-31.80740",
//                 },
//                 macs: [
//                     "a0:f3:c1:85:fb:43",
//                     "02:ab:46:85:fb:41",
//                     "02:58:47:85:fb:41",
//                     "a0:f3:c1:85:fb:42",
//                     "a6:f3:c1:85:fb:42",
//                     "a2:f3:c1:85:fb:42",
//                 ],
//                 hostname: "ql-guillermina",
//             },
//             author: "ql-guillermina",
//         },
//     },
// };
