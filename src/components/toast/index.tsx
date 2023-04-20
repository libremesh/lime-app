import { ComponentChildren } from "preact";

import style from "./style.less";

type ToastType = "success" | "error" | "info";

type ToastProps = {
    text: ComponentChildren;
    type?: ToastType;
    onHide?: () => void;
};

const getStyle = (type: ToastType) => {
    switch (type) {
        case "success":
            return style.success;
        case "error":
            return style.error;
        default:
            return "";
    }
};

const Toast = ({ text, type = "info", onHide }: ToastProps) => (
    <div className={style.toastWrapper}>
        <div className={`${style.toast} ${getStyle(type)}`} onClick={onHide}>
            {text}
        </div>
    </div>
);

export default Toast;
