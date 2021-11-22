import { h } from "preact";
import { Trans } from '@lingui/macro';
import { route } from "preact-router";
import Copy from "./copy";
import style from "../style.less";

const CreateVoucherConfirm = ({ vouchers  }) => (
	<div class={style.confirmCodeBox}>
		<h3><Trans>Created vouchers</Trans></h3>
		{vouchers.map(({ code }) => (
			<div class={style.confirmCode} key={code}>
				<Copy text={code} />
			</div>
		))}
		<button onClick={() => route(`/access`)}><Trans>Ok</Trans></button>
	</div>
);

export default CreateVoucherConfirm;
