import React from "react";

export interface ButtonProps {
    onClick?: (e) => void;
    children?: any; // type error with Trans component
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "danger" | "info" | "disabled";
    href?: string;
    outline?: boolean;
    disabled?: boolean;
}

export const Button = ({
    size = "md",
    color = "primary",
    onClick,
    children,
    href,
    disabled,
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

    color = disabled ? "disabled" : color;

    switch (color) {
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
        case "disabled":
            colorClasses = outline
                ? "border-2 border-button-disabled text-button-disabled hover:bg-button-disabled hover:text-white"
                : "bg-button-disabled text-white border-2 border-button-disabled hover:text-button-disabled hover:bg-white";
            break;
        case "primary":
        default:
            colorClasses = outline
                ? "border-2 border-button-primary text-button-primary hover:bg-button-primary hover:text-white"
                : "bg-button-primary text-white hover:bg-button-secondary";
            break;
    }

    const cls = `cursor-pointer font-semibold rounded-xl text-center place-content-center transition-all duration-300
    justify-center border-0 ${sizeClasses}  ${colorClasses}`;
    const Btn = () => (
        <div
            type="button"
            onClick={(e) => (!disabled ? onClick(e) : null)}
            className={cls}
            {...props}
        >
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
