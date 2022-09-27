import { h } from "preact";

import style from "./style.less";

export const List = ({ children }) => <div class={style.list}>{children}</div>;

export const ListItem = ({ children, onClick, ...props }) => (
    <div
        class={`${style.listItem} ${onClick ? style.clickable : ""}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </div>
);
