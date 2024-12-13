import Divider from "components/divider";
import {
    IStatusAndButton,
    StatusAndButton,
} from "components/status/statusAndButton";

export type FooterProps = IStatusAndButton & { fixed?: boolean };

export const FooterStatus = ({
    children,
    fixed = true,
    ...rest
}: FooterProps) => {
    return (
        <div
            className={`z-50 bottom-0 w-full flex flex-col bg-white px-2 ${
                fixed ? "fixed" : ""
            }`}
        >
            <Divider />
            <StatusAndButton {...rest}>
                <>{children} </>
            </StatusAndButton>
        </div>
    );
};
