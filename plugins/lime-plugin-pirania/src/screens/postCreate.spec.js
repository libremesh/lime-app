import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/preact";
import { route } from "preact-router";
import * as timeago from "timeago.js";
import waitForExpect from "wait-for-expect";

import { render } from "utils/test_utils";

import PostCreate from "./postCreate";

const vouchers = [
    {
        code: "PIDFIG",
        id: "x5crd4",
        name: "for luandro",
        duration_m: 14400,
        status: "available",
    },
    {
        code: "NNDAMD",
        id: "fteNhN",
        name: "for luandro",
        duration_m: 14400,
        status: "available",
    },
    {
        code: "BAVWNS",
        id: "5nLNT9",
        name: "for luandro",
        duration_m: 14400,
    },
];

describe("voucher post create screen", () => {
    it("renders the code for each created voucher", async () => {
        render(<PostCreate vouchers={vouchers} />);
        for (let i = 0; i < vouchers.length; i++) {
            const v = vouchers[i];
            expect(await screen.findByText(v.code)).toBeInTheDocument();
        }
    });

    it("shows description", async () => {
        render(<PostCreate vouchers={vouchers} />);
        expect(
            await screen.findByText(`Description: ${vouchers[0].name}`)
        ).toBeInTheDocument();
    });

    it("shows duration in days if not permanent", async () => {
        render(<PostCreate vouchers={vouchers} />);
        const durationDays = parseInt(vouchers[0].duration_m / (24 * 60), 10);
        expect(
            await screen.findByText(`Duration: ${durationDays} days`)
        ).toBeInTheDocument();
    });

    it("shows duration as is permanent if it is", async () => {
        let vouchers_ = [];
        vouchers.forEach((v) => {
            vouchers_ = [...vouchers_, { ...v, duration_m: null }];
        });
        render(<PostCreate vouchers={vouchers_} />);
        expect(
            await screen.findByText("Duration: is permanent")
        ).toBeInTheDocument();
    });

    it("shows activation deadline if it has one", async () => {
        let vouchers_ = [];
        vouchers.forEach((v) => {
            vouchers_ = [
                ...vouchers_,
                { ...v, activation_deadline: 1637952217 },
            ];
        });
        const timeAgo = timeago.format(
            new Date(vouchers_[0].activation_deadline * 1000)
        );
        render(<PostCreate vouchers={vouchers_} />);
        const text = `Activation deadline: ${timeAgo}`;
        expect(
            await screen.findByText(text.substring(0, text.length - 3).trim(), {
                exact: false,
            })
        ).toBeInTheDocument();
    });

    it("shows an ok button that brings you back to vouchers list", async () => {
        render(<PostCreate vouchers={vouchers} />);
        const button = await screen.findByRole("button", { name: /ok/i });
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith("/access");
        });
    });
});
