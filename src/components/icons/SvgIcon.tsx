import { VNode } from "preact";

export interface IconProps {
    width?: number;
    height?: number;
    className?: string;
}

interface SvgIconProps {
    children?: VNode;
    viewBox?: string;
}

export const SvgIcon = ({
    children,
    width = 24,
    height = 24,
    viewBox = "0 0 24 24",
    className,
}: SvgIconProps & IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            className={className}
        >
            {children}
        </svg>
    );
};
