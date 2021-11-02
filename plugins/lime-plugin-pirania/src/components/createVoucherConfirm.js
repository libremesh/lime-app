import { h } from "preact";
import I18n from "i18n-js";
import { route } from "preact-router";
import Copy from "./copy";
import style from "../style.less";

const CreateVoucherConfirm = ({ vouchers  }) => (
	<div class={style.confirmCodeBox}>
		<h3>{I18n.t("Created vouchers")}</h3>
		{vouchers.map(({ code }) => (
			<div class={style.confirmCode} key={code}>
				<Copy text={code} />
			</div>
		))}
		<button onClick={() => route(`/access`)}>{I18n.t("Ok")}</button>
	</div>
);

export default CreateVoucherConfirm;
