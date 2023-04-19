import { useToggle } from "react-use";

import style from "./style.less";

const Help = ({ Content }) => {
    const [shown, toggleShown] = useToggle(false);
    return (
        <div>
            <div class={style.symbol} onClick={toggleShown} aria-label="help">
                ?
            </div>
            {shown && <div class={style.background} />}
            {shown && (
                <div class={style.tooltipWrapper} onClick={toggleShown}>
                    <div
                        class={`${style.tooltip} d-flex flex-column`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div class="d-flex flex-grow-1">
                            <div class={style.tooltipX} onClick={toggleShown}>
                                X
                            </div>
                        </div>
                        <Content />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Help;
