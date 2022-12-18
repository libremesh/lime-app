import { Plural, Trans } from "@lingui/macro";
import { route } from "preact-router";

import Copy from "../components/copy";
import TimeAgo from "../components/timeAgo";
import style from "../style.less";

const CodesText = ({ vouchers }) => (
    <div className="text-center">
        {vouchers.map((v) => (
            <div key={v.id}>{v.code}</div>
        ))}
    </div>
);

const Duration = ({ days }) => {
    if (!days) {
        return <Trans>Duration: is permanent</Trans>;
    }
    return (
        <Trans>
            Duration: <Plural value={days} one="# day" other="# days" />
        </Trans>
    );
};

const PostCreate = ({ vouchers }) => {
    const { name, duration_m, activation_deadline } = vouchers[0];
    const durationInDays = duration_m && parseInt(duration_m / (24 * 60), 10);
    return (
        <div className="d-flex flex-grow-1 flex-column container-padded">
            <div className="d-flex flex-grow-1 flex-column">
                <div className="d-flex justify-content-center">
                    <h3>
                        <Trans>Created vouchers</Trans>
                    </h3>
                </div>
                <Copy
                    text={<CodesText vouchers={vouchers} />}
                    className={style.voucherCode}
                />
                <div className="container-padded">
                    <div>
                        <Trans>Description: {name}</Trans>
                    </div>
                    <div>
                        <Duration days={durationInDays} />
                    </div>
                    {activation_deadline && (
                        <div>
                            <Trans>
                                Activation deadline:{" "}
                                {TimeAgo({ timestamp: activation_deadline })}
                            </Trans>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={() => route(`/access`)}>
                <Trans>Ok</Trans>
            </button>
        </div>
    );
};

export default PostCreate;
