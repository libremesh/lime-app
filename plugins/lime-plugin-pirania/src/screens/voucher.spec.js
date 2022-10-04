import { i18n } from "@lingui/core";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/preact";
import each from "jest-each";

import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { listVouchers } from "../piraniaApi";
import Voucher from "./voucher";

jest.mock("../piraniaApi");
const now = Math.floor(new Date().getTime() / 1000);
const voucher = {
    code: "PIDFIG",
    id: "x5crd4",
    name: "luandro",
    duration_m: 60 * 24 * 3,
    creation_date: now - 700e3,
    status: "available",
    author_node: "ml-luandro",
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const text = i18n.date(date, { dateStyle: "medium", timeStyle: "medium" });
    return text;
};

describe("Voucher details", () => {
    beforeEach(() => {
        listVouchers.mockImplementation(async () => [voucher]);
    });

    afterEach(() => {
        act(() => queryCache.clear());
    });

    it("shows the voucher code", async () => {
        render(<Voucher id={voucher.id} />);
        expect(await screen.findByText(voucher.code)).toBeInTheDocument();
    });

    it("shows description", async () => {
        render(<Voucher id={voucher.id} />);
        expect(
            await screen.findByText(`Description: ${voucher.name}`)
        ).toBeInTheDocument();
    });

    it("shows the voucher author", async () => {
        render(<Voucher id={voucher.id} />);
        expect(
            await screen.findByText(`Author node: ${voucher.author_node}`)
        ).toBeInTheDocument();
    });

    it("shows the voucher creation date", async () => {
        render(<Voucher id={voucher.id} />);
        expect(
            await screen.findByText(
                `Creation date: ${formatDate(voucher.creation_date)}`
            )
        ).toBeInTheDocument();
    });

    each([
        ["Active", "active"],
        ["Expired", "expired"],
        ["Available", "available"],
        ["Invalidated", "invalidated"],
    ]).it(
        "shows the voucher status as %s when status is %s",
        async (expected, status) => {
            const voucher_ = {
                ...voucher,
                status,
            };
            listVouchers.mockImplementation(async () => [voucher_]);
            render(<Voucher id={voucher_.id} />);
            // eslint-disable-next-line jest/no-standalone-expect
            expect(
                await screen.findByText(`Status: ${expected}`)
            ).toBeInTheDocument();
        }
    );

    it("shows the voucher activation date if active", async () => {
        const voucher_ = {
            ...voucher,
            status: "active",
            activation_date: now - 600e3,
        };
        listVouchers.mockImplementation(async () => [voucher_]);
        render(<Voucher id={voucher_.id} />);
        expect(
            await screen.findByText(
                `Activation date: ${formatDate(voucher_.activation_date)}`
            )
        ).toBeInTheDocument();
    });

    it("shows the voucher expiration date if it's expired", async () => {
        const voucher_ = {
            ...voucher,
            status: "expired",
            expiration_date: now - 700e3,
        };
        listVouchers.mockImplementation(async () => [voucher_]);
        render(<Voucher id={voucher_.id} />);
        expect(
            await screen.findByText(
                `Expiration date: ${formatDate(voucher_.expiration_date)}`
            )
        ).toBeInTheDocument();
    });

    it("shows duration in days if not permanent", async () => {
        render(<Voucher id={voucher.id} />);
        const durationDays = parseInt(voucher.duration_m / (24 * 60), 10);
        expect(
            await screen.findByText(`Duration: ${durationDays} days`)
        ).toBeInTheDocument();
    });

    it("shows duration as is permanent if it is", async () => {
        listVouchers.mockImplementation(async () => [
            { ...voucher, permanent: true },
        ]);
        render(<Voucher id={voucher.id} />);
        expect(
            await screen.findByText("Duration: is permanent")
        ).toBeInTheDocument();
    });

    it("shows a button to edit the voucher", async () => {
        render(<Voucher id={voucher.id} />);
        const button = await screen.findByRole("button", { name: /edit/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith(`/access/edit/${voucher.id}`);
        });
    });

    each(["active", "available"]).it(
        "shows a button to invalidate the voucher if its %s",
        async (status) => {
            listVouchers.mockImplementation(async () => [
                { ...voucher, status },
            ]);
            render(<Voucher id={voucher.id} />);
            const button = await screen.findByRole("button", {
                name: /invalidate/i,
            });
            // eslint-disable-next-line jest/no-standalone-expect
            expect(button).toBeInTheDocument();
            fireEvent.click(button);
            await waitForExpect(() => {
                // eslint-disable-next-line jest/no-standalone-expect
                expect(route).toHaveBeenCalledWith(
                    `/access/invalidate/${voucher.id}`
                );
            });
        }
    );

    each(["expired", "invalidated"]).it(
        "doesnt show a button to invalidate the voucher if it is %s",
        async (status) => {
            listVouchers.mockImplementation(async () => [
                {
                    ...voucher,
                    status,
                },
            ]);
            render(<Voucher id={voucher.id} />);
            // wait for something to be rendered.
            // eslint-disable-next-line jest/no-standalone-expect
            expect(await screen.findByText(voucher.code)).toBeInTheDocument();
            // eslint-disable-next-line jest/no-standalone-expect
            expect(
                screen.queryByRole("button", { name: /invalidate/i })
            ).toBeNull();
        }
    );
});
