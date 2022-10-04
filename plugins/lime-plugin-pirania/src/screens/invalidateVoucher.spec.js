import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/preact";

import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import { render } from "utils/test_utils";

import { invalidate } from "../piraniaApi";
import InvalidateVoucher from "./invalidateVoucher";

jest.mock("../piraniaApi");

let voucher = {
    id: "x5crd4",
};

describe("Invalidate Voucher Page", () => {
    beforeEach(() => {
        invalidate.mockClear();
        invalidate.mockImplementation(async () => null);
    });

    it("ask if user is sure of invalidating", async () => {
        render(<InvalidateVoucher id={voucher.id} />);
        expect(
            await screen.findByText(
                "If you invalidate this voucher no one will be able to use it anymore. This cannot be reverted."
            )
        ).toBeVisible();
        expect(await screen.findByText("Are you sure?")).toBeVisible();
    });

    it("invalidate when yes is clicked and goes back to view", async () => {
        render(<InvalidateVoucher id={voucher.id} />);
        const yesButton = await screen.findByRole("button", { name: /yes/i });
        fireEvent.click(yesButton);
        await waitForExpect(() => {
            expect(invalidate).toHaveBeenCalledWith(voucher.id);
            expect(route).toHaveBeenCalledWith(`/access/view/${voucher.id}`);
        });
    });

    it("goes back to voucher view when no is clicked", async () => {
        render(<InvalidateVoucher id={voucher.id} />);
        const noButton = await screen.findByRole("button", {
            name: /no, cancel/i,
        });
        fireEvent.click(noButton);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith(`/access/view/${voucher.id}`);
        });
        expect(invalidate).not.toHaveBeenCalled();
    });
});
