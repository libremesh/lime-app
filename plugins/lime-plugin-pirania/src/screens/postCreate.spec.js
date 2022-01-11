import { h } from "preact";
import { fireEvent, screen } from "@testing-library/preact";
import { render } from "utils/test_utils";
import "@testing-library/jest-dom";
import { route } from "preact-router";
import waitForExpect from "wait-for-expect";
import { i18n } from '@lingui/core';
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
	}
];

describe("voucher post create screen", () => {
	it('renders the code for each created voucher', async () => {
		render(<PostCreate vouchers={vouchers} />);
		for (let i = 0; i < vouchers.length; i++) {
			const v = vouchers[i];
			expect(await screen.findByText(v.code)).toBeInTheDocument();
		}
	});

	it('shows description', async () => {
		render(<PostCreate vouchers={vouchers} />);
		expect(await screen.findByText(
			`Description: ${vouchers[0].name}`)
		).toBeInTheDocument();
	});

	it('shows duration in days if not permanent', async () => {
		render(<PostCreate vouchers={vouchers} />);
		const durationDays = parseInt(vouchers[0].duration_m / (24 * 60))
		expect(await screen.findByText(
			`Duration: ${durationDays} days`)
		).toBeInTheDocument();
	});

	it('shows duration as is permanent if it is', async () => {
		let vouchers_ = []
		vouchers.forEach(v => {
			vouchers_ = [...vouchers_, { ...v, duration_m: null }]
		});
		render(<PostCreate vouchers={vouchers_} />);
		expect(await screen.findByText(
			"Duration: is permanent")
		).toBeInTheDocument();
	});

	it('shows activation deadline if it has one', async () => {
		let vouchers_ = []
		vouchers.forEach(v => {
			vouchers_ = [...vouchers_, { ...v, activation_deadline: 1637952217 }]
		});
		const date = new Date(vouchers_[0].activation_deadline * 1000);
		const deadlineText = i18n.date(date, { dateStyle: "medium", timeStyle: "medium" });
		render(<PostCreate vouchers={vouchers_} />);
		expect(await screen.findByText(
			`Activation deadline: ${deadlineText}`
		)).toBeInTheDocument();
	});

	it('shows an ok button that brings you back to vouchers list', async() => {
		render(<PostCreate vouchers={vouchers} />);
		const button = await screen.findByRole('button', { name: /ok/i });
		fireEvent.click(button);
		await waitForExpect(() => {
			expect(route).toHaveBeenCalledWith('/access');
		});
	});
});
