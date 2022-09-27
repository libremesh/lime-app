/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "selectFilterOption", "findExpectedVouchers"] }] */
import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import { route } from "preact-router";
import waitForExpect from "wait-for-expect";

import { getBoardData } from "utils/api";
import queryCache from "utils/queryCache";
import { render } from "utils/test_utils";

import { listVouchers } from "../piraniaApi";
import VoucherList from "./voucherList";

jest.mock("utils/api");
jest.mock("../piraniaApi");

const now = new Date().getTime() / 1000;
const availableVouchers = [
    {
        code: "PIDFIG",
        id: "x5crd4",
        activation_date: now - 600e3,
        name: "luandro",
        duration_m: 1200,
        is_active: false,
        creation_date: now - 700e3,
        permanent: false,
        status: "available",
        author_node: "pirania",
    },
    {
        code: "NNDAMD",
        id: "fteNhN",
        is_active: false,
        name: "hiure2",
        duration_m: 10000000000,
        creation_date: 1631880815,
        permanent: false,
        status: "available",
        author_node: "conteiner",
    },
];

const activeVouchers = [
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
        status: "active",
        author_node: "conteiner",
    },
];

const expiredVouchers = [
    {
        mac: "98:9e:63:a7:91:e2",
        expiration_date: 6e25,
        code: "COSVQK",
        id: "6TIgTr",
        activation_date: 1633530122,
        name: "luandro-iphone",
        duration_m: 1e24,
        is_active: false,
        creation_date: 1633530042,
        permanent: false,
        status: "expired",
        author_node: "sede",
    },
];

const invalidatedVouchers = [
    {
        mac: "98:9e:63:a7:91:e2",
        expiration_date: 6e25,
        code: "KQEDWC",
        id: "7tyG2",
        activation_date: 1633530122,
        name: "made by mistake",
        duration_m: 1e24,
        is_active: false,
        creation_date: 1633530042,
        permanent: false,
        status: "invalidated",
        author_node: "some-node",
    },
];

const createdInThisNode = [availableVouchers[1], activeVouchers[0]];

const vouchers = [
    ...availableVouchers,
    ...activeVouchers,
    ...expiredVouchers,
    ...invalidatedVouchers,
];

const selectFilterOption = async (option) => {
    const select = await screen.findByLabelText("Filter by");
    userEvent.selectOptions(
        select,
        screen.getByRole("option", { name: option })
    );
    expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
};

const findExpectedVouchers = async (expectedVouchers) => {
    for (let i = 0; i < expectedVouchers.length; i++) {
        const v = expectedVouchers[i];
        expect(
            await screen.findByTestId(`voucher-item-${v.id}`)
        ).toBeInTheDocument();
    }
    const otherVouchers = vouchers.filter(
        (v) => expectedVouchers.indexOf(v) === -1
    );
    for (let i = 0; i < otherVouchers.length; i++) {
        const v = otherVouchers[i];
        expect(screen.queryByTestId(`voucher-item-${v.id}`)).toBeNull();
    }
};

describe("voucher list", () => {
    beforeEach(() => {
        listVouchers.mockImplementation(async () => vouchers);
        getBoardData.mockImplementation(async () => ({
            hostname: "conteiner",
        }));
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it("shows a button to create a new voucher that routes to creation page", async () => {
        render(<VoucherList />);
        const button = await screen.findByRole("button", { name: /Create/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        await waitForExpect(() => {
            expect(route).toHaveBeenCalledWith("/access/create");
        });
    });

    it("shows up a message when there are no vouchers to list", async () => {
        listVouchers.mockImplementation(async () => []);
        render(<VoucherList />);
        expect(
            await screen.findByText(
                "There are no vouchers matching the current criteria"
            )
        ).toBeInTheDocument();
    });

    it("shows a filter field with label filter by", async () => {
        render(<VoucherList />);
        const select = await screen.findByLabelText("Filter by");
        expect(select).toBeInTheDocument();
    });

    it("filters by vouchers created in this node by default", async () => {
        render(<VoucherList />);
        await findExpectedVouchers(createdInThisNode);
        const option = await screen.findByRole("option", {
            name: "Created in this node",
        });
        expect(option.selected).toBeTrue();
    });

    it("let you filter by all vouchers", async () => {
        render(<VoucherList />);
        await selectFilterOption("All Vouchers");
        await findExpectedVouchers(vouchers);
    });

    it("let you filter by available vouchers", async () => {
        render(<VoucherList />);
        await selectFilterOption("Available");
        await findExpectedVouchers(availableVouchers);
    });

    it("let you filter by active vouchers", async () => {
        render(<VoucherList />);
        await selectFilterOption("Active");
        await findExpectedVouchers(activeVouchers);
    });

    it("let you filter by expired vouchers", async () => {
        render(<VoucherList />);
        await selectFilterOption("Expired");
        await findExpectedVouchers(expiredVouchers);
    });

    it("let you filter by invalidated vouchers", async () => {
        render(<VoucherList />);
        await selectFilterOption("Invalidated");
        await findExpectedVouchers(invalidatedVouchers);
    });

    it("shows message if no voucher match filter criteria", async () => {
        listVouchers.mockImplementation(async () => [...availableVouchers]);
        render(<VoucherList />);
        await selectFilterOption("Expired");
        expect(
            screen.getByText(
                "There are no vouchers matching the current criteria"
            )
        ).toBeInTheDocument();
    });

    it("shows a text field with label search by", async () => {
        render(<VoucherList />);
        const input = await screen.findByLabelText("Search by");
        expect(input).toBeInTheDocument();
    });

    it("search by node hostname", async () => {
        render(<VoucherList />);
        await selectFilterOption("All Vouchers");
        await findExpectedVouchers(vouchers);
        const input = await screen.findByLabelText("Search by");
        expect(input).toBeInTheDocument();
        userEvent.type(input, "se"); // For voucher name 'hiure2'
        await findExpectedVouchers([expiredVouchers[0]]);
    });

    it("search by voucher name", async () => {
        render(<VoucherList />);
        await selectFilterOption("All Vouchers");
        await findExpectedVouchers(vouchers);
        const input = await screen.findByLabelText("Search by");
        userEvent.type(input, "hiu"); // For voucher name 'hiure2'
        await findExpectedVouchers([availableVouchers[1], activeVouchers[0]]);
    });

    it("search only over filtered list", async () => {
        render(<VoucherList />);
        await selectFilterOption("Available");
        await findExpectedVouchers(availableVouchers);
        const input = await screen.findByLabelText("Search by");
        userEvent.type(input, "hiur"); // For voucher name 'hiure2'
        await findExpectedVouchers([availableVouchers[1]]);
    });
});
