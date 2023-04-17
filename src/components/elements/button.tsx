import React from "react";

interface ButtonProps {
    onClick?: () => void;
    children?: any; // type error with Trans component
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "danger";
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
                ? "border-2 border-button-primary text-button-primary"
                : "bg-button-primary text-white";
            break;
        case "secondary":
            colorClasses = outline
                ? "border-2 border-button-secondary text-button-secondary"
                : "bg-button-secondary text-white";
            break;
        case "danger":
            colorClasses = outline
                ? "border-2 border-danger text-danger"
                : "bg-danger text-white";
    }

    const cls = `cursor-pointer font-semibold rounded-xl text-center place-content-center
    justify-center border-0 ${sizeClasses}  ${colorClasses}`;
    const Btn = () => (
        // @ts-ignore
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
