import { h } from "preact";
import { Trans } from '@lingui/macro';
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
			<h3><Trans>Voucher code</Trans></h3>
			<Copy style={{ marginBottom: 25 }} text={code} />
			<h3><Trans>Voucher status</Trans></h3>
			<p
				style={{
					color: "purple",
					textTransform: "uppercase",
					fontWeight: "bold"
				}}
			>
				{status}
			</p>
			<h3><Trans>Voucher description</Trans></h3>
			<p>{name}</p>
			{expiration_date && (
				<div>
					<h3><Trans>Expiration date</Trans></h3>
					<p>
						<span>
							{status === "disabled" ? <Trans>expired</Trans> : <span><Trans>expires</Trans>{" "}</span>}
						</span>{" "}
						<TimeAgo date={expiration_date} />
					</p>
				</div>
			)}
			<h3><Trans>Creation date</Trans></h3>
			<p>
				<TimeAgo date={creation_date} />
			</p>
			{permanent && <div class={style.isPermanent}>
				<label><Trans>permanent</Trans></label>
				<span style={{ color: 'green', marginLeft: 5 }}>✔</span>
			</div>}
		</div>
		<button disabled={status === "disabled"} onClick={() => route(`/access/edit/${id}`)}>
			<Trans>Edit</Trans>
		</button>
	</div>
);

const Voucher = ({ id }) => {
	const { data: vouchers } = useListVouchers();
	return (
		<div class="container container-padded">
			<div class={style.goBackTitle}>
				<GoBack url="/access/" />
				<h1><Trans>voucher details</Trans></h1>
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
