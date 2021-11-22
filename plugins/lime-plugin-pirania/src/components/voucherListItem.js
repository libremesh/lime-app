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

	return (
		<div class={style.voucherItem} data-testid={`voucher-item-${id}`} onClick={goToVoucherView}>
			<div class={style.code}>
				<Copy text={code} />
				<span class={style.codeStatus}>
					{statusMsgs[status]}
				</span>
			</div>
			<div class={style.nodeInfo}>
				<span><Trans>Node</Trans>:</span>{" "}
				<span role="node-name">{author_node} || <Trans>unknown</Trans></span>
			</div>
			<div
				role="voucher-item"
				class={style.voucherDescription}	
			>
				<span>{name}</span>
			</div>
			<div class={style.dates} >
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
				<span>
					<Trans>Created <TimeAgo date={creation_date} /></Trans>
				</span>
			</div>
		</div>
	);
};

export default VoucherListItem;
