import { h } from "preact";
import I18n from "i18n-js";
import { route } from "preact-router";
import style from "../style.less";
import { useListVouchers } from "../piraniaQueries";
import TimeAgo from "../components/timeAgo";
import GoBack from "../components/goBack";
import Copy from "../components/copy";

const VoucherDetails = ({
	id,
	code,
	name,
	status,
	creation_date,
	expiration_date,
	permanent
}) => (
	<div>
		<div class={style.voucherDetailBox}>
			<h3>{I18n.t("Voucher code")}</h3>
			<Copy style={{ marginBottom: 25 }} text={code} />
			<h3>{I18n.t("Voucher status")}</h3>
			<p
				style={{
					color: "purple",
					textTransform: "uppercase",
					fontWeight: "bold"
				}}
			>
				{status}
			</p>
			<h3>{I18n.t("Voucher description")}</h3>
			<p>{name}</p>
			{expiration_date && (
				<div>
					<h3>{I18n.t("Expiration date")}</h3>
					<p>
						<span>
							{status === "disabled" ? I18n.t("expired") : I18n.t("expires")}
						</span>{" "}
						<TimeAgo date={expiration_date} />
					</p>
				</div>
			)}
			<h3>{I18n.t("Creation date")}</h3>
			<p>
				<span>{I18n.t("created")}{" "}</span>
				<TimeAgo date={creation_date} />
			</p>
			<div class={style.isPermanent}>
				<label>{I18n.t("permanent")}</label>
				<input disabled type="checkbox" checked={permanent} />
			</div>
		</div>
		<button onClick={() => route(`/access/edit/${id}`)}>
			{I18n.t("Edit")}
		</button>
	</div>
);

const Voucher = ({ id }) => {
	const { data: vouchers } = useListVouchers();
	return (
		<div class="container container-padded">
			<div class={style.goBackTitle}>
				<GoBack url="/access/" />
				<h1>{I18n.t("voucher details")}</h1>
			</div>
			<div>
				{vouchers && (
					<VoucherDetails {...vouchers.filter((v) => v.id === id)[0]} />
				)}
			</div>
		</div>
	);
};

export default Voucher;
