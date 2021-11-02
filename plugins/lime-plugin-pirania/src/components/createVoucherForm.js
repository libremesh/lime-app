import { h } from "preact";
import { useState } from "preact/hooks";
import I18n from "i18n-js";
import style from "../style.less";
const maxLength = 100;

const CreateVoucherForm = ({ submitVoucher }) => {
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
	return (
		<form class={style.createForm} onSubmit={(e) => submitVoucher(e, input)}>
			<label for="description">{I18n.t("Voucher group description")}</label>
			<textarea
				required
				maxLength={maxLength}
				value={input.name}
				id="description"
				onChange={(e) => changeInput("name", e.target.value)}
			/>
			<div class={style.isPermanent}>
				<label for="permanent">{I18n.t("Is permanent")}</label>
				<input
					checked={input.permanent}
					type="checkbox"
					value={input.permanent}
					id="permanent"
					onChange={() => changeInput("permanent", !input.permanent)}
				/>
			</div>
			<label style={{ opacity: input.permanent ? 0.3 : 1 }} for="duration">
				{I18n.t("Voucher duration in days")}
			</label>
			<input
				disabled={input.permanent}
				type={input.permanent ? "text" : "number"}
				min="1"
				value={input.permanent ? I18n.t("Permanently") : input.duration_m}
				id="duration"
				onChange={(e) => changeInput("duration_m", e.target.value)}
			/>
			<label for="quantity">{I18n.t("Number of vouchers")}</label>
			<input
				type="number"
				min="1"
				max="10"
				value={input.qty}
				id="quantity"
				onChange={(e) => changeInput("qty", e.target.value)}
			/>
			<button type="submit">{I18n.t("Create")}</button>
		</form>
	);
};

export default CreateVoucherForm;
