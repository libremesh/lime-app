import { ComponentChildren } from "preact";
import React, { createContext, useContext, useState } from "react";

import Toast, { IToastProps } from "components/toast/index";

const ToastContext = createContext<
    | {
          showToast: (toastProps: IToastProps) => void;
          hideToast: () => void;
      }
    | undefined
>(undefined);

interface ToastProviderProps {
    children: ComponentChildren;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toastProps, setToastProps] = useState<IToastProps | null>(null);

    const showToast = (props: IToastProps) => setToastProps(props);
    const hideToast = () => setToastProps(null);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toastProps && <Toast {...toastProps} onHide={hideToast} />}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
