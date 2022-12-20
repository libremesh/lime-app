import "@testing-library/jest-dom";
import { act, cleanup, screen, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { getChangesNeedReboot, getSession } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { changeApNamePassword, getAdminApsData } from "../nodeAdminApi";
import APPasswordPage from "./password";

/**
 * DISCLAIMER: by kon
 *
 * This was together on the password.spec.js before and separated due strange issue: Jest test involving react-hook-form
 * passes individually but failing together
 *
 * https://stackoverflow.com/questions/74629513/jest-test-involving-react-hook-form-passes-individually-but-failing-toguether
 *
 * This start to happen after update dependencies on this PR https://github.com/libremesh/lime-app/pull/346 where
 * upgraded core libraries
 *
 * todo: fix and merge with password.spec.js
 */

jest.mock("utils/api");
jest.mock("../nodeAdminApi");

const withoutPasswordMock = async () => ({
    node_ap: { password: "", has_password: false },
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

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("calls api endpoint for enabling password when switched on", async () => {
        render(<APPasswordPage />);
        expect(screen.queryByTestId("changes-need-reboot")).toBe(null);
        getChangesNeedReboot.mockImplementation(async () => true);

        await userEvent.click(await findPasswordUsageCheckbox());
        await userEvent.type(await findPasswordInput(), "12345678");
        await userEvent.click(await findSubmitButton());

        await waitFor(() => {
            expect(changeApNamePassword).toHaveBeenCalledWith({
                password: "12345678",
                enablePassword: true,
            });
        });
        expect(await screen.findByTestId("changes-need-reboot")).toBeVisible();
    });
});
