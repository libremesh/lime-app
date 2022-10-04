import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/preact";
import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import { reboot, setChangesNeedReboot } from "utils/api";
import { render } from "utils/test_utils";

import { RebootPage } from "./";

jest.mock("utils/api");

describe("RebootPage", () => {
    beforeEach(() => {
        setChangesNeedReboot.mockClear();
        setChangesNeedReboot.mockImplementation(() => true);
        reboot.mockClear();
        reboot.mockImplementation(async () => null);
    });

    it("ask if user is sure of rebooting", async () => {
        render(<RebootPage />);
        expect(
            await screen.findByText("Are you sure you want to reboot?")
        ).toBeVisible();
    });

    it("reboots when yes is clicked", async () => {
        render(<RebootPage />);
        const yesButton = await screen.findByRole("button", { name: /yes/i });
        fireEvent.click(yesButton);
        await waitForExpect(() => {
            expect(reboot).toHaveBeenCalled();
        });
    });

    it("calls setChangesNeedReboot(no) when yes is clicked", async () => {
        render(<RebootPage />);
        const yesButton = await screen.findByRole("button", { name: /yes/i });
        fireEvent.click(yesButton);
        await waitForExpect(() => {
            expect(setChangesNeedReboot).toHaveBeenCalledWith("no");
        });
    });

    it("shows a please wait for reboot message when rebooting", async () => {
        render(<RebootPage />);
        expect(
            screen.queryByText(
                "Please wait while the device reboots, and reload the app"
            )
        ).toBeNull();
        const yesButton = await screen.findByRole("button", { name: /yes/i });
        fireEvent.click(yesButton);
        expect(
            await screen.findByText(
                "Please wait while the device reboots, and reload the app"
            )
        ).toBeVisible();
    });

    it("redirects to home when no is clicked", async () => {
        render(<RebootPage />);
        const noButton = await screen.findByRole("button", {
            name: /no, cancel/i,
        });
        fireEvent.click(noButton);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith("/");
        });
        expect(reboot).not.toHaveBeenCalled();
    });

    it("calls setChangesNeedReboot(no) when no is clicked", async () => {
        render(<RebootPage />);
        const noButton = await screen.findByRole("button", {
            name: /no, cancel/i,
        });
        fireEvent.click(noButton);
        await waitForExpect(() => {
            expect(setChangesNeedReboot).toHaveBeenCalledWith("no");
        });
    });
});
