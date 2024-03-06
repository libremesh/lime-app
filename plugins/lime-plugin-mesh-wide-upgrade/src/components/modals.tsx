import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useCallback } from "react";

import { useModal } from "components/Modal/Modal";

export const useScheduleUpgradeModal = ({
    allNodesReady,
    cb,
}: IUseParallelQueriesModalProps) => {
    let title = <Trans>All nodes are ready</Trans>;
    let content = (
        <Trans>Schedule a firmware upgrade for all nodes on the nevtwork</Trans>
    );
    if (!allNodesReady) {
        title = <Trans>Some nodes are not ready</Trans>;
        content = (
            <Trans>
                Are you sure you want to start mesh wide upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }

    return useParallelQueriesModal({
        allNodesReady,
        cb,
        title,
        content,
    });
};

export const useConfirmModal = ({
    allNodesReady,
    cb,
}: IUseParallelQueriesModalProps) => {
    let title = <Trans>All nodes are upgraded successfully</Trans>;
    let content = (
        <Trans>Confirm mesh wide upgrade for all nodes on the network</Trans>
    );
    if (!allNodesReady) {
        title = <Trans>Some nodes are not ready</Trans>;
        content = (
            <Trans>
                Are you sure you want to confirm the upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }
    return useParallelQueriesModal({
        allNodesReady,
        cb,
        title,
        content,
    });
};

interface IUseParallelQueriesModalProps {
    allNodesReady: boolean;
    cb?: (e) => void;
    title?: VNode;
    content?: VNode;
}

const useParallelQueriesModal = ({
    allNodesReady,
    cb,
    title,
    content,
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
            successCb: allNodesReady && runAndClose,
            deleteCb: !allNodesReady && runAndClose,
            successBtnText: <Trans>Schedule</Trans>,
            deleteBtnText: <Trans>Schedule</Trans>,
        });
        toggleModal();
    }, [setModalState, content, title, allNodesReady, cb, toggleModal]);
    return { showModal, toggleModal };
};
