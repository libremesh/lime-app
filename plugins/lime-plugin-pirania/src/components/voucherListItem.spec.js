import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/preact";
import each from "jest-each";

import { route } from "preact-router";
import * as timeago from "timeago.js";
import waitForExpect from "wait-for-expect";

import { render } from "utils/test_utils";

import VoucherListItem from "./voucherListItem";

const voucher = {
    code: "PIDFIG",
    id: "x5crd4",
    activation_deadline: 1633022276, // creation_date + 1 week
    name: "luandro",
    duration_m: 10000,
    creation_date: 1632417476, // Sep 23 2021 14:17:56 GMT-0300
    permanent: false,
    status: "available",
    author_node: "ml-luandro",
};

describe("voucher list item", () => {
    it("has test id voucher-item-{voucher.id}", async () => {
        render(<VoucherListItem {...voucher} />);
        expect(
            await screen.findByTestId("voucher-item-x5crd4")
        ).toBeInTheDocument();
    });

    it("shows the voucher code", async () => {
        render(<VoucherListItem {...voucher} />);
        expect(await screen.findByText(voucher.code)).toBeInTheDocument();
    });

    it("shows voucher name and author node", async () => {
        render(<VoucherListItem {...voucher} />);
        expect(
            await screen.findByText(`${voucher.author_node}: ${voucher.name}`)
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
            const voucher_ = { ...voucher, status };
            render(<VoucherListItem {...voucher_} />);
            // eslint-disable-next-line jest/no-standalone-expect
            expect(await screen.findByText(expected)).toBeInTheDocument();
        }
    );

    it("shows vouchers creation date", async () => {
        render(<VoucherListItem {...voucher} />);
        const timeAgo = timeago.format(new Date(voucher.creation_date * 1000));
        expect(
            await screen.findByText(`Created ${timeAgo}`)
        ).toBeInTheDocument();
    });

    it("shows expired date when its active and has expiration date", async () => {
        const voucher_ = {
            ...voucher,
            expiration_date: new Date().getTime() / 1000 + 10e5,
            status: "active",
        };
        const timeAhead = timeago.format(voucher_.expiration_date * 1000);
        render(<VoucherListItem {...voucher_} />);
        expect(
            await screen.findByText(`Expires ${timeAhead}`)
        ).toBeInTheDocument();
        expect(screen.queryByText(/Activation deadline.*/)).toBeNull();
        expect(screen.queryByText("Permament")).toBeNull();
    });

    it("shows expired date when its expired", async () => {
        const voucher_ = {
            ...voucher,
            expiration_date: new Date().getTime() / 1000 - 10e5,
            status: "expired",
        };
        const timeAgo = timeago.format(voucher_.expiration_date * 1000);
        render(<VoucherListItem {...voucher_} />);
        expect(
            await screen.findByText(`Expired ${timeAgo}`)
        ).toBeInTheDocument();
        expect(screen.queryByText(/Activation deadline.*/)).toBeNull();
        expect(screen.queryByText(/Expires.*/)).toBeNull();
        expect(screen.queryByText("Permanent")).toBeNull();
    });

    it("shows permanent legend when it is active an has no expiration date", async () => {
        const voucher_ = { ...voucher, status: "active", permanent: true };
        render(<VoucherListItem {...voucher_} />);
        expect(await screen.findByText("Permanent")).toBeInTheDocument();
        expect(screen.queryByText(/Activation deadline.*/)).toBeNull();
        expect(screen.queryByText(/Expires.*/)).toBeNull();
        expect(screen.queryByText(/Expired.*/)).toBeNull();
    });

    it("shows activation deadline when it is available and has an activation deadline", async () => {
        const timeAhead = timeago.format(voucher.activation_deadline * 1000);
        render(<VoucherListItem {...voucher} />);
        expect(
            await screen.findByText(`Activation deadline: ${timeAhead}`)
        ).toBeInTheDocument();
        expect(screen.queryByText(/Expires.*/)).toBeNull();
        expect(screen.queryByText(/Expired.*/)).toBeNull();
        expect(screen.queryByText("Permanent")).toBeNull();
    });

    it("routes to the voucher detail screen on click", async () => {
        render(<VoucherListItem {...voucher} />);
        const element = await screen.findByTestId("voucher-item-x5crd4");
        expect(element).toBeInTheDocument();
        fireEvent.click(element);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith(`/access/view/${voucher.id}`);
        });
    });
});
