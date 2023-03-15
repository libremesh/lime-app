import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/preact";

import {
    StatusResponse,
    getNodeStatus,
} from "plugins/lime-plugin-rx/src/rxApi";
import { Wired } from "plugins/lime-plugin-rx/src/sections/wired";

import { render } from "utils/test_utils";

jest.mock("plugins/lime-plugin-rx/src/rxApi");
const mockedFoo = jest.mocked(getNodeStatus);

describe("align page", () => {
    beforeEach(() => {
        mockedFoo.mockImplementation(async () => mock_node_status);
    });

    it("Shows a wan and a lan interface with the interface name", async () => {
        render(<Wired />);
        expect(await screen.findByText("LAN")).toBeInTheDocument();
        expect(await screen.findByText("WAN")).toBeInTheDocument();
        expect(await screen.findByText("eth0.1")).toBeInTheDocument();
        expect(await screen.findByText("eth0.2")).toBeInTheDocument();
    });

    it("Shows the correct number of disabled and enabled icons", async () => {
        render(<Wired />);
        const portsDiv = await screen.findByTestId("ports-container");
        // eslint-disable-next-line testing-library/no-node-access
        const portsIcons = portsDiv.querySelectorAll("svg");
        const ports = mock_node_status.switch_status.filter(
            (item) => item.role !== "cpu"
        );
        expect(portsIcons.length).toBe(ports.length);
        // eslint-disable-next-line testing-library/no-node-access
        const activeIcons = portsDiv.querySelectorAll("svg.fill-disabled");
        const activePorts = ports.filter((item) => item.link !== "up");
        expect(activeIcons.length).toBe(activePorts.length);
        // eslint-disable-next-line testing-library/no-node-access
        const disabledIcons = portsDiv.querySelectorAll(
            "svg.fill-primary-dark"
        );
        const disabledPorts = ports.filter((item) => item.link !== "down");
        expect(disabledIcons.length).toBe(disabledPorts.length);
    });
});

const mock_node_status: StatusResponse = {
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
