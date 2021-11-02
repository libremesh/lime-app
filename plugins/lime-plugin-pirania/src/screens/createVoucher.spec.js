import { h } from "preact";
import { screen, fireEvent } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import waitForExpect from "wait-for-expect";
import CreateVoucher from "./createVoucher";
import { addVoucher } from "../piraniaApi";
jest.mock("../piraniaApi");

const voucher = {
	name: "luandro",
	duration_m: 1200,
	qty: 2,
	permanent: false
};

describe("Create voucher", () => {
	beforeEach(() => {
		addVoucher.mockImplementation(async () => [voucher]);
		render(<CreateVoucher />);
	});
	it("shows a text input for description and label description", async () => {
		const input = await screen.findByLabelText(`Voucher group description`);
		expect(input).toBeInTheDocument();
	});
	it("shows a number input for duration and label duration", async () => {
		const input = await screen.findByLabelText(`Voucher duration in days`);
		expect(input).toBeInTheDocument();

	});
	it("shows a number input for quantity and label number of vouchers", async () => {
		const input = await screen.findByLabelText(`Number of vouchers`);
		expect(input).toBeInTheDocument();
	});
	it("shows a select input with default unselected and label permanent ", async () => {
		const input = await screen.findByLabelText(`Is permanent`);
		expect(input).toBeInTheDocument();
		fireEvent.change(input, { target: { value: true } });
		expect(input.value).toBe("true");
	});

	it("shows a button to create a new voucher that creates voucher with data", async () => {
		const button = await screen.findByRole("button", { name: /create/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(addVoucher).toHaveBeenCalledTimes(1);
		});
	});
});
