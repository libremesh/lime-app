import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";

import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import { checkInternet } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { closeSession, getSession, openSession } from "./src/remoteSupportApi";
import RemoteSupportPage from "./src/remoteSupportPage";

jest.mock("./src/remoteSupportApi");
jest.mock("utils/api");

describe("remote support page", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    beforeEach(() => {
        getSession.mockImplementation(async () => ({
            rw_ssh: "ssh -p2222 test_rw_token@test_host",
            ro_ssh: "ssh -p2222 test_ro_token@test_host",
        }));
        openSession.mockImplementation(async () => null);
        closeSession.mockImplementation(async () => null);
        checkInternet.mockImplementation(async () => ({ connected: true }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("shows a message with a link to hotspot when the node has no internet connection", async () => {
        checkInternet.mockImplementation(async () => ({ connected: false }));
        render(<RemoteSupportPage />);
        expect(
            await screen.findByText("Your node has no internet connection")
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                "To enable remote access an internet connection is needed"
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                "You can share your mobile connection to the node by setting up a mobile hotspot"
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByRole("button", { name: "Setup Hotspot" })
        ).toBeInTheDocument();
    });

    it("redirects to hostpot page when clicking on Setup Hotspot button", async () => {
        checkInternet.mockImplementation(async () => ({ connected: false }));
        render(<RemoteSupportPage />);
        const button = await screen.findByRole("button", {
            name: "Setup Hotspot",
        });
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith("/nodeadmin/hotspot");
        });
    });

    it("shows a button to create session when there is no session", async () => {
        getSession.mockImplementation(async () => null);
        render(<RemoteSupportPage />);
        expect(
            await screen.findByRole("button", { name: /create session/i })
        ).toBeEnabled();
    });

    it("shows rw session token when there is an open session", async () => {
        render(<RemoteSupportPage />);
        expect(
            await screen.findByText("ssh -p2222 test_rw_token@test_host")
        ).toBeInTheDocument();
    });

    it("shows a button to close session when there is an open session", async () => {
        render(<RemoteSupportPage />);
        expect(
            await screen.findByRole("button", { name: /close session/i })
        ).toBeEnabled();
    });

    it("shows rw session token after clicking on open session", async () => {
        getSession
            .mockImplementationOnce(async () => null)
            .mockImplementationOnce(async () => ({
                rw_ssh: "ssh -p2222 test_rw_token@test_host",
                ro_ssh: "ssh -p2222 test_ro_token@test_host",
            }));
        render(<RemoteSupportPage />);
        const createButton = await screen.findByRole("button", {
            name: /create session/i,
        });
        fireEvent.click(createButton);
        expect(
            await screen.findByText("ssh -p2222 test_rw_token@test_host")
        ).toBeInTheDocument();
    });

    it("show an error when open session fails", async () => {
        getSession.mockImplementation(async () => null);
        openSession.mockImplementation(async () => {
            throw new Error();
        });
        render(<RemoteSupportPage />);
        const createButton = await screen.findByRole("button", {
            name: /create session/i,
        });
        fireEvent.click(createButton);
        expect(
            await screen.findByText(
                /Cannot connect to the remote support server/i
            )
        ).toBeVisible();
    });

    it("shows a button to show the console when there is an active session", async () => {
        render(<RemoteSupportPage />);
        expect(
            await screen.findByRole("button", { name: /show console/i })
        ).toBeEnabled();
    });
});
