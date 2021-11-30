import PiraniaPage from './src/piraniaPage';
import CreateVoucher from './src/screens/createVoucher';
import Voucher from './src/screens/voucher'
import EditVoucher from './src/screens/editVoucher'

export default {
	title: 'Containers/Voucher access'
};
const now = (new Date()).getTime()/1000

let vouchers = [
	{
		code: "PIDFIG",
		id: "x5crd4",
		activation_date: now - 600e3,
		name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut  ut aliquip ex ea commodo consequat",
		duration_m: 1200,
		is_active: false,
		creation_date: 1631880790,
		permanent: true,
		status: 'used'
	},
	{
		code: "NNDAMD",
		id: "fteNhN",
		expiration_date: now + 10e3,
		is_active: false,
		name: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa",
		duration_m: 100e100,
		creation_date: now - 10e3,
		permanent: false,
		status: 'used'
	},
	{
		mac: "6c:88:14:ba:c4:84",
		expiration_date: now + 10e4,
		status: 'available',
		code: "BAVWNS",
		id: "5nLNT9",
		activation_date: 1631880811,
		name: "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
		duration_m: 10000000000,
		is_active: true,
		creation_date: 1631880790,
		permanent: false
	},
	{
		mac: "98:9e:63:a7:91:e2",
		code: "COSVQK",
		expiration_date: now - 10e4,
		id: "6TIgTr",
		activation_date: 1633530122,
		name: "qui officia deserunt mollit anim id est laborum",
		duration_m: 1e24,
		status: 'disabled',
		is_active: true,
		creation_date: 1633530042,
		permanent: false
	}
];

export const voucherList = () => (
	<PiraniaPage />
)

voucherList.args = {
	queries: [
		[['pirania', 'list_vouchers'], vouchers]
	]
}

export const createVoucher = () => (
	<CreateVoucher />
)

export const voucherDetails = () => (
	<Voucher id={vouchers[0].id} />
)

voucherDetails.args = {
	queries: [
		[['pirania', 'list_vouchers'], vouchers]
	]
}

export const editVoucher = () => (
	<EditVoucher />
)

editVoucher.args = {
	id: vouchers[0].id,
	queries: [
		[['pirania', 'list_vouchers'], vouchers]
	]
}
