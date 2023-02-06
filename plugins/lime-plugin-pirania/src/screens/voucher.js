import { i18n } from "@lingui/core";
import { Plural, Trans } from "@lingui/macro";
import { route } from "preact-router";

import { ConfigPageLayout } from "plugins/lime-plugin-node-admin/src/layouts";

import Copy from "../components/copy";
import { useListVouchers } from "../piraniaQueries";
import style from "../style.less";

const statusMsgs = {
    available: <Trans>Available</Trans>,
    expired: <Trans>Expired</Trans>,
    active: <Trans>Active</Trans>,
    invalidated: <Trans>Invalidated</Trans>,
};

const formatDate = (date) =>
    Number.isInteger(date) &&
    i18n.date(new Date(date * 1000), {
        dateStyle: "medium",
        timeStyle: "medium",
    });

const Duration = ({ days }) => (
    <Trans>
        Duration: <Plural value={days} one="# day" other="# days" />
    </Trans>
);

const VoucherDetails = ({
    id,
    code,
    name,
    status,
    creation_date,
    expiration_date,
    activation_date,
    activation_deadline,
    duration_m,
    permanent,
    author_node,
}) => {
    const durationInDays = duration_m && parseInt(duration_m / (24 * 60), 10);
    return (
        <div class="d-flex flex-grow-1 flex-column container-padded">
            <div class="d-flex flex-grow-1 flex-column">
                <div class="text-center">
                    <Copy text={code} className={style.voucherCode} />
                </div>
                <div>
                    <Trans>Description: {name}</Trans>
                </div>
                <div>
                    <Trans>Author node: {author_node}</Trans>
                </div>
                <div>
                    <Trans>Creation date: {formatDate(creation_date)}</Trans>
                </div>
                <div>
                    {!permanent && <Duration days={durationInDays} />}
                    {permanent && <Trans>Duration: is permanent</Trans>}
                </div>
                <div>
                    <Trans>Status: {statusMsgs[status]}</Trans>
                </div>
                {status === "expired" && (
                    <div>
                        <Trans>
                            Expiration date: {formatDate(expiration_date)}
                        </Trans>
                    </div>
                )}
                {status === "active" && (
                    <div>
                        <Trans>
                            Activation date: {formatDate(activation_date)}
                        </Trans>
                    </div>
                )}
                {status === "available" && activation_deadline && (
                    <div>
                        <Trans>
                            Activation deadline:{" "}
                            {formatDate(activation_deadline)}
                        </Trans>
                    </div>
                )}
            </div>
            <button onClick={() => route(`/access/edit/${id}`)}>
                <Trans>Edit</Trans>
            </button>
            {(status == "available" || status == "active") && (
                <button
                    class="text-danger"
                    onClick={() => route(`/access/invalidate/${id}`)}
                >
                    <Trans>Invalidate</Trans>
                </button>
            )}
        </div>
    );
};

const Voucher = ({ id }) => {
    const { data: vouchers, isLoading } = useListVouchers();
    const voucher = vouchers && vouchers.filter((v) => v.id === id)[0];
    return (
        <ConfigPageLayout
            {...{
                isLoading,
                title: <Trans>Voucher Details</Trans>,
                backUrl: "/access",
            }}
        >
            <VoucherDetails {...voucher} />
        </ConfigPageLayout>
    );
};

export default Voucher;
