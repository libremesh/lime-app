import { VNode } from "preact";

export interface IconProps {
    width?: number;
    height?: number;
    className?: string;
    dataTestId?: string;
}

interface SvgIconProps {
    children?: VNode;
    viewBox?: string;
}

export const SvgIcon = ({
    children,
    viewBox = "0 0 24 24",
    className = "h-8 w-8", // 32px
    dataTestId = "",
}: SvgIconProps & IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            className={className}
            data-testid={dataTestId}
        >
            {children}
        </svg>
    );
};
