import PiraniaMenu from "./src/piraniaMenu";
import PiraniaPage from "./src/piraniaPage";
import CreateVoucher from "./src/screens/createVoucher";
import EditVoucher from "./src/screens/editVoucher";
import InvalidateVoucher from "./src/screens/invalidateVoucher";
import Voucher from "./src/screens/voucher";
import { WellcomeScreenEditor } from "./src/screens/wellcomeScreenEditor";

export default {
    name: "Access",
    page: PiraniaPage,
    menu: PiraniaMenu,
    isCommunityProtected: true,
    additionalProtectedRoutes: [
        ["access/wellcomescreen", WellcomeScreenEditor],
        ["access/create", CreateVoucher],
        ["access/view/:id", Voucher],
        ["access/edit/:id", EditVoucher],
        ["access/invalidate/:id", InvalidateVoucher],
    ],
};
