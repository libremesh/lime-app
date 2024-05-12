import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useCallback } from "react";

import { useModal } from "components/Modal/Modal";

interface IUseParallelQueriesModalProps {
    useSuccessBtn?: boolean;
    cb?: (e) => void;
    title?: VNode;
    content?: VNode;
    btnTxt?: VNode;
}

const useParallelQueriesModal = ({
    useSuccessBtn,
    cb,
    title,
    content,
    btnTxt = <Trans>Schedule</Trans>,
}: IUseParallelQueriesModalProps) => {
    const { toggleModal, setModalState } = useModal();
    const runAndClose = useCallback(() => {
        cb(null);
        toggleModal();
    }, [cb, toggleModal]);

    const showModal = useCallback(() => {
        setModalState({
            content,
            title,
            successCb: useSuccessBtn ? runAndClose : undefined,
            deleteCb: !useSuccessBtn ? runAndClose : undefined,
            successBtnText: btnTxt,
            deleteBtnText: btnTxt,
        });
        toggleModal();
    }, [
        setModalState,
        content,
        title,
        useSuccessBtn,
        runAndClose,
        btnTxt,
        toggleModal,
    ]);
    return { showModal, toggleModal };
};

export const useScheduleUpgradeModal = ({
    useSuccessBtn,
    cb,
}: IUseParallelQueriesModalProps) => {
    let title = <Trans>All nodes are ready</Trans>;
    let content = (
        <Trans>Schedule a firmware upgrade for all nodes on the network</Trans>
    );
    if (!useSuccessBtn) {
        title = <Trans>Some nodes are not ready</Trans>;
        content = (
            <Trans>
                Are you sure you want to start mesh wide upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }

    return useParallelQueriesModal({
        useSuccessBtn,
        cb,
        title,
        content,
    });
};

export const useConfirmModal = ({
    useSuccessBtn,
    cb,
}: IUseParallelQueriesModalProps) => {
    let title = <Trans>All nodes are upgraded successfully</Trans>;
    let content = (
        <Trans>Confirm mesh wide upgrade for all nodes on the network</Trans>
    );
    if (!useSuccessBtn) {
        title = <Trans>Some nodes don't upgraded properly</Trans>;
        content = (
            <Trans>
                Are you sure you want to confirm the upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }
    return useParallelQueriesModal({
        useSuccessBtn,
        cb,
        title,
        content,
    });
};

export const useAbortModal = ({ cb }: IUseParallelQueriesModalProps) => {
    const title = <Trans>Abort current mesh wide upgrade?</Trans>;
    const content = (
        <Trans>
            This will the abort current upgrade process on all nodes. Are you
            sure you want to proceed?
        </Trans>
    );
    const btnTxt = <Trans>Abort</Trans>;
    return useParallelQueriesModal({
        useSuccessBtn: false,
        cb,
        title,
        content,
        btnTxt,
    });
};
