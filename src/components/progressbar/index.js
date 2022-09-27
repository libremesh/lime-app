import { h } from "preact";

import style from "./style.less";

const ProgressBar = ({ color = "#38927f", progress = 0 }) => (
    <div className={style.wrapper}>
        <div
            className={style.progress}
            style={{ backgroundColor: color, width: `${progress}%` }}
        />
    </div>
);

export default ProgressBar;
