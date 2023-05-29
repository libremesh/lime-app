import { VNode } from "preact";

export interface IconProps {
    width?: string;
    height?: string;
    className?: string;
    dataTestId?: string;
    fill?: string;
    onClick?: (e) => void;
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
    fill = "",
    width,
    height,
    onClick,
}: SvgIconProps & IconProps) => {
    return (
        <div onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                className={className}
                data-testid={dataTestId}
                fill={fill}
                width={width}
                height={height}
            >
                {children}
            </svg>
        </div>
    );
};
