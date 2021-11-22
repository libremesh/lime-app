import { h } from "preact";
import { fireEvent, screen } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import * as timeago from "timeago.js";
import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import VoucherListItem from "./voucherListItem";

const voucher = {
	code: "PIDFIG",
	id: "x5crd4",
	activation_date: 1632417986,
	name: "luandro",
	duration_m: 10000,
	creation_date: 1632417476,
	permanent: false,
	status: 'available',
	author_node: 'ml-luandro'
};

describe("voucher list item", () => {
	it("shows vouchers creation date", async () => {
		render(<VoucherListItem {...voucher} />);
		expect(
			await screen.findByText(timeago.format(new Date(voucher.creation_date*1000)))
		).toBeInTheDocument();
	});

	it("renders voucher-list-item with a test code", async () => {
		render(<VoucherListItem {...voucher} />);
		expect(await screen.findByText(voucher.code)).toBeInTheDocument();
	});

	it("routes to the voucher detail screen on click", async () => {
		render(<VoucherListItem {...voucher} />);
		const element = await screen.findByRole("voucher-item");
		expect(element).toBeInTheDocument();
		fireEvent.click(element);
		await waitForExpect(() => {
			expect(route).toHaveBeenCalledWith(`/access/view/${voucher.id}`);
		});
	});

	it("shows voucher name", async () => {
		render(<VoucherListItem {...voucher} />);
		expect(await screen.findByText(voucher.name)).toBeInTheDocument();
	});

	it("shows used status when it is used", async () => {
		render(
			<VoucherListItem
				{...voucher}
				status={"used"}
			/>
		);
		expect(await screen.findByText("used")).toBeInTheDocument();
	});

	it("shows available status when it is available", async () => {
		render(<VoucherListItem {...voucher} status={"available"} />);
		expect(await screen.findByText("available")).toBeInTheDocument();
	});
	it("shows disabled status when it is disabled", async () => {
		render(<VoucherListItem {...voucher} status={"disabled"} />);
		expect(await screen.findByText("disabled")).toBeInTheDocument();
	});
	it("shows expired date when it has an expiration date", async () => {
		const expirationDate = new Date().getTime() / 1000 + 10e5;
		render(<VoucherListItem {...voucher} expiration_date={expirationDate} />);
		expect(
			await screen.findByText(timeago.format(new Date(expirationDate*1000)))
		).toBeInTheDocument();
	});
	it("shows permanent legend when it has no expiration date", async () => {
		render(<VoucherListItem {...voucher} permanent={true} />);
		expect(await screen.findByText("permanent")).toBeInTheDocument();
	});
});
