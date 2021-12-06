import { h } from "preact";
import { screen, fireEvent } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import waitForExpect from "wait-for-expect";
import CreateVoucher from "./createVoucher";
import { addVoucher } from "../piraniaApi";
import userEvent from "@testing-library/user-event";
import { dateToLocalUnixTimestamp } from 'utils/time';
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

	it("shows a text input for description of the voucher group", async () => {
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

	it("shows a checkbox input with default unselected and label permanent ", async () => {
		const input = await screen.findByLabelText(`Is permanent`);
		expect(input).not.toBeChecked();
		fireEvent.click(input);
		expect(input).toBeChecked();
	});

	it("shows an optional input for activation deadline", async () => {
		const checkbox = await screen.findByLabelText("Setup activation deadline");
		expect(checkbox).not.toBeChecked();
		const dateInput = await screen.findByLabelText("Activation deadline");
		expect(dateInput).toBeDisabled();
	});

	it("shows a button to create a new voucher that creates voucher with data", async () => {
		fireEvent.input(
			await screen.findByLabelText("Voucher group description"),
			{ target: { value: "My voucher description" } }
		);
		fireEvent.input(
			await screen.findByLabelText("Voucher duration in days"),
			{ target: { value: 3 } }
		);

		fireEvent.input(
			await screen.findByLabelText("Number of vouchers"),
			{ target: { value: 2 } }
		);
		fireEvent.click(
			await screen.findByLabelText("Setup activation deadline")
		);

		const deadline = '2022-10-10';
		const timestamp = dateToLocalUnixTimestamp(deadline, '23:59');
		userEvent.type(
			await screen.findByLabelText("Activation deadline"),
			deadline
			);
		const button = await screen.findByRole("button", { name: /create/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(addVoucher).toHaveBeenCalledWith({
				name: "My voucher description",
				duration_m: 3 * 24 * 60,
				qty: 2,
				activation_deadline: timestamp,
			});
		});
	});

	it("submits duration_m and activation_deadline as null when is permanent and without deadline", async () => {
		fireEvent.input(
			await screen.findByLabelText("Voucher group description"),
			{ target: { value: "My voucher description" } }
		);
		fireEvent.click(
			await screen.findByLabelText("Is permanent")
		);
		fireEvent.input(
			await screen.findByLabelText("Number of vouchers"),
			{ target: { value: 2 } }
		);
		const button = await screen.findByRole("button", { name: /create/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(addVoucher).toHaveBeenCalledWith({
				name: "My voucher description",
				duration_m: null,
				qty: 2,
				activation_deadline: null,
			});
		});
	});
});
