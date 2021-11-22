import { h } from "preact";
import { useState } from "preact/hooks";
import { Trans, t } from '@lingui/macro';
import style from "../style.less";
import Loading from "../../../../src/components/loading";
const maxLength = 100;

const CreateVoucherForm = ({ submitVoucher }) => {
	const [loading, setLoading] = useState(false);
	const [input, updateInput] = useState({
		duration_m: 1,
		name: "",
		qty: 1,
		permanent: false
	});
	const changeInput = (field, value) => {
		if (field === "name" && value.length > maxLength) {
			value = value.slice(0, maxLength);
		}
		updateInput({
			...input,
			[field]: value
		});
	};
	const createVoucher = (e) => {
		setLoading(true);
		submitVoucher(e, input);
	};
	return (
		<form class={style.createForm} onSubmit={(e) => createVoucher(e)}>
			<label for="description"><Trans>Voucher group description</Trans></label>
			<textarea
				required
				maxLength={maxLength}
				value={input.name}
				id="description"
				onChange={(e) => changeInput("name", e.target.value)}
			/>
			<div class={style.isPermanent}>
				<label for="permanent"><Trans>Is permanent</Trans></label>
				<input
					checked={input.permanent}
					type="checkbox"
					value={input.permanent}
					id="permanent"
					onChange={() => changeInput("permanent", !input.permanent)}
				/>
			</div>
			<label style={{ opacity: input.permanent ? 0.3 : 1 }} for="duration">
				<Trans>Voucher duration in days</Trans>
			</label>
			<input
				disabled={input.permanent}
				type={input.permanent ? "text" : "number"}
				min="1"
				value={input.permanent ? t`Permanently` : input.duration_m}
				id="duration"
				onChange={(e) => changeInput("duration_m", e.target.value)}
			/>
			<label for="quantity"><Trans>Number of vouchers</Trans></label>
			<input
				type="number"
				min="1"
				max="10"
				value={input.qty}
				id="quantity"
				onChange={(e) => changeInput("qty", e.target.value)}
			/>
			{loading ? (
				<Loading />
			) : (
				<button type="submit"><Trans>Create</Trans></button>
			)}
		</form>
	);
};

export default CreateVoucherForm;
