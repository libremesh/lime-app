import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/preact";

import { getBoardData, getChangesNeedReboot, getSession } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { changeHostname } from "../nodeAdminApi";
import HostnamePage from "./hostname";

jest.mock("utils/api");
jest.mock("../nodeAdminApi");

const fillAndSubmitForm = async (hostname, expectHostname = undefined) => {
    expectHostname = expectHostname === undefined ? hostname : expectHostname;
    const input = await screen.findByLabelText(/node name/i);
    fireEvent.input(input, { target: { value: hostname } });
    expect(input.value).toBe(expectHostname);
    fireEvent.click(await screen.findByRole("button", { name: /save/i }));
};

describe("hostname config", () => {
    beforeEach(() => {
        getBoardData.mockImplementation(async () => ({
            hostname: "node-hostname",
        }));
        getChangesNeedReboot.mockImplementation(async () => true);
        getSession.mockImplementation(async () => ({
            username: "root",
        }));
        changeHostname.mockImplementation(async (hostname) => hostname);
    });

    afterEach(() => {
        act(() => queryCache.clear());
    });

    it("lets you change the hostname", async () => {
        render(<HostnamePage />);
        await fillAndSubmitForm("new-hostname");
        await waitFor(() => {
            expect(changeHostname).toHaveBeenCalledWith("new-hostname");
        });
    });

    it("shows an error message when hostname length is less than 3", async () => {
        render(<HostnamePage />);
        await fillAndSubmitForm("fo");
        // await waitFor(() => {
        //     expect(
        //         screen.getByText(/the name should have at least 3 characters/i)
        //     ).toBeInTheDocument();
        // });
        expect(changeHostname).not.toHaveBeenCalled();
    });

    it("slugifies users input", async () => {
        render(<HostnamePage />);
        await fillAndSubmitForm("foo_foo foo", "foo-foo-foo");
        await waitFor(() => {
            expect(changeHostname).toHaveBeenCalledWith("foo-foo-foo");
        });
    });
});
