import { PortalConfigPage } from "./PortalConfigPage";

export default {
    title: "Containers/Node Configuration/Portal Config",
};

export const activeWithoutVouchers = () => <PortalConfigPage />;
activeWithoutVouchers.args = {
    queries: [
        [
            ["pirania", "get_portal_config"],
            {
                activated: true,
                with_vouchers: false,
            },
        ],
    ],
};

export const activeWithVouchers = () => <PortalConfigPage />;
activeWithVouchers.args = {
    queries: [
        [
            ["pirania", "get_portal_config"],
            {
                activated: true,
                with_vouchers: true,
            },
        ],
    ],
};
