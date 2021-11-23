import { h } from "preact";
import { useState } from "preact/hooks";
import { Trans } from '@lingui/macro';
import { route } from "preact-router";
import Loading from "components/loading";
import VoucherListItem from "../components/voucherListItem";
import style from "../style.less";
import { useBoardData } from 'utils/queries';
import { useListVouchers } from '../piraniaQueries';

const VoucherList = () => {
	const { data: boardData, isLoading: loadingBoardData } = useBoardData();
	const { data: vouchers, isLoading: loadingVouchers } = useListVouchers();
	const [search, setSearch] = useState("");
	const [filterSelection, setFilterSelection] = useState("created-in-this-node");

	if (loadingBoardData || loadingVouchers) return <Loading />

	const filteredVoucher = vouchers
		.sort((a) => (a.author_node === boardData.hostname) ? -1 : 1)
		.filter((voucher) => {
			if (filterSelection === "all-vouchers") return true;
			if (filterSelection === "created-in-this-node") {
				return voucher.author_node === boardData.hostname 
			}
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


	return (
		<div class="d-flex flex-column flex-grow-1">
			<div class="flex-grow-1 overflow-auto container-padded">
				<div class="text-center">
					<h2><Trans>Voucher list</Trans></h2>
				</div>
				<div>
					<div>
						<label for="search-by"><Trans>Search by</Trans></label>
						<input id="search-by" class="w-100" onChange={(e) => setSearch(e.target.value)} />
					</div>
					<div>
						<label for="filter-by"><Trans>Filter by</Trans></label>
						<select
							id="filter-by" class="w-100"
							onChange={(e) => setFilterSelection(e.target.value)}
							value={filterSelection}
						>
							<option value="created-in-this-node"><Trans>Created in this node</Trans></option>
							<option value="all-vouchers"><Trans>All Vouchers</Trans></option>
							<option value="available"><Trans>Available</Trans></option>
							<option value="active"><Trans>Active</Trans></option>
							<option value="expired"><Trans>Expired</Trans></option>
						</select>
					</div>
				</div>
				<div class="d-flex flex-column flex-grow-1">
					{filteredVoucher.map((voucher) => (
						<div class="p-y-sm">
							<VoucherListItem {...voucher} key={voucher.id} />
						</div>
					))}
					{filteredVoucher.length === 0 && (
						<span>
							<Trans>There are no vouchers matching the current criteria</Trans>
						</span>
					)}
				</div>
			</div>
			<div class={`d-flex justify-content-center align-items-center p-t-sm ${style.listBottomAction}`}>
				<button onClick={() => route("/access/create")}>
					<Trans>Create</Trans>
				</button>
			</div>
		</div>
	);
};

export default VoucherList;
