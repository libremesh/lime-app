import { h } from "preact";
import { route } from "preact-router";
import TimeAgo from "./timeAgo";
import Copy from "./copy";
import { Trans, defineMessage } from '@lingui/macro';
import style from "../style.less";

const VoucherListItem = ({
	name,
	code,
	creation_date,
	id,
	expiration_date,
	activation_deadline,
	author_node,
	status,
	permanent,
}) => {
	function goToVoucherView() {
		route(`/access/view/${id}`);
	}
	const statusMsgs = {
		'available': <Trans>Available</Trans>,
		'expired': <Trans>Expired</Trans>,
		'active': <Trans>Active</Trans>,
	};

	const statusClassName = {
		'available': style.voucherStatusAvailable,
		'active': 'text-primary',
		'expired': 'text-danger'
	};

	return (
		<div class={`d-flex flex-column container-padded ${style.voucherItem}`} data-testid={`voucher-item-${id}`} onClick={goToVoucherView}>
			<div class="d-flex">
				<div class="flex-grow-1">
					<Copy text={code} className={style.voucherCode} />
				</div>
				<div class={`${style.voucherStatus} ${statusClassName[status]}`}>
					{statusMsgs[status]}
				</div>
			</div>
			<div
				class={style.voucherDescription}
			>
				{name}
			</div>
			<div class="d-flex">
				<div class="flex-grow-1 container-padded">
					{status === "active" && permanent &&
						<span><Trans>Permanent</Trans></span>
					}
					{status === "active" && expiration_date &&
						<span>
							<Trans>Expires <TimeAgo date={expiration_date} /></Trans>
						</span>
					}
					{status === "expired" &&
						<span><Trans>Expired <TimeAgo date={expiration_date} /></Trans></span>
					}
					{status === "available" && activation_deadline &&
						<span><Trans>Activation Deadline: <TimeAgo date={activation_deadline} /></Trans></span>
					}
				</div>
				<div class="flex-grow-1 container-padded">
					<Trans>Created <TimeAgo date={creation_date} /> by {author_node} </Trans>
				</div>
			</div>
		</div>
	);
};

export default VoucherListItem;
