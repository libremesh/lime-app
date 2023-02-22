interface ButtonProps {
    onClick?: () => void;
    children?: string;
}

export const Button = ({ onClick, children, ...props }: ButtonProps) => {
    const cls =
        "bg-button-primary text-white font-semibold rounded-xl px-4 py-2 justify-center border-0";
    return (
        <button type="button" onClick={onClick} className={cls} {...props}>
            {children}
        </button>
    );
};
