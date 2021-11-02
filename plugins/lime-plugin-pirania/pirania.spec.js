import { h } from "preact";
import { fireEvent, screen } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import waitForExpect from "wait-for-expect";
import { route } from "preact-router";
import VoucherList from "./src/screens/voucherList";
import { listVouchers } from "./src/piraniaApi";

jest.mock("./src/piraniaApi");
const now = (new Date()).getTime()/1000
let vouchers = [
	{
		code: "PIDFIG",
		id: "x5crd4",
		activation_date: now - 600e3,
		name: "luandro",
		duration_m: 1200,
		is_active: false,
		creation_date: now - 700e3,
		permanent: false,
		status: 'available'
	},
	{
		code: "NNDAMD",
		id: "fteNhN",
		is_active: false,
		name: "hiure2",
		duration_m: 10000000000,
		creation_date: 1631880815,
		permanent: false,
		status: 'available'

	},
	{
		mac: "6c:88:14:ba:c4:84",
		expiration_date: 601631880811,
		code: "BAVWNS",
		id: "5nLNT9",
		activation_date: 1631880811,
		name: "hiure2",
		duration_m: 10000000000,
		is_active: true,
		creation_date: 1631880790,
		permanent: false,
		status: 'used'

	},
	{
		mac: "98:9e:63:a7:91:e2",
		expiration_date: 6e25,
		code: "COSVQK",
		id: "6TIgTr",
		activation_date: 1633530122,
		name: "luandro-iphone",
		duration_m: 1e24,
		is_active: true,
		creation_date: 1633530042,
		permanent: false,
		status: 'disabled'
	}
];

describe("voucher list", () => {
	it("shows a button to create a new voucher that routes to creation page", async () => {
		render(<VoucherList vouchers={vouchers} />);
		const button = await screen.findByRole("button", { name: /Create/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(route).toHaveBeenCalledWith("/access/create");
		});
	});

	it("shows up a message when there are no vouchers to list", async () => {
		listVouchers.mockImplementation(async () => []);
		render(<VoucherList vouchers={[]} />);
		expect(
			await screen.findByText(
				"There are no vouchers matching the current criteria"
			)
		).toBeInTheDocument();
	});
	it("by default it lists last created vouchers", async () => {
		render(<VoucherList vouchers={vouchers} />);
		expect(await screen.findByText(vouchers[0].name)).toBeInTheDocument();
	});

	it("by default it lists vouchers value", async () => {
		render(<VoucherList vouchers={vouchers} />);
		expect(await screen.findByText(vouchers[0].code)).toBeInTheDocument();
	});

	it.skip("by default it lists the vouchers created in this node", async () => {
		render(<VoucherList vouchers={vouchers} />);
		expect(await screen.findByText(vouchers[1].name)).toBeInTheDocument();
	});
});

describe("voucher list filter field", () => {
	beforeEach(() => {
		render(<VoucherList vouchers={vouchers} />);
	});
	it("shows a filter field with label filter by", async () => {
		const select = await screen.findByLabelText(`filter by`);
		expect(select).toBeInTheDocument();
	});
	it("let you filter by all vouchers", async () => {
		const select = await screen.findByLabelText("filter by");
		expect(select).toHaveValue("all-vouchers");
		expect(await (await screen.findAllByText("used")).length).toBeGreaterThan(
			0
		);
		expect(
			await (await screen.findAllByText("disabled")).length
		).toBeGreaterThan(0);
		expect(
			await (await screen.findAllByText("available")).length
		).toBeGreaterThan(0);
	});
	it("let you filter by used vouchers", async () => {
		const select = await screen.findByLabelText("filter by");
		fireEvent.change(select, { target: { value: "used" } });
		expect(select).toHaveValue("used");
		expect(await (await screen.findAllByText("used")).length).toBeGreaterThan(
			0
		);
	});
	it("let you filter by disabled vouchers", async () => {
		const select = await screen.findByLabelText("filter by");
		fireEvent.change(select, { target: { value: "disabled" } });
		expect(select).toHaveValue("disabled");
		expect(
			await (await screen.findAllByText("disabled")).length
		).toBeGreaterThan(0);
	});
	it("let you filter by available vouchers", async () => {
		const select = await screen.findByLabelText("filter by");
		fireEvent.change(select, { target: { value: "available" } });
		expect(select).toHaveValue("available");
	});
});

describe("voucher list search field", () => {
	beforeEach(() => {
		listVouchers.mockImplementation(async () => vouchers);
		render(<VoucherList vouchers={vouchers} />);
	});
	it("shows a text field with label search by", async () => {
		const input = await screen.findByLabelText(`search by`);
		expect(input).toBeInTheDocument();
	});
	it.skip("let you filter by node name", async () => {});
	it.skip("let you filter by voucher name", async () => {
		const input = await screen.findByLabelText("search by");
		fireEvent.change(input, { target: { value: vouchers[0].name } });
		expect(await screen.findByText(vouchers[0].name)).toBeInTheDocument();
		expect(await screen.findByText(vouchers[1].name)).not.toBeInTheDocument();
	});
});
