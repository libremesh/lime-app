import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import waitForExpect from "wait-for-expect";

import { render } from "utils/test_utils";
import { dateToLocalUnixTimestamp } from "utils/time";

import { addVoucher } from "../piraniaApi";
import CreateVoucher from "./createVoucher";

jest.mock("../piraniaApi");

const voucher = {
    name: "luandro",
    duration_m: 1200,
    qty: 2,
    permanent: false,
};

// Get deadline for a voucher. Basically, today's date + 1 year
const getDeadline = () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const [deadline] = date.toISOString().split("T");
    return deadline;
};

describe("Create voucher", () => {
    beforeEach(() => {
        addVoucher.mockImplementation(async () => [voucher]);
    });

    it("shows a text input for description of the voucher group", async () => {
        render(<CreateVoucher />);
        const input = await screen.findByLabelText(`Voucher group description`);
        expect(input).toBeInTheDocument();
    });

    it("shows a number input for duration and label duration", async () => {
        render(<CreateVoucher />);
        const input = await screen.findByLabelText(`Voucher duration in days`);
        expect(input).toBeInTheDocument();
    });

    it("shows a number input for quantity and label number of vouchers", async () => {
        render(<CreateVoucher />);
        const input = await screen.findByLabelText(`Number of vouchers`);
        expect(input).toBeInTheDocument();
    });

    it("shows a checkbox input with default unselected and label permanent", async () => {
        render(<CreateVoucher />);
        const input = await screen.findByLabelText(`Is permanent`);
        expect(input).not.toBeChecked();
        fireEvent.click(input);
        expect(input).toBeChecked();
    });

    it("shows an optional input for activation deadline", async () => {
        render(<CreateVoucher />);
        const checkbox = await screen.findByLabelText(
            "Setup activation deadline"
        );
        expect(checkbox).not.toBeChecked();
        const dateInput = await screen.findByLabelText("Activation deadline");
        expect(dateInput).toBeDisabled();
    });

    it("shows a button to create a new voucher that creates voucher with data", async () => {
        render(<CreateVoucher />);

        await userEvent.type(
            await screen.findByLabelText("Voucher group description"),
            "My voucher description"
        );
        expect(
            (await screen.findByLabelText("Voucher group description")).value
        ).toBe("My voucher description");

        await userEvent.type(
            await screen.findByLabelText("Voucher duration in days"),
            "{backspace}3"
        );
        expect(
            (await screen.findByLabelText("Voucher duration in days")).value
        ).toBe("3");

        await userEvent.type(
            await screen.findByLabelText("Number of vouchers"),
            "{backspace}2"
        );
        expect((await screen.findByLabelText("Number of vouchers")).value).toBe(
            "2"
        );
        await userEvent.click(
            await screen.findByLabelText("Setup activation deadline")
        );

        const deadline = getDeadline();
        const timestamp = dateToLocalUnixTimestamp(deadline, "23:59");

        await userEvent.type(
            await screen.findByLabelText("Activation deadline"),
            `{backspace}${deadline}`,
            {
                initialSelectionStart: 0,
                initialSelectionEnd: 10,
            }
        );

        const button = await screen.findByRole("button", { name: /create/i });
        expect(button).toBeInTheDocument();

        await userEvent.click(button);
        await waitFor(() => {
            expect(addVoucher).toHaveBeenCalledWith({
                name: "My voucher description",
                duration_m: 3 * 24 * 60,
                qty: 2,
                activation_deadline: timestamp,
            });
        });
    });

    it("submits duration_m and activation_deadline as null when is permanent and without deadline", async () => {
        render(<CreateVoucher />);
        fireEvent.input(
            await screen.findByLabelText("Voucher group description"),
            { target: { value: "My voucher description" } }
        );
        fireEvent.click(await screen.findByLabelText("Is permanent"));
        fireEvent.input(await screen.findByLabelText("Number of vouchers"), {
            target: { value: 2 },
        });
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
