import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";
import { route } from "preact-router";

import { getPortalConfig } from "plugins/lime-plugin-pirania/src/piraniaApi";

import { getBoardData, getChangesNeedReboot, getSession } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { getAPsData } from "./src/nodeAdminApi";
import NodeAdmin, { Hotspot, RoamingAP } from "./src/nodeAdminPage";
import { getStatus as getHotspotStatus } from "./src/screens/hotspot/src/hotspotApi";

jest.mock("./src/nodeAdminApi");
jest.mock("utils/api");
jest.mock("plugins/lime-plugin-pirania/src/piraniaApi");
jest.mock("./src/screens/hotspot/src/hotspotApi");

describe("nodeAdmin", () => {
    beforeEach(() => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: false },
            community_ap: {
                community: { enabled: true },
                enabled: true,
                ssid: "quintana-libre.org.ar",
            },
        }));
        getBoardData.mockImplementation(async () => ({
            hostname: "node-hostname",
        }));
        getChangesNeedReboot.mockImplementation(async () => ({
            "need-reboot": "no",
        }));
        getSession.mockImplementation(async () => ({
			username: "root",
        }));
        getPortalConfig.mockImplementation(async () => "some config");
        getHotspotStatus.mockImplementation(async () => ({
            enabled: false,
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("shows hostname config", async () => {
        render(<NodeAdmin />);
        expect(await screen.findByText("Node Name")).toBeInTheDocument();
        expect(await screen.findByText("node-hostname")).toBeInTheDocument();
    });

    it("routes to hostname config screen when clicking on hostname", async () => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText("node-hostname"));
        expect(route).toHaveBeenCalledWith("/nodeadmin/hostname");
    });

    it("shows wifi config when no password", async () => {
        render(<NodeAdmin />);
        expect(await screen.findByText("Wifi Password")).toBeInTheDocument();
        expect(await screen.findByText("No password")).toBeInTheDocument();
    });

    it("shows wifi config with password", async () => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: true },
            community_ap: {
                community: { enabled: true },
                enabled: true,
                ssid: "quintana-libre.org.ar",
            },
        }));
        render(<NodeAdmin />);
        expect(await screen.findByText("Wifi Password")).toBeInTheDocument();
        expect(await screen.findByText("********")).toBeInTheDocument();
    });

    it("routes to password wifi config screen when clicking on wifi", async () => {
        render(<NodeAdmin />);
        fireEvent.click(await screen.findByText("Wifi Password"));
        expect(route).toHaveBeenCalledWith("/nodeadmin/wifipassword");
    });

    it("shows config for Community Portal", async () => {
        render(<NodeAdmin />);
        expect(
            await screen.findByTestId("portal-config-item")
        ).toBeInTheDocument();
    });

    it("shows config for Roaming AP", async () => {
        render(<NodeAdmin />);
        expect(
            await screen.findByTestId("roamingAP-config-item")
        ).toBeInTheDocument();
    });

    it("shows config for Hotspot", async () => {
        render(<NodeAdmin />);
        expect(
            await screen.findByTestId("hotspot-config-item")
        ).toBeInTheDocument();
    });
});

describe("nodeAdmin config for community roaming ap", () => {
    beforeEach(() => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: false },
            community_ap: {
                community: { enabled: true },
                enabled: true,
                ssid: "quintana-libre.org.ar",
            },
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("show community roaming ap config when disabled", async () => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: true },
            community_ap: {
                community: { enabled: true },
                enabled: false,
                ssid: "quintana-libre.org.ar",
            },
        }));
        render(<RoamingAP />);
        expect(
            await screen.findByText("Community Roaming AP")
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                'Opens the "quintana-libre.org.ar" AP in this node'
            )
        ).toBeInTheDocument();
        expect(await screen.findByText("Disabled")).toBeInTheDocument();
    });

    it("shows community roaming ap config when enabled", async () => {
        getAPsData.mockImplementation(async () => ({
            node_ap: { has_password: true },
            community_ap: { community: { enabled: true }, enabled: true },
        }));
        render(<RoamingAP />);
        expect(
            await screen.findByText("Community Roaming AP")
        ).toBeInTheDocument();
        expect(await screen.findByText("Enabled")).toBeInTheDocument();
    });

    it("routes to community roaming ap screen when clicking on it", async () => {
        render(<RoamingAP />);
        fireEvent.click(await screen.findByText("Community Roaming AP"));
        expect(route).toHaveBeenCalledWith("/nodeadmin/roaming-ap");
    });
});

describe("nodeAdmin config for hotspot", () => {
    beforeEach(() => {
        getHotspotStatus.mockImplementation(async () => ({
            enabled: false,
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("shows hotspot disabled when disabled", async () => {
        render(<Hotspot />);
        expect(
            await screen.findByText("Connect to a Mobile Hotspot")
        ).toBeInTheDocument();
        expect(await screen.findByText("Disabled")).toBeInTheDocument();
    });

    it("shows hotspot disabled when enabled", async () => {
        getHotspotStatus.mockImplementation(async () => ({
            enabled: true,
        }));
        render(<Hotspot />);
        expect(
            await screen.findByText("Connect to a Mobile Hotspot")
        ).toBeInTheDocument();
        expect(await screen.findByText("Enabled")).toBeInTheDocument();
    });
});
