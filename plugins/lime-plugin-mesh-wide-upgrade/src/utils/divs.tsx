import { PropsWithChildren } from "react";

export const CenterFlex = (props: PropsWithChildren) => {
    return (
        <div className="flex-grow flex flex-col justify-center content-center text-center h-full max-h-full">
            {props.children}
        </div>
    );
};
