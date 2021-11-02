import { h } from "preact";
import { useState } from "preact/hooks";
import I18n from "i18n-js";
import { route } from "preact-router";
import Loading from "../../../../src/components/loading";
import VoucherListItem from "../components/voucherListItem";
import style from "../style.less";

const VoucherList = ({ vouchers }) => {
	const [search, setSearch] = useState("");
	const [filterSelection, setFilterSelection] = useState("all-vouchers");
	if (!vouchers) return <Loading />
	return (
		<div>
			<div class={style.filterBox}>
				<div>
					<label for="search-by">{I18n.t("search by")}</label>
					<input id="search-by" onChange={(e) => setSearch(e.target.value)} />
				</div>
				<div>
					<label for="filter-by">{I18n.t("filter by")}</label>
					<select
						id="filter-by"
						onChange={(e) => setFilterSelection(e.target.value)}
					>
						<option value="all-vouchers">{I18n.t("All Vouchers")}</option>
						<option value="available">{I18n.t("available")}</option>
						<option value="used">{I18n.t("used")}</option>
						<option value="disabled">{I18n.t("disabled")}</option>
					</select>
				</div>
			</div>
			<div class={style.divider}>
				<hr />
				<h2>{I18n.t("Voucher list")}</h2>
			</div>
			<div class={style.voucherBox}>
				{vouchers
					.filter((voucher) => {
						if (filterSelection === "all-vouchers") return true;
						return voucher.status === filterSelection;
					})
					.filter((voucher) => {
						if (!search || search === "") return true;
						return voucher.name.includes(search);
					})
					.map((voucher) => (
						<VoucherListItem {...voucher} key={voucher.id} />
					))}
			</div>
			{vouchers.length === 0 && (
				<span>
					{I18n.t("There are no vouchers matching the current criteria")}
				</span>
			)}
			<button class={style.fab} onClick={() => route("/access/create")}>
				{I18n.t("Create")}
			</button>
		</div>
	);
};

export default VoucherList;
