import style from "./style.less";

export const List = ({ children }) => (
    <div className={style.list}>{children}</div>
);

export const ListItem = ({ children, onClick, ...props }) => (
    <div
        className={`${style.listItem} ${onClick ? style.clickable : ""}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </div>
);
