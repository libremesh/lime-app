interface ButtonProps {
    onClick?: () => void;
    children?: string;
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    size = "md",
    onClick,
    children,
    ...props
}: ButtonProps) => {
    let sizeClasses = "";
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

    const cls = `bg-button-primary text-white font-semibold rounded-xl text-center place-content-center justify-center border-0 ${sizeClasses}`;
    return (
        <div type="button" onClick={onClick} className={cls} {...props}>
            {children}
        </div>
    );
};
