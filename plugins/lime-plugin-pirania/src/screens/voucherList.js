import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import Loading from "components/loading";

import { useBoardData } from "utils/queries";

import VoucherListItem from "../components/voucherListItem";
import { useListVouchers } from "../piraniaQueries";
import style from "../style.less";

const VoucherList = () => {
    const { data: boardData, isLoading: loadingBoardData } = useBoardData();
    const { data: vouchers, isLoading: loadingVouchers } = useListVouchers();
    const [search, setSearch] = useState("");
    const [filterSelection, setFilterSelection] = useState(
        "created-in-this-node"
    );

    if (loadingBoardData || loadingVouchers) return <Loading />;

    const filteredVoucher = vouchers
        .sort((a, b) => {
            return parseInt(a.creation_date, 10) < parseInt(b.creation_date, 10)
                ? 1
                : -1;
        })
        .filter((voucher) => {
            if (filterSelection === "all-vouchers") return true;
            if (filterSelection === "created-in-this-node") {
                return voucher.author_node === boardData.hostname;
            }
            return voucher.status === filterSelection;
        })
        .filter((voucher) => {
            if (!search || search === "") return true;
            const withName = voucher.name.includes(search);
            const withNode = voucher.author_node?.includes(search);
            const withId = voucher.id.includes(search);
            const withCode = voucher.code.includes(search);
            if (withName || withNode || withId || withCode) return true;
        });

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto container-padded">
                <div className="text-center">
                    <h2>
                        <Trans>Voucher list</Trans>
                    </h2>
                </div>
                <div>
                    <div>
                        <label htmlFor="search-by">
                            <Trans>Search by</Trans>
                        </label>
                        <input
                            type="text"
                            id="search-by"
                            className="w-100"
                            // @ts-ignore
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="filter-by">
                            <Trans>Filter by</Trans>
                        </label>
                        <select
                            id="filter-by"
                            className="w-100"
                            // @ts-ignore
                            onChange={(e) => setFilterSelection(e.target.value)}
                            value={filterSelection}
                        >
                            <option value="created-in-this-node">
                                <Trans>Created in this node</Trans>
                            </option>
                            <option value="all-vouchers">
                                <Trans>All Vouchers</Trans>
                            </option>
                            <option value="available">
                                <Trans>Available</Trans>
                            </option>
                            <option value="active">
                                <Trans>Active</Trans>
                            </option>
                            <option value="expired">
                                <Trans>Expired</Trans>
                            </option>
                            <option value="invalidated">
                                <Trans>Invalidated</Trans>
                            </option>
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    {filteredVoucher.map((voucher) => (
                        <div className="p-y-sm" key={voucher.id}>
                            <VoucherListItem {...voucher} />
                        </div>
                    ))}
                    {filteredVoucher.length === 0 && (
                        <span>
                            <Trans>
                                There are no vouchers matching the current
                                criteria
                            </Trans>
                        </span>
                    )}
                </div>
            </div>
            <div
                className={`d-flex justify-content-center align-items-center p-t-sm ${style.listBottomAction}`}
            >
                <button onClick={() => route("/access/create")}>
                    <Trans>Create</Trans>
                </button>
            </div>
        </div>
    );
};

export default VoucherList;
