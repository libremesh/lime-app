import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";
import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { getPortalConfig } from "../src/piraniaApi";
import { PortalConfigItem } from "./PortalConfigItem";

jest.mock("../src/piraniaApi");

describe("portal config item", () => {
    beforeEach(() => {
        getPortalConfig.mockImplementation(async () => ({
            activated: true,
            with_vouchers: true,
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("has test id portal-config-item", async () => {
        render(<PortalConfigItem />);
        expect(
            await screen.findByTestId("portal-config-item")
        ).toBeInTheDocument();
    });

    it("shows value as Enabled, with vouchers", async () => {
        render(<PortalConfigItem />);
        expect(await screen.findByText("Enabled, with vouchers")).toBeVisible();
    });

    it("shows value as Enabled, without vouchers", async () => {
        getPortalConfig.mockImplementation(async () => ({
            activated: true,
            with_vouchers: false,
        }));
        render(<PortalConfigItem />);
        expect(
            await screen.findByText("Enabled, without vouchers")
        ).toBeVisible();
    });

    it("shows value as Disabled", async () => {
        getPortalConfig.mockImplementation(async () => ({
            activated: false,
            with_vouchers: false,
        }));
        render(<PortalConfigItem />);
        expect(await screen.findByText("Disabled")).toBeVisible();
    });

    it("routes to portal config page on click", async () => {
        render(<PortalConfigItem />);
        const item = await screen.findByTestId("portal-config-item");
        fireEvent.click(item);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith("/nodeadmin/communityPortal");
        });
    });
});
