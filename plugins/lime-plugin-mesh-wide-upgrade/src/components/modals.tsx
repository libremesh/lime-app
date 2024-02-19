import { Trans } from "@lingui/macro";
import { useCallback } from "react";

import { useModal } from "components/Modal/Modal";

export const useScheduleUpgradeModal = ({
    allNodesReady,
    cb,
}: {
    allNodesReady: boolean;
    cb?: (e) => void;
}) => {
    const { toggleModal, setModalState } = useModal();

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

    const showScheduleModal = useCallback(() => {
        setModalState({
            content,
            title,
            successCb: allNodesReady && cb,
            deleteCb: !allNodesReady && cb,
            successBtnText: <Trans>Schedule</Trans>,
            deleteBtnText: <Trans>Schedule</Trans>,
        });
        toggleModal();
    }, [setModalState, content, title, allNodesReady, cb, toggleModal]);
    return { showScheduleModal, toggleModal };
};
