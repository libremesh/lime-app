import { Plural, Trans } from "@lingui/macro";
import { route } from "preact-router";

import { ConfigPageLayout } from "plugins/lime-plugin-node-admin/src/layouts";

import Copy from "../components/copy";
import TimeAgo from "../components/timeAgo";
import { useListVouchers } from "../piraniaQueries";
import style from "../style.less";

const statusMsgs = {
    available: <Trans>Available</Trans>,
    expired: <Trans>Expired</Trans>,
    active: <Trans>Active</Trans>,
    invalidated: <Trans>Invalidated</Trans>,
};

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
    // @ts-ignore
    const durationInDays = duration_m && parseInt(duration_m / (24 * 60), 10);
    return (
        <div className="d-flex flex-grow-1 flex-column container-padded">
            <div className="d-flex flex-grow-1 flex-column">
                <div className="text-center">
                    <Copy text={code} className={style.voucherCode} />
                </div>
                <div>
                    <Trans>Description: {name}</Trans>
                </div>
                <div>
                    <Trans>Author node: {author_node}</Trans>
                </div>
                <div>
                    <Trans>
                        Creation date: {TimeAgo({ timestamp: creation_date })}
                    </Trans>
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
                            Expiration date:{" "}
                            {TimeAgo({ timestamp: expiration_date })}
                        </Trans>
                    </div>
                )}
                {status === "active" && (
                    <div>
                        <Trans>
                            Activation date:{" "}
                            {TimeAgo({ timestamp: activation_date })}
                        </Trans>
                    </div>
                )}
                {status === "available" && activation_deadline && (
                    <div>
                        <Trans>
                            Activation deadline:{" "}
                            {TimeAgo({ timestamp: activation_deadline })}
                        </Trans>
                    </div>
                )}
            </div>
            <button onClick={() => route(`/access/edit/${id}`)}>
                <Trans>Edit</Trans>
            </button>
            {(status == "available" || status == "active") && (
                <button
                    className="text-danger"
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
