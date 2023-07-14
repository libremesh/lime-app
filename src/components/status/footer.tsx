import Divider from "components/divider";
import {
    IStatusAndButton,
    StatusAndButton,
} from "components/status/statusAndButton";

export const FooterStatus = ({ children, ...rest }: IStatusAndButton) => {
    return (
        <div className="z-50 fixed bottom-0 w-full flex flex-col bg-white px-2">
            <Divider />
            <StatusAndButton {...rest}>
                <>{children} </>
            </StatusAndButton>
        </div>
    );
};
