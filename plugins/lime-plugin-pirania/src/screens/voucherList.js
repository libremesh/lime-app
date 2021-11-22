import { h } from "preact";
import { useState } from "preact/hooks";
import { Trans } from '@lingui/macro';
import { route } from "preact-router";
import Loading from "../../../../src/components/loading";
import VoucherListItem from "../components/voucherListItem";
import style from "../style.less";
import { useBoardData } from 'utils/queries';

const VoucherList = ({ vouchers }) => {
	const {data: boardData} = useBoardData()
	const [search, setSearch] = useState("");
	const [filterSelection, setFilterSelection] = useState("all-vouchers");
	if (!vouchers || !boardData) return <Loading />
	return (
		<div>
			<div class={style.filterBox}>
				<div>
					<label for="search-by"><Trans>search by</Trans></label>
					<input id="search-by" onChange={(e) => setSearch(e.target.value)} />
				</div>
				<div>
					<label for="filter-by"><Trans>filter by</Trans></label>
					<select
						id="filter-by"
						onChange={(e) => setFilterSelection(e.target.value)}
					>
						<option value="all-vouchers"><Trans>All Vouchers</Trans></option>
						<option value="available"><Trans>available</Trans></option>
						<option value="used"><Trans>used</Trans></option>
						<option value="disabled"><Trans>disabled</Trans></option>
					</select>
				</div>
			</div>
			<div class={style.divider}>
				<hr />
				<h2><Trans>Voucher list</Trans></h2>
			</div>
			<div class={style.voucherBox}>
				{vouchers
					.sort((a) => (a.author_node === boardData.hostname) ? -1 : 1)
					.filter((voucher) => {
						if (filterSelection === "all-vouchers") return true;
						return voucher.status === filterSelection;
					})
					.filter((voucher) => {
						if (!search || search === "") return true;
						const withName = voucher.name.includes(search);
						const withNode = voucher.author_node?.includes(search);
						const withId = voucher.id.includes(search);
						const withCode = voucher.code.includes(search);
						if (withName || withNode || withId || withCode) return true
					})
					.map((voucher) => (
						<VoucherListItem {...voucher} key={voucher.id} />
					))}
			</div>
			{vouchers.length === 0 && (
				<span>
					<Trans>There are no vouchers matching the current criteria</Trans>
				</span>
			)}
			<button class={style.fab} onClick={() => route("/access/create")}>
				<Trans>Create</Trans>
			</button>
		</div>
	);
};

export default VoucherList;
