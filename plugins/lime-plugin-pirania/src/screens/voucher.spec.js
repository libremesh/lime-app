import { h } from "preact";
import { screen, act, fireEvent } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import { route } from "preact-router";
import waitForExpect from "wait-for-expect";
import Voucher from "./voucher";
import { listVouchers } from "../piraniaApi";
import queryCache from "utils/queryCache";
import * as timeago from "timeago.js";

jest.mock("../piraniaApi");
const now = new Date().getTime() / 1000;
let vouchers = [
	{
		code: "PIDFIG",
		id: "x5crd4",
		activation_date: now - 600e3,
		expiration_date: now - 600e3 + 1200,
		name: "luandro",
		duration_m: 1200,
		is_active: false,
		creation_date: now - 700e3,
		permanent: false
	}
];

vouchers[0].status = vouchers[0].is_active
	? "used"
	: vouchers[0].expiration_date < Date.now()
		? "disabled"
		: "available";

describe("Voucher details", () => {
	beforeEach(() => {
		listVouchers.mockImplementation(async () => vouchers);
		render(<Voucher id={vouchers[0].id} />);
	});

	afterEach(() => {
		act(() => queryCache.clear());
	});
	it("shows the voucher code", async () => {
		expect(await screen.findByText(vouchers[0].code)).toBeInTheDocument();
	});
	it("shows the voucher status", async () => {
		expect(await screen.findByText(vouchers[0].status)).toBeInTheDocument();
	});
	it("shows the voucher description", async () => {
		expect(await screen.findByText(vouchers[0].name)).toBeInTheDocument();
	});
	it("shows the voucher expiration date", async () => {
		expect(
			await screen.findByText(
				timeago.format(new Date(vouchers[0].expiration_date * 1000))
			)
		).toBeInTheDocument();
	});
	it("shows the voucher creation date", async () => {
		expect(
			await screen.findByText(
				timeago.format(new Date(vouchers[0].creation_date * 1000))
			)
		).toBeInTheDocument();
	});
	it("shows if the voucher is permanent", async () => {
		expect(await screen.findByText("permanent")).toBeInTheDocument();
	});

	it("shows a button to edit the voucher", async () => {
		const button = await screen.findByRole("button", { name: /edit/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(route).toHaveBeenCalledWith(`/access/edit/${vouchers[0].id}`);
		});
	});
});
