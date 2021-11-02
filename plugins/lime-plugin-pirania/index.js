import {h} from 'preact';
import { Trans } from '@lingui/macro';
import PiraniaPage from './src/piraniaPage';
import { WellcomeScreenEditor } from './src/screens/wellcomeScreenEditor';
import CreateVoucher from "./src/screens/createVoucher";
import EditVoucher from "./src/screens/editVoucher";
import Voucher from "./src/screens/voucher";

export default {
	name: 'Access vouchers',
	page: PiraniaPage,
	menu: () => <a href={'#/access'}><Trans>Access Vouchers</Trans></a>,
	isCommunityProtected: true,
	additionalProtectedRoutes: [
		['access/wellcomescreen', WellcomeScreenEditor],
		["access/create", CreateVoucher],
		["access/view/:id", Voucher],
		["access/edit/:id", EditVoucher]
	]
}
