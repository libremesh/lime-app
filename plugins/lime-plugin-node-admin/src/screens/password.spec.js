import "@testing-library/jest-dom";
import { act, cleanup, screen, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { getChangesNeedReboot, getSession } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { changeApNamePassword, getAdminApsData } from "../nodeAdminApi";
import APPasswordPage from "./password";

jest.mock("utils/api");
jest.mock("../nodeAdminApi");

const withoutPasswordMock = async () => ({
    node_ap: { password: "", has_password: false },
});

const withPasswordMock = async () => ({
    node_ap: { password: "some-password", has_password: true },
});

const findPasswordUsageCheckbox = async () =>
    await screen.findByLabelText("Enable Password");

const findPasswordInput = async () =>
    await screen.findByTestId("password-input");

const findSubmitButton = async () =>
    await screen.findByRole("button", { name: "Save" });

describe("ap password config", () => {
    beforeEach(() => {
        getChangesNeedReboot.mockImplementation(async () => false);
        getSession.mockImplementation(async () => ({
            username: "root",
        }));
        getAdminApsData.mockImplementation(withoutPasswordMock);
        changeApNamePassword.mockImplementation(async () => null);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
        act(() => queryCache.clear());
    });

    it("shows a button to submit password config", async () => {
        render(<APPasswordPage />);
        expect(await findSubmitButton()).toBeVisible();
    });

    it("shows an unchecked switch for password usage when password is disabled", async () => {
        render(<APPasswordPage />);
        expect(await findPasswordUsageCheckbox()).not.toBeChecked();
    });

    it("doesnt show an input for password when password is disabled", async () => {
        render(<APPasswordPage />);
        expect(screen.queryByLabelText("Wifi Password")).toBeNull();
    });
    it("shows a checked switch for password usage when password is enabled", async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        expect(await findPasswordUsageCheckbox()).toBeChecked();
    });

    it("shows password input with current password when password is enabled", async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        await waitFor(async () =>
            expect(await findPasswordUsageCheckbox()).toBeInTheDocument()
        );
        expect(await findPasswordInput()).toBeVisible();
    });

    it("shows password input when password usage is switched on", async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        await waitFor(async () =>
            expect(await findPasswordUsageCheckbox()).toBeInTheDocument()
        );
        expect(await findPasswordInput()).toBeVisible();
    });

    it("hides password input when password usage is switched off", async () => {
        getAdminApsData.mockImplementation(withPasswordMock);
        render(<APPasswordPage />);
        await waitFor(async () =>
            expect(await findPasswordUsageCheckbox()).toBeInTheDocument()
        );
        expect(await findPasswordInput()).not.toBe(null);
        await userEvent.click(await screen.findByLabelText("Enable Password"));
        expect(screen.queryByTestId("password-input")).toBe(null);
    });

    it("calls api endpoint for disabling password when switched off", async () => {
        getChangesNeedReboot.mockImplementation(async () => true);
        render(<APPasswordPage />);
        await userEvent.click(await findSubmitButton());
        await waitFor(() => {
            expect(changeApNamePassword).toHaveBeenCalledWith({
                password: "",
                enablePassword: false,
            });
        });
        expect(await screen.findByTestId("changes-need-reboot")).toBeVisible();
    });
});
