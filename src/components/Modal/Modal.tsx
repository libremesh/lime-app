import { Trans } from "@lingui/macro";
import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { useCallback } from "react";

import { Button } from "components/buttons/button";
import Divider from "components/divider";

interface ModalContextProps {
    isModalOpen: boolean;
    toggleModal: () => void;
    setModalState: (state?: ModalState) => void;
    isLoading: boolean;
}

type CallbackFn = () => void | Promise<void>;

interface ModalState {
    content?: ComponentChildren;
    title: ComponentChildren | string;
    cancelBtn?: boolean;
    successCb?: CallbackFn;
    successBtnText?: ComponentChildren;
    deleteCb?: CallbackFn;
    deleteBtnText?: ComponentChildren;
    isLoading?: boolean;
}

const ModalContext = createContext<ModalContextProps>({
    isModalOpen: false,
    toggleModal: () => {},
    setModalState: () => {},
    isLoading: false,
});

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a UseModalProvider");
    }
    return context;
};

export type ModalActions = "success" | "delete";

export const UseModalProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [modalState, setModalState] = useState<ModalState>({
        content: <></>,
        title: "",
        cancelBtn: false,
        successCb: () => {},
        successBtnText: <Trans>Success</Trans>,
        deleteCb: () => {},
        deleteBtnText: <Trans>Cancel</Trans>,
    });

    const toggleModal = useCallback(() => {
        setModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    }, [isModalOpen]);

    const runCb = useCallback(
        async (cb: CallbackFn) => {
            if (isLoading) return;
            setIsLoading(true);
            await cb();
            setIsLoading(false);
        },
        [isLoading]
    );

    const successCb =
        modalState.successCb != null ? () => runCb(modalState.successCb) : null;
    const deleteCb =
        modalState.deleteCb != null ? () => runCb(modalState.deleteCb) : null;

    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                toggleModal,
                setModalState,
                isLoading,
            }}
        >
            {children}
            <Modal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                title={modalState.title}
                cancelBtn={modalState.cancelBtn}
                successCb={successCb}
                successBtnText={modalState.successBtnText}
                deleteCb={deleteCb}
                deleteBtnText={modalState.deleteBtnText}
                isLoading={isLoading}
            >
                {modalState.content}
            </Modal>
        </ModalContext.Provider>
    );
};

const Modal = ({
    isModalOpen,
    toggleModal,
    children,
    title,
    cancelBtn = true,
    successCb,
    successBtnText = <Trans>Success</Trans>,
    deleteCb,
    deleteBtnText = <Trans>Cancel</Trans>,
    isLoading,
}: {
    isModalOpen: boolean;
    toggleModal: () => void;
    children?: ComponentChildren;
} & ModalState) => {
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <div
                className={`${
                    isModalOpen
                        ? "fixed z-[90] inset-0 overflow-y-auto"
                        : "hidden"
                }`}
            >
                <div
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0"
                    onClick={() => {
                        if (!isLoading) toggleModal();
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
                        className="flex flex-col px-6 justify-between w-full md:w-10/12 h-96 md:mx-24 self-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
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
                                {/*<div className="px-4 py-3 sm:px-6 flex flex-col md:flex md:flex-row-reverse gap-3">*/}
                                {successCb && (
                                    <Button
                                        color={"primary"}
                                        onClick={successCb}
                                        disabled={isLoading}
                                    >
                                        {successBtnText}
                                    </Button>
                                )}
                                {deleteCb && (
                                    <Button
                                        color={"danger"}
                                        onClick={deleteCb}
                                        disabled={isLoading}
                                    >
                                        {deleteBtnText}
                                    </Button>
                                )}
                                {cancelBtn && (
                                    <Button
                                        color={"info"}
                                        outline={true}
                                        onClick={toggleModal}
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
        </>
    );
};

export default Modal;
