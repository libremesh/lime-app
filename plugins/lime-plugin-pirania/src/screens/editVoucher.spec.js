import { h } from "preact";
import { screen } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import EditVoucher from "./editVoucher";
import { listVouchers } from "../piraniaApi";
const now = Date.now();
jest.mock("../piraniaApi");

let voucher = {
	code: "PIDFIG",
	id: "x5crd4",
	activation_date: now - 600e3,
	name: "luandro",
	duration_m: 1200,
	is_active: false,
	creation_date: now - 700e3,
	permanent: false
};

describe("Edit voucher", () => {
	beforeEach(() => {
		listVouchers.mockImplementation(async () => [voucher]);
		render(<EditVoucher id={voucher.id} />);
	});


	it("has input for changing description with label", async () => {
		const input = await screen.findByLabelText(`description`);
		expect(input).toBeInTheDocument();
	});
	it("shows a button to edit the voucher", async () => {
		const button = await screen.findByRole("button", { name: /save/i });
		expect(button).toBeInTheDocument();
	});
});
