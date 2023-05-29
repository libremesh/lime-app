import React from "react";

export interface ButtonProps {
    onClick?: () => void;
    children?: any; // type error with Trans component
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "danger" | "info";
    href?: string;
    outline?: boolean;
}

export const Button = ({
    size = "md",
    color = "primary",
    onClick,
    children,
    href,
    outline = false,
    ...props
}: ButtonProps) => {
    let sizeClasses = "",
        colorClasses = "";
    switch (size) {
        case "sm":
            sizeClasses = "py-2 px-4 text-sm";
            break;
        case "md":
            sizeClasses = "py-4 px-6  min-w-[theme('spacing[52]')]";
            break;
        case "lg":
            sizeClasses = "py-6 px-8";
            break;
    }

    switch (color) {
        case "primary":
            colorClasses = outline
                ? "border-2 border-button-primary text-button-primary hover:bg-button-primary hover:text-white"
                : "bg-button-primary text-white hover:bg-button-secondary";
            break;
        case "secondary":
            colorClasses = outline
                ? "border-2 border-button-secondary text-button-secondary hover:bg-button-secondary hover:text-white"
                : "bg-button-secondary text-white hover:bg-button-primary ";
            break;
        case "danger":
            colorClasses = outline
                ? "border-2 border-danger text-danger hover:bg-danger hover:text-white"
                : "bg-danger text-white border-2 border-danger hover:text-danger hover:bg-white";
            break;
        case "info":
            colorClasses = outline
                ? "border-2 border-button-info text-button-info hover:bg-button-info hover:text-white"
                : "bg-button-info text-white border-2 border-button-info hover:text-button-info hover:bg-white";
            break;
    }

    const cls = `cursor-pointer font-semibold rounded-xl text-center place-content-center transition-all duration-300
    justify-center border-0 ${sizeClasses}  ${colorClasses}`;
    const Btn = () => (
        <div type="button" onClick={onClick} className={cls} {...props}>
            {children}
        </div>
    );
    return href ? (
        <a href={href}>
            <Btn />
        </a>
    ) : (
        <Btn />
    );
};
