interface ButtonProps {
    onClick?: () => void;
    children?: any; // type error with Trans component
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary";
    href?: string;
}

export const Button = ({
    size = "md",
    color = "primary",
    onClick,
    children,
    href,
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
            colorClasses = "bg-button-primary";
            break;
        case "secondary":
            colorClasses = "bg-button-secondary";
            break;
    }

    const cls = `cursor-pointer text-white font-semibold rounded-xl text-center place-content-center
    justify-center border-0 ${sizeClasses}  ${colorClasses}`;

    if (href) {
        return (
            <a href={href}>
                <div type="button" onClick={onClick} className={cls} {...props}>
                    {children}
                </div>
            </a>
        );
    }
    return (
        <div type="button" onClick={onClick} className={cls} {...props}>
            {children}
        </div>
    );
};
