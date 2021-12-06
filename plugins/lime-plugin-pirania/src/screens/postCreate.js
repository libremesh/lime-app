import { h } from "preact";
import { Trans, Plural } from '@lingui/macro';
import { route } from "preact-router";
import Copy from "../components/copy";
import style from "../style.less";
import { i18n } from "@lingui/core";

const CodesText = ({ vouchers }) => (
	<div class="text-center">
		{vouchers.map(v => <div key={v.id} >{v.code}</div>)}
	</div>
);

const Duration = ({ days }) => {
	if (!days) {
		return <Trans>Duration: is permanent</Trans>
	}
	return <Trans>Duration: <Plural value={days} one="# day" other="# days" /></Trans>
};

const PostCreate = ({ vouchers }) => {
	const { name, duration_m,
		activation_deadline } = vouchers[0];
	const durationInDays = duration_m && parseInt(duration_m / (24 * 60));
	const deadlineText = activation_deadline && (
		i18n.date(activation_deadline * 1000,
			{ dateStyle: "medium", timeStyle: "medium" })
	);
	return (
		<div class="d-flex flex-grow-1 flex-column container-padded">
			<div class="d-flex flex-grow-1 flex-column">
				<div class="d-flex justify-content-center">
					<h3><Trans>Created vouchers</Trans></h3>
				</div>
				<Copy text={<CodesText vouchers={vouchers} />} className={style.voucherCode} />
				<div class="container-padded">
					<div><Trans>Description: {name}</Trans></div>
					<div><Duration days={durationInDays} /></div>
					{activation_deadline && 
						<div>
							<Trans>Activation deadline: {deadlineText}</Trans>
						</div>
					}
				</div>
			</div>
			<button onClick={() => route(`/access`)}><Trans>Ok</Trans></button>
		</div>
	);
};

export default PostCreate;
