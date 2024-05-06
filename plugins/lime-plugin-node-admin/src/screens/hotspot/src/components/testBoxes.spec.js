import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";

import { checkInternet, getChangesNeedReboot, getSession } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { getStatus } from "../hotspotApi";
import { ConnectionToTheInternet, ConnectionToThePhone } from "./testBoxes";

jest.mock("utils/api");
jest.mock("../hotspotApi");

describe("ConnectionToThePhone TestBox", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        getChangesNeedReboot.mockImplementation(async () => false);
        getSession.mockImplementation(async () => ({
            username: "root",
        }));
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: false,
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("has title id hotspot-phone-test", async () => {
        render(<ConnectionToThePhone />);
        expect(screen.getByTestId("hotspot-phone-test")).toBeInTheDocument();
    });

    it("shows title", async () => {
        render(<ConnectionToThePhone />);
        expect(
            await screen.findByText("Connection to the cellphone")
        ).toBeInTheDocument();
    });

    it("shows connected and signal when the node is connected to the cellphone", async () => {
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: true,
            signal: -47,
        }));
        render(<ConnectionToThePhone />);
        expect(await screen.findByText("Connected")).toBeInTheDocument();
        expect(await screen.findByText("-47")).toBeInTheDocument();
        expect(await screen.findByText("dBm")).toBeInTheDocument();
    });

    it("shows not connected when the node is not connected to the cellphone", async () => {
        render(<ConnectionToThePhone />);
        expect(await screen.findByText("Not Connected")).toBeInTheDocument();
    });

    it("shows loading while fetching", async () => {
        render(<ConnectionToThePhone />);
        expect(screen.getByLabelText("loading")).toBeInTheDocument();
    });

    it("refreshes on click", async () => {
        render(<ConnectionToThePhone />);
        expect(await screen.findByText("Not Connected")).toBeInTheDocument();
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: true,
        }));
        const elem = screen.getByTestId("hotspot-phone-test");
        fireEvent.click(elem);
        expect(await screen.findByText("Connected")).toBeInTheDocument();
    });
});

describe("ConnectionToTheInternet TestBox", () => {
    beforeEach(() => {
        getChangesNeedReboot.mockImplementation(async () => ({
            "need-reboot": "no",
        }));
        getSession.mockImplementation(async () => ({
            username: "root",
        }));
        checkInternet.mockImplementation(async () => ({
            connected: false,
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("has title id hotspot-internet-test", async () => {
        render(<ConnectionToTheInternet />);
        expect(screen.getByTestId("hotspot-internet-test")).toBeInTheDocument();
    });

    it("shows title", async () => {
        render(<ConnectionToTheInternet />);
        expect(
            await screen.findByText("Connection to the internet")
        ).toBeInTheDocument();
    });

    it("shows connected when the node is connected to the cellphone", async () => {
        checkInternet.mockImplementation(async () => ({ connected: true }));
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText("Connected")).toBeInTheDocument();
    });

    it("shows not connected when the node is not conencted to the cellphone", async () => {
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText("Not Connected")).toBeInTheDocument();
    });

    it("shows loading while fetching", async () => {
        render(<ConnectionToTheInternet />);
        expect(screen.getByLabelText("loading")).toBeInTheDocument();
    });

    it("refreshes on click", async () => {
        render(<ConnectionToTheInternet />);
        expect(await screen.findByText("Not Connected")).toBeInTheDocument();
        checkInternet.mockImplementation(async () => ({ connected: true }));
        const elem = screen.getByTestId("hotspot-internet-test");
        fireEvent.click(elem);
        expect(await screen.findByText("Connected")).toBeInTheDocument();
    });
});
