import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";
import { h } from "preact";
import waitForExpect from "wait-for-expect";

import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { changeHostname } from "../nodeAdminApi";
import HostnamePage from "./hostname";

jest.mock("../nodeAdminApi");

describe("hostname config", () => {
    beforeEach(() => {
        changeHostname.mockClear();
        changeHostname.mockImplementation(async (hostname) => hostname);
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("lets you change the hostname", async () => {
        render(<HostnamePage />);
        const input = await screen.findByLabelText(/node name/i);
        fireEvent.input(input, { target: { value: "new-hostname" } });
        const saveButton = await screen.findByRole("button", { name: /save/i });
        fireEvent.click(saveButton);
        await waitForExpect(() => {
            expect(changeHostname).toHaveBeenCalledWith("new-hostname");
        });
        expect(await screen.findByTestId("changes-need-reboot")).toBeVisible();
    });

    it("shows an error message when hostname length is less than 3", async () => {
        render(<HostnamePage />);
        const input = await screen.findByLabelText(/node name/i);
        fireEvent.input(input, { target: { value: "a" } });
        const saveButton = await screen.findByRole("button", { name: /save/i });
        fireEvent.click(saveButton);
        expect(
            await screen.findByText(
                /the name should have at least 3 characters/i
            )
        ).toBeVisible();
        expect(changeHostname).not.toHaveBeenCalled();
    });

    it("slugifies users input", async () => {
        render(<HostnamePage />);
        const input = await screen.findByLabelText(/node name/i);
        fireEvent.input(input, { target: { value: "foo_foo foo" } });
        expect(input.value).toBe("foo-foo-foo");
        const saveButton = await screen.findByRole("button", { name: /save/i });
        fireEvent.click(saveButton);
        await waitForExpect(() => {
            expect(changeHostname).toHaveBeenCalledWith("foo-foo-foo");
        });
        expect(await screen.findByTestId("changes-need-reboot")).toBeVisible();
    });
});
