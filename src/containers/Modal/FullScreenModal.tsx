import { ComponentChildren } from "preact";
import { route } from "preact-router";

import Loading from "components/loading";

/**
 * Used to show a new view with a close button that return to the backUrl param. Is placed over
 * the navbar creating a modal like effect.
 */
export const FullScreenModal = ({
    title,
    children,
    isLoading,
    backUrl = "/meshwide",
}: {
    title: ComponentChildren;
    children: ComponentChildren;
    isLoading?: boolean;
    backUrl?: string;
}) => {
    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="fixed top-0 left-0 right-0 bg-white z-50 py-7 px-4 flex items-center font-medium">
                <div
                    className={`flex items-center justify-items-start cursor-pointer w-10 h-10 text-black text-3xl`}
                    onClick={() => route(backUrl)}
                >
                    X
                </div>
                <div className={"text-4xl text-black"}>{title}</div>
            </div>
            <div className={"pt-2 bg-white w-full"}>{children}</div>
        </div>
    );
};
