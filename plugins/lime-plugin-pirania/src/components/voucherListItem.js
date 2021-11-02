import { h } from "preact";
import { route } from "preact-router";
import TimeAgo from "./timeAgo";
import Copy from './copy'
import I18n from "i18n-js";
import style from "../style.less";

const VoucherListItem = ({
	name,
	code,
	creation_date,
	id,
	expiration_date,
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
					{status === 'available' ? I18n.t('available') : status === 'used' ? I18n.t('used') : I18n.t('disabled')  }
				</span>
			</div>
			<div role="voucher-item" class={style.voucherDescription} onClick={goToVoucherView}>
				<span>{name}</span>
			</div>
			<div class={style.dates} onClick={goToVoucherView}>
				{permanent && <span>{I18n.t("permanent")}</span>}
				{expiration_date && (
					<span class={className}>
						<span>{status === 'disabled' ? I18n.t("expired") : I18n.t("expires")} </span>
						<TimeAgo date={expiration_date} />
					</span>
				)}
				<span class={className}>
					<span>{I18n.t("created")} </span>
					<TimeAgo date={creation_date} />
				</span>
			</div>
		</div>
	);
};

export default VoucherListItem;
