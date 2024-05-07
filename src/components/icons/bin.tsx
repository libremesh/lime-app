import { IconProps, SvgIcon } from "components/icons/SvgIcon";

export const BinIcon = ({ ...props }: IconProps) => (
    <SvgIcon
        viewBox="0 0 15 15"
        fill={props.fill ?? "none"}
        width={props.width ?? "15"}
        height={props.height ?? "15"}
        className={props.className ?? ""}
        {...props}
    >
        <path
            d="M4.5 3V1.5a1 1 0 011-1h4a1 1 0 011 1V3M0 3.5h15m-13.5 0v10a1 1 0 001 1h10a1 1 0 001-1v-10M7.5 7v5m-3-3v3m6-3v3"
            stroke="currentColor"
        />
    </SvgIcon>
);
