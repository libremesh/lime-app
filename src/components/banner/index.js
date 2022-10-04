import { Trans } from "@lingui/macro";

import style from "./style";

export const Banner = ({
    onOk,
    onCancel,
    title,
    description,
    onNotShowAgain,
}) => (
    <div className={style.banner}>
        <h3>{title}</h3>
        <div className={style.description}>{description}</div>
        <div>
            <button className={style.bannerButton} onClick={onOk}>
                <Trans>Ok</Trans>
            </button>
            <button className={style.bannerButton} onClick={onCancel}>
                <Trans>Cancel</Trans>
            </button>
        </div>
        <div class={style.dontShowAgain}>
            <label>
                <input
                    type="checkbox"
                    name="not-show-again"
                    onInput={onNotShowAgain}
                />
                <Trans>Don't show this message again</Trans>
            </label>
        </div>
    </div>
);
