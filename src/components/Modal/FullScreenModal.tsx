import { ComponentChildren } from "preact";

import Loading from "components/loading";

export interface IFullScreenModalProps {
    title: ComponentChildren;
    children: ComponentChildren;
    isLoading?: boolean;
    onClose?: () => void;
}
/**
 * Used to show a new view with a close button that return to the backUrl param. Is placed over
 * the navbar creating a modal like effect.
 */
export const FullScreenModal = ({
    title,
    children,
    isLoading,
    onClose,
}: IFullScreenModalProps) => {
    return (
        <div className="fixed top-0 left-0 right-0 flex flex-col min-h-screen max-h-full w-full overflow-auto">
            <div className="bg-white z-50 py-7 px-4 flex items-center font-medium">
                <div
                    className={`flex items-center justify-items-start cursor-pointer w-10 h-10 text-black text-3xl`}
                    onClick={onClose}
                >
                    X
                </div>
                <div className={"text-4xl text-black"}>{title}</div>
            </div>
            <div
                className={
                    "flex flex-col pt-2 bg-white w-full min-h-full h-screen px-4"
                }
            >
                {isLoading ? <Loading /> : children}
            </div>
        </div>
    );
};
