import Voucher from "./voucher";

export default {
    title: "Containers/Pirania",
};

const now = new Date().getTime() / 1000;
const voucher = {
    code: "PIDFIG",
    id: "x5crd4",
    activation_date: now - 600e3,
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut  ut aliquip ex ea commodo consequat",
    duration_m: 60 * 24 * 3,
    creation_date: 1631880790,
    status: "active",
    author_node: "ql-berta",
};

export const voucherDetails = () => <Voucher id={voucher.id} />;
voucherDetails.args = {
    queries: [[["pirania", "list_vouchers"], [voucher]]],
};
