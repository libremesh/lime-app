import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import style from "../style.less";
import Copy from "./copy";
import TimeAgo from "./timeAgo";

const VoucherListItem = ({
    name,
    code,
    creation_date,
    id,
    expiration_date,
    activation_deadline,
    author_node,
    status,
    permanent,
}) => {
    function goToVoucherView() {
        route(`/access/view/${id}`);
    }
    const statusMsgs = {
        available: <Trans>Available</Trans>,
        expired: <Trans>Expired</Trans>,
        active: <Trans>Active</Trans>,
        invalidated: <Trans>Invalidated</Trans>,
    };

    const statusClassName = {
        available: style.voucherStatusAvailable,
        active: "text-primary",
        expired: "text-danger",
    };

    return (
        <div
            className={`flex-grow-1 d-flex flex-column container-padded ${style.voucherItem}`}
            data-testid={`voucher-item-${id}`}
            onClick={goToVoucherView}
        >
            <div className="d-flex align-items-center">
                <div>
                    <Copy text={code} className={style.voucherCode} />
                </div>
                <div
                    className={`${style.voucherStatus} ${statusClassName[status]}`}
                >
                    {statusMsgs[status]}
                </div>
            </div>
            <div className={style.voucherDescription}>
                {author_node}: {name}
            </div>
            <div className="d-flex">
                <div className={`flex-grow-1 ${style.voucherDateLeft}`}>
                    {status === "active" && permanent && (
                        <span>
                            <Trans>Permanent</Trans>
                        </span>
                    )}
                    {status === "active" && expiration_date && (
                        <span>
                            <Trans>
                                Expires{" "}
                                {TimeAgo({ timestamp: expiration_date })}
                            </Trans>
                        </span>
                    )}
                    {status === "expired" && (
                        <span>
                            <Trans>
                                Expired{" "}
                                {TimeAgo({ timestamp: expiration_date })}
                            </Trans>
                        </span>
                    )}
                    {status === "available" && activation_deadline && (
                        <span>
                            <Trans>
                                Activation deadline:{" "}
                                {TimeAgo({ timestamp: activation_deadline })}
                            </Trans>
                        </span>
                    )}
                </div>
                <div className="ml-auto">
                    <Trans>
                        Created {TimeAgo({ timestamp: creation_date })}
                    </Trans>
                </div>
            </div>
        </div>
    );
};

export default VoucherListItem;
