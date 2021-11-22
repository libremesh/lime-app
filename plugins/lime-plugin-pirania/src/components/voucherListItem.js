import { h } from "preact";
import { route } from "preact-router";
import TimeAgo from "./timeAgo";
import Copy from "./copy";
import { Trans } from '@lingui/macro';
import style from "../style.less";

const VoucherListItem = ({
	name,
	code,
	creation_date,
	id,
	expiration_date,
	author_node,
	status,
	permanent,
	className
}) => {
	function goToVoucherView() {
		route(`/access/view/${id}`);
	}
	return (
		<div class={style.voucherItem}>
			<div class={style.code}>
				<Copy text={code} />
				<span class={style.codeStatus}>
					{status === "available"
						? <Trans>available</Trans>
						: status === "used"
							? <Trans>used</Trans>
							: <Trans>disabled</Trans>}
				</span>
			</div>
			<div class={style.nodeInfo}>
				<span><Trans>Node</Trans>:</span>{" "}
				<span role="node-name">{author_node} || <Trans>unknown</Trans></span>
			</div>
			<div
				role="voucher-item"
				class={style.voucherDescription}
				onClick={goToVoucherView}
			>
				<span>{name}</span>
			</div>
			<div class={style.dates} onClick={goToVoucherView}>
				{permanent && <span><Trans>permanent</Trans></span>}
				{expiration_date && (
					<span class={className}>
						<span>
							{status === "disabled" ? <span><Trans>Expired</Trans> </span> : <span><Trans>Expires</Trans> </span>}
						</span>
						<TimeAgo date={expiration_date} />
					</span>
				)}
				<span class={className}>
					<span><Trans>Created</Trans> </span>
					<TimeAgo date={creation_date} />
				</span>
			</div>
		</div>
	);
};

export default VoucherListItem;
