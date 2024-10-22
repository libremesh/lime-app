import { Trans } from "@lingui/macro";
import { createContext } from "preact";
import { createPortal } from "preact/compat";
import { useCallback, useContext, useState } from "preact/hooks";

import { Button } from "components/buttons/button";
import Divider from "components/divider";

export type ModalActionsProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: CallbackFn;
    onDelete?: CallbackFn;
};

export type ModalPortalProps = {
    children?;
    title?;
    cancelBtn?;
    successBtnText?;
    deleteBtnText?;
};

type ModalContextProps = {
    isLoading: boolean;
} & ModalProps;

type CallbackFn = () => void | Promise<void>;

const ModalContext = createContext<ModalContextProps | null>(null);

export type ModalProps = ModalActionsProps & ModalPortalProps;

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a Modal component");
    }
    return context;
};

export const Modal = ({
    children,
    title,
    cancelBtn = false,
    onSuccess,
    successBtnText,
    onDelete,
    deleteBtnText,
    isOpen,
    onClose,
}: ModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const runCb = useCallback(
        async (cb: CallbackFn) => {
            if (isLoading) return;
            setIsLoading(true);
            await cb();
            // For some reason non async functions doesn't work properly.
            // This is a trick to let them be called properly
            await new Promise((resolve) => setTimeout(resolve, 0));
            setIsLoading(false);
        },
        [isLoading]
    );

    let successCb = null;
    if (onSuccess) {
        successCb = () => runCb(onSuccess);
    }

    let deleteCb = null;
    if (onDelete) {
        deleteCb = () => runCb(onDelete);
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                onClose,
                isLoading,
                onSuccess: successCb,
                onDelete: deleteCb,
            }}
        >
            {isOpen && (
                <ModalPortal
                    title={title}
                    cancelBtn={cancelBtn}
                    successBtnText={successBtnText}
                    deleteBtnText={deleteBtnText}
                >
                    {children}
                </ModalPortal>
            )}
        </ModalContext.Provider>
    );
};

const ModalPortal = ({
    children,
    title,
    cancelBtn = false,
    successBtnText = <Trans>Success</Trans>,
    deleteBtnText = <Trans>Delete</Trans>,
}: ModalPortalProps) => {
    const { isOpen, isLoading, onClose, onSuccess, onDelete } = useModal();

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <>
            <div className={"fixed z-[90] inset-0 overflow-y-auto"}>
                <div
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0"
                    onClick={() => {
                        if (!isLoading) onClose();
                    }}
                >
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>

                    <div
                        onClick={stopPropagation}
                        className="flex flex-col px-6 justify-between w-full min-h-96 md:w-10/12 md:mx-24 self-center bg-white rounded-lg overflow-auto text-left shadow-xl transform transition-all "
                    >
                        <div className="bg-white pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mt-3 text-start sm:mt-0 sm:text-left">
                                {title && (
                                    <h3 className="text-4xl text-gray-900 mb-7">
                                        {title}
                                    </h3>
                                )}
                                <div className="mt-2">{children}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div class="flex justify-center">
                                <Divider color={"gray"} />
                            </div>
                            <div className="pb-5 pt-2 sm:px-6 flex flex-row-reverse gap-3">
                                {onSuccess && (
                                    <Button
                                        color={"primary"}
                                        onClick={onSuccess}
                                        disabled={isLoading}
                                    >
                                        {successBtnText}
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        color={"danger"}
                                        onClick={onDelete}
                                        disabled={isLoading}
                                    >
                                        {deleteBtnText}
                                    </Button>
                                )}
                                {cancelBtn && (
                                    <Button
                                        color={"info"}
                                        outline={true}
                                        onClick={onClose}
                                        disabled={isLoading}
                                    >
                                        <Trans>Close</Trans>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;
