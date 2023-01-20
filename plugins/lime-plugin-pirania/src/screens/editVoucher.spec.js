
import { screen, fireEvent } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import EditVoucher from "./editVoucher";
import { listVouchers, rename } from "../piraniaApi";
import waitForExpect from "wait-for-expect";

jest.mock("../piraniaApi");

let voucher = {
	id: "x5crd4",
	name: "luandro",
};

describe("Edit voucher", () => {
	beforeEach(() => {
		listVouchers.mockImplementation(async () => [voucher]);
		rename.mockImplementation(async() => null);
		render(<EditVoucher id={voucher.id} />);
	});
	it("has an input for changing the description", async () => {
		const input = await screen.findByLabelText("Description");
		expect(input).toBeInTheDocument();
	});

	it("shows a button to edit the voucher", async () => {
		const input = await screen.findByLabelText("Description");
		fireEvent.input(input, {target: {value: 'new description'}});
		const button = await screen.findByRole("button", { name: /save/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(rename).toHaveBeenCalledWith({
				id: voucher.id,
				name: 'new description'
			})
		});
        expect(await screen.findByText('Saved')).toBeInTheDocument();
	});
});
