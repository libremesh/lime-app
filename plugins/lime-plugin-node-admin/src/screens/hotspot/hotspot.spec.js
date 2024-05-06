import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";
import waitForExpect from "wait-for-expect";

import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { disable, enable, getStatus } from "./src/hotspotApi";
import Hotspot from "./src/hotspotPage";

jest.mock("./src/hotspotApi");
jest.mock("utils/api");

const findConnectCheckbox = async () =>
    screen.findByLabelText("Connect to a Mobile Hotspot");

const findSubmitButton = async () =>
    screen.findByRole("button", { name: /save/i });

describe("hotspot", () => {
    beforeEach(() => {
        enable.mockImplementation(async () => null);
        disable.mockImplementation(async () => null);
        getStatus.mockImplementation(async () => ({
            enabled: false,
            connected: false,
        }));
    });

    afterEach(() => {
        disable.mockClear();
        enable.mockClear();
        getStatus.mockClear();
        cleanup();
        act(() => queryCache.clear());
    });

    it("shows config description", async () => {
        render(<Hotspot />);
        expect(
            await screen.findByText(
                "Share your mobile connection by connecting the node to a mobile hotspost"
            )
        ).toBeInTheDocument();
    });

    it("shows expandable cellphone Instructions", async () => {
        render(<Hotspot />);
        const text = await screen.findByText("Cellphone Instructions");
        expect(text).toBeInTheDocument();
        fireEvent.click(text);
        expect(
            await screen.findByText(
                "Get an additional cell phone to the one you are currently using that has a mobile data connection"
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                "With this second cell phone create an access point or hotspot with this data:"
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Network Name: internet")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Password: internet")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Encryption: WPA2 PSK")
        ).toBeInTheDocument();
        fireEvent.click(text);
        expect(screen.queryByText("Password: internet")).toBeNull();
    });

    it("shows an unchecked checkbox to enable the hotspot client", async () => {
        render(<Hotspot />);
        expect(await findConnectCheckbox()).not.toBeChecked();
    });

    it("calls the endpoint to enable the hotspot client when checked", async () => {
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(enable).toHaveBeenCalled();
        });
    });

    it("shows an error message if the hotspot can not be found", async () => {
        enable.mockImplementation(async () => {
            throw "hotspot ap not found";
        });
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        fireEvent.click(await findSubmitButton());
        expect(
            await screen.findByText(
                "The hotspot couldn’t be found," +
                    " please review the instructions above."
            )
        ).toBeInTheDocument();
    });

    it("shows an error message if there are mesh ifaces in the radio 0", async () => {
        enable.mockImplementation(async () => {
            throw "radio has mesh ifaces";
        });
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        fireEvent.click(await findSubmitButton());
        expect(
            await screen.findByText(
                "Cannot use Radio 0," + " it's being used for mesh links"
            )
        ).toBeInTheDocument();
    });

    it("show a checked checkbox when enabled", async () => {
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: false,
        }));
        render(<Hotspot />);
        expect(await findConnectCheckbox()).toBeChecked();
    });

    it("calls disable endpoint when checkbox is disabled", async () => {
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: false,
        }));
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        fireEvent.click(await findSubmitButton());
        await waitForExpect(() => {
            expect(disable).toHaveBeenCalled();
        });
    });

    it("shows the test box for cellphone connectivity when enabled", async () => {
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: false,
        }));
        render(<Hotspot />);
        expect(
            await screen.findByTestId("hotspot-phone-test")
        ).toBeInTheDocument();
    });

    it("shows the test box for internet connectivity when enabled", async () => {
        getStatus.mockImplementation(async () => ({
            enabled: true,
            connected: false,
        }));
        render(<Hotspot />);
        expect(
            await screen.findByTestId("hotspot-internet-test")
        ).toBeInTheDocument();
    });

    it("shows a loading state with explanation until the router answers again when via wifi", async () => {
        jest.useFakeTimers();
        render(<Hotspot />);
        fireEvent.click(await findConnectCheckbox());
        getStatus.mockImplementation(async () => {
            return new Promise((res) => {
                setTimeout(() => {
                    res({ enabled: true, connected: true, signal: -47 });
                }, 10000);
            });
        });
        fireEvent.click(await findSubmitButton());
        expect(await screen.findByLabelText("loading")).toBeInTheDocument();
        expect(screen.queryByTestId("hotspot-phone-test")).toBeNull();
        expect(
            await screen.findByText("The radio needs to be restarted...")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Please stay connected to the wifi network")
        ).toBeInTheDocument();
        expect(screen.queryByTestId("hotspot-phone-test")).toBeNull();
        act(() => {
            jest.advanceTimersByTime(20000);
        });
        expect(
            await screen.findByTestId("hotspot-phone-test")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("The radio needs to be restarted...")
        ).toBeNull();
        jest.useRealTimers();
    });
});
