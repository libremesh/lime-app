import { IconProps, SvgIcon } from "components/icons/SvgIcon";

export const EditIcon = ({ ...props }: IconProps) => (
    <SvgIcon
        viewBox="0 0 15 15"
        fill={props.fill ?? "none"}
        width={props.width ?? "15"}
        height={props.height ?? "15"}
        className={props.className ?? ""}
        {...props}
    >
        <path
            d="M.5 9.5l-.354-.354L0 9.293V9.5h.5zm9-9l.354-.354a.5.5 0 00-.708 0L9.5.5zm5 5l.354.354a.5.5 0 000-.708L14.5 5.5zm-9 9v.5h.207l.147-.146L5.5 14.5zm-5 0H0a.5.5 0 00.5.5v-.5zm.354-4.646l9-9-.708-.708-9 9 .708.708zm8.292-9l5 5 .708-.708-5-5-.708.708zm5 4.292l-9 9 .708.708 9-9-.708-.708zM5.5 14h-5v1h5v-1zm-4.5.5v-5H0v5h1zM6.146 3.854l5 5 .708-.708-5-5-.708.708zM8 15h7v-1H8v1z"
            fill="currentColor"
        />
    </SvgIcon>
);
