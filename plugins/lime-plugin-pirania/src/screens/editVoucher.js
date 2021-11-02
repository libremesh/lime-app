import { h } from "preact";
import { useState } from "preact/hooks";
import I18n from "i18n-js";
import Loading from "../../../../src/components/loading";
import { route } from "preact-router";
import style from "../style.less";
import { useListVouchers, useRename } from "../piraniaQueries";
import GoBack from "../components/goBack";

const EditVoucherForm = ({ submit, permanent, name }) => {
	const [description, setDescription] = useState(name);
	const [isPermanent, setPermanent] = useState(permanent);

	return (
		<form onSubmit={() => submit(description)} style={style.createForm}>
			<label for="description">{I18n.t("description")}</label>
			<textarea
				id="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div class={style.isPermanent}>
				<label for="permanent">{I18n.t("permanent")}</label>
				<input
					checked={isPermanent}
					type="checkbox"
					value={isPermanent}
					id="permanent"
					onChange={() => setPermanent(!isPermanent)}
				/>
			</div>
			<button type="submit">{I18n.t("save")}</button>
		</form>
	);
};

const EditVoucher = ({ id }) => {
	const [renameVoucher] = useRename();
	const submit = async (name) => {
		await renameVoucher({
			id,
			name
		});
		route(`/access/view/${id}`);
	};
	const { data: vouchers } = useListVouchers();
	if (vouchers) {
		return (
			<div class="container container-padded">
				<div class={style.goBackTitle}>
					<GoBack url={`/access/view/${id}`} />
					<h1>{I18n.t("voucher details")}</h1>
				</div>
				<EditVoucherForm
					submit={submit}
					{...vouchers.filter((v) => v.id === id)[0]}
				/>
			</div>
		);
	} return <Loading />;
};

export default EditVoucher;
