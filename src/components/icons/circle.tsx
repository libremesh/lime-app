import { IconProps, SvgIcon } from "components/icons/SvgIcon";

export const Circle = ({ ...props }: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke-width="10" fill="none" />
    </SvgIcon>
);
