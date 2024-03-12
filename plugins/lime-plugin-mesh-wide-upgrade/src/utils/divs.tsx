import { VNode } from "preact";

export const CenterFlex = ({ children }: { children: VNode }) => {
    return (
        <div className="flex-grow flex flex-col justify-center content-center text-center h-full max-h-full">
            {children}
        </div>
    );
};
