import {
    IBaseLink,
    IBatmanLinks,
    ILinks,
    INodes,
    IWifiLinks,
    LinkType,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

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
};

const newNode = {
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
    primero: {
        src_loc: {
            long: "-64.41609",
            lat: "-31.80461",
        },
        links: {
            A0F3C1462897a840411df935: {
                tx_rate: 150000,
                rx_rate: 180000,
                chains: [-63, -59],
                channel: 13,
                signal: -58,
                src_mac: "a8:40:41:1d:f9:35",
                dst_mac: "A0:F3:C1:46:28:97",
            },
            "14CC20DA4EACa840411df935": {
                channel: 13,
                tx_rate: 162000,
                rx_rate: 240000,
                chains: [-57, -51],
                signal: -50,
                src_mac: "a8:40:41:1d:f9:35",
                dst_mac: "14:CC:20:DA:4E:AC",
            },
        },
    },
    segundo: {
        src_loc: {
            long: "-64.43209",
            lat: "-31.79461",
        },
        links: {
            A0F3C1461197a840411df9ff: {
                channel: 13,
                tx_rate: 150000,
                rx_rate: 180000,
                chains: [-58, -59],
                signal: -58,
                src_mac: "a8:40:41:1d:f9:ff",
                dst_mac: "A0:F3:C1:46:11:97",
            },
            "14CC20DA4EACa840411df9aa": {
                channel: 13,
                tx_rate: 162000,
                rx_rate: 240000,
                chains: [-52, -51],
                signal: -50,
                src_mac: "a8:40:41:1d:f9:aa",
                dst_mac: "14:CC:20:DA:4E:AC",
            },
        },
    },
    "LiMe-da4eaa": {
        src_loc: {
            long: "-64.42315",
            lat: "-31.79461",
        },
        links: {
            "14cc20da4eabA0F3C1462896": {
                channel: 13,
                tx_rate: 65000,
                rx_rate: 65000,
                chains: [-25, -25],
                signal: -25,
                src_mac: "14:cc:20:da:4e:ab",
                dst_mac: "A0:F3:C1:46:28:96",
            },
            "14cc20da4eacA0F3C1462897": {
                channel: 13,
                tx_rate: 270000,
                rx_rate: 150000,
                chains: [-50, -47],
                signal: -45,
                src_mac: "14:cc:20:da:4e:ac",
                dst_mac: "A0:F3:C1:46:28:97",
            },
            "14cc20da4eacA840411DF935": {
                channel: 13,
                tx_rate: 243000,
                rx_rate: 162000,
                chains: [-75, -64],
                signal: -64,
                src_mac: "14:cc:20:da:4e:ac",
                dst_mac: "A8:40:41:1D:F9:35",
            },
            "14cc20da4eacA840411DF9aa": {
                channel: 13,
                tx_rate: 243000,
                rx_rate: 162000,
                chains: [-75, -64],
                signal: -64,
                src_mac: "14:cc:20:da:4e:ac",
                dst_mac: "A8:40:41:1D:F9:aa",
            },
        },
    },
    "LiMe-462895": {
        src_loc: {
            long: "-64.42703",
            lat: "-31.80874",
        },
        links: {
            "14CC20DA4EABa0f3c1462896": {
                channel: 13,
                tx_rate: 78000,
                rx_rate: 78000,
                chains: [-43, -46],
                signal: 2,
                src_mac: "a0:f3:c1:46:28:96",
                dst_mac: "14:CC:20:DA:4E:AB",
                dst_loc: {
                    long: "-64.42315",
                    lat: "-31.79461",
                },
            },
            "14CC20DA4EACa0f3c1462897": {
                channel: 13,
                tx_rate: 243000,
                rx_rate: 216000,
                chains: [-68, -41],
                signal: -41,
                src_mac: "a0:f3:c1:46:28:97",
                dst_mac: "14:CC:20:DA:4E:AC",
                dst_loc: {
                    long: "-64.42315",
                    lat: "-31.79461",
                },
            },
            A840411DF935a0f3c1462897: {
                channel: 13,
                tx_rate: 240000,
                rx_rate: 135000,
                chains: [-77, -65],
                signal: -65,
                src_mac: "a0:f3:c1:46:28:97",
                dst_mac: "A8:40:41:1D:F9:35",
                dst_loc: {
                    long: "-64.42314",
                    lat: "-31.79461",
                },
            },
            A840411DF9ffa0f3c1461197: {
                channel: 13,
                tx_rate: 240000,
                rx_rate: 135000,
                chains: [-64, -65],
                signal: -65,
                src_mac: "a0:f3:c1:46:11:97",
                dst_mac: "A8:40:41:1D:F9:ff",
                dst_loc: {
                    long: "-64.42315",
                    lat: "-31.79461",
                },
            },
        } as IBaseLink<"wifi_links_info">,
    },
} as IWifiLinks;

export const batManReferenceState: IBatmanLinks = {
    primero: {
        src_loc: {
            long: "-64.41609",
            lat: "-31.80461",
        },
        links: {
            "02dbd646289502dbd6da4eaa": {
                hard_ifindex: 18,
                last_seen_msecs: 1300,
                iface: "eth0-1_250",
                dst_mac: "02:db:d6:da:4e:aa",
                src_mac: "02:db:d6:46:28:95",
            },
            "02ab4646289502ab46da4eaa": {
                hard_ifindex: 26,
                last_seen_msecs: 20,
                iface: "wlan1-mesh_250",
                dst_mac: "02:ab:46:da:4e:aa",
                src_mac: "02:ab:46:46:28:95",
            },
            "02ab4646289502ab46fc3abd": {
                hard_ifindex: 26,
                last_seen_msecs: 40,
                iface: "wlan1-mesh_250",
                dst_mac: "02:ab:46:fc:3a:bd",
                src_mac: "02:ab:46:46:28:95",
            },
            "025847462895025847fc3abd": {
                hard_ifindex: 28,
                last_seen_msecs: 1710,
                iface: "wlan0-mesh_250",
                dst_mac: "02:58:47:fc:3a:bd",
                src_mac: "02:58:47:46:28:95",
            },
            "025847462895025847da4eaa": {
                hard_ifindex: 28,
                last_seen_msecs: 1450,
                iface: "wlan0-mesh_250",
                dst_mac: "02:58:47:da:4e:aa",
                src_mac: "02:58:47:46:28:95",
            },
        },
    },
    "LiMe-da4eaa": {
        src_loc: {
            long: "-64.42315",
            lat: "-31.79461",
        },
        links: {
            "02ab46da4eaa02ab46fc3abd": {
                hard_ifindex: 26,
                last_seen_msecs: 1670,
                iface: "wlan1-mesh_250",
                dst_mac: "02:ab:46:da:4e:aa",
                src_mac: "02:ab:46:fc:3a:bd",
            },
            "02ab4646289502ab46fc3abd": {
                hard_ifindex: 26,
                last_seen_msecs: 1350,
                iface: "wlan1-mesh_250",
                dst_mac: "02:ab:46:46:28:95",
                src_mac: "02:ab:46:fc:3a:bd",
            },
            "025847462895025847fc3abd": {
                hard_ifindex: 28,
                last_seen_msecs: 1430,
                iface: "wlan0-mesh_250",
                dst_mac: "02:58:47:46:28:95",
                src_mac: "02:58:47:fc:3a:bd",
            },
            "025847da4eaa025847fc3abd": {
                hard_ifindex: 28,
                last_seen_msecs: 1030,
                iface: "wlan0-mesh_250",
                dst_mac: "02:58:47:da:4e:aa",
                src_mac: "02:58:47:fc:3a:bd",
            },
        },
    },
    segundo: {
        src_loc: {
            long: "-64.43209",
            lat: "-31.79461",
        },
        links: {
            "02dbd646289502dbd6da4eaa": {
                hard_ifindex: 18,
                last_seen_msecs: 1670,
                src_mac: "02:db:d6:da:4e:aa",
                dst_mac: "02:db:d6:46:28:95",
                iface: "eth0-1_250",
            },
            "025847462895025847da4eaa": {
                hard_ifindex: 26,
                last_seen_msecs: 550,
                src_mac: "02:58:47:da:4e:aa",
                dst_mac: "02:58:47:46:28:95",
                iface: "wlan0-mesh_250",
            },
            "025847da4eaa025847fc3abd": {
                hard_ifindex: 26,
                last_seen_msecs: 260,
                src_mac: "02:58:47:da:4e:aa",
                dst_mac: "02:58:47:fc:3a:bd",
                iface: "wlan0-mesh_250",
            },
            "02ab46da4eaa02ab46fc3abd": {
                hard_ifindex: 28,
                last_seen_msecs: 340,
                src_mac: "02:ab:46:da:4e:aa",
                dst_mac: "02:ab:46:fc:3a:bd",
                iface: "wlan1-mesh_250",
            },
            "02ab4646289502ab46da4eaa": {
                hard_ifindex: 28,
                last_seen_msecs: 550,
                src_mac: "02:ab:46:da:4e:aa",
                dst_mac: "02:ab:46:46:28:95",
                iface: "wlan1-mesh_250",
            },
        },
    },
} as ILinks<"bat_links_info">;

// Use the same as on the reference state deleting a specific node
// const nodeName = "LiMe-462895";
const nodeName = "primero";

// Used to delete a mac from a node. To see what happend if the returning list is different
// This will delete a mac from the node macs list
const macToDelete = "";
// const macToDelete = "a0:f3:c1:46:11:97";
// delete a link where the src_mac is
// const linkToDelete = macToDelete;
const linkToDelete = "A840411DF9ffa0f3c1461197";
// const linkToDelete = "";

export const links = <T extends LinkType>(type: T): ILinks<T> => {
    const data =
        type === "wifi_links_info" ? linksReferenceState : batManReferenceState;

    // Create a deep copy of the state to avoid mutating the original object
    const newState: ILinks<T> = JSON.parse(JSON.stringify(data));

    let source_links_to_remove = [];
    if (nodeName) {
        // Get source_macs from the node to be removed
        source_links_to_remove = Object.keys(newState[nodeName]);
        // Remove the specified node
        delete newState[nodeName];
    }

    // Remove data items with matching dest_mac in other objects
    Object.keys(newState).forEach((nodeKey: string) => {
        Object.keys(newState[nodeKey]).forEach((linkKey: string) => {
            if (
                source_links_to_remove.includes(linkKey) ||
                linkKey === linkToDelete
            ) {
                delete newState[nodeKey][linkKey];
            }
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

    return { ...newState, ...newNode };
};
