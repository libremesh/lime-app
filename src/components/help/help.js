import { useToggle } from "react-use";

import style from "./style.less";

const Help = ({ Content }) => {
    const [shown, toggleShown] = useToggle(false);
    return (
        <div>
            <div
                className={style.symbol}
                onClick={toggleShown}
                aria-label="help"
            >
                ?
            </div>
            {shown && <div className={style.background} />}
            {shown && (
                <div className={style.tooltipWrapper} onClick={toggleShown}>
                    <div
                        className={`${style.tooltip} d-flex flex-column`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="d-flex flex-grow-1">
                            <div
                                className={style.tooltipX}
                                onClick={toggleShown}
                            >
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
