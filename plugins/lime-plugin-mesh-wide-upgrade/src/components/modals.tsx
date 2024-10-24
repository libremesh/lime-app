import { Trans } from "@lingui/macro";
import { ComponentChildren, VNode } from "preact";
import { useCallback } from "react";

import {
    CallbackFn,
    Modal,
    ModalProps,
    useModal,
} from "components/Modal/Modal";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import {
    useParallelConfirmUpgrade,
    useParallelScheduleUpgrade,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

type IUseParallelQueriesModalProps = {
    isSuccess: boolean;
} & Pick<ModalProps, "isOpen" | "onClose">;

export const ParallelQueriesModal = ({
    children,
    isSuccess,
    cb,
    ...rest
}: {
    cb: CallbackFn;
    children: ComponentChildren;
} & IUseParallelQueriesModalProps &
    Pick<ModalProps, "title">) => {
    let props: Partial<
        Pick<
            ModalProps,
            "onSuccess" | "onDelete" | "successBtnText" | "deleteBtnText"
        >
    > = {
        onSuccess: cb,
        successBtnText: <Trans>Schedule</Trans>,
    };
    if (!isSuccess) {
        props = {
            onDelete: cb,
            deleteBtnText: <Trans>Schedule</Trans>,
        };
    }
    return (
        <Modal {...props} {...rest}>
            {children}
        </Modal>
    );
};

export const ScheduleUpgradeModal = (props: IUseParallelQueriesModalProps) => {
    const { callMutations: startScheduleMeshUpgrade } =
        useParallelScheduleUpgrade();

    let title = <Trans>All nodes are ready</Trans>;
    let content = (
        <Trans>Schedule a firmware upgrade for all nodes on the network</Trans>
    );
    if (!props.isSuccess) {
        title = <Trans>Some nodes are not ready</Trans>;
        content = (
            <Trans>
                Are you sure you want to start mesh wide upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }

    return (
        <ParallelQueriesModal
            cb={() => {
                startScheduleMeshUpgrade();
                props.onClose();
            }}
            title={title}
            {...props}
        >
            {content}
        </ParallelQueriesModal>
    );
};

export const ConfirmModal = (props: IUseParallelQueriesModalProps) => {
    const { callMutations: confirmMeshUpgrade } = useParallelConfirmUpgrade();

    let title = <Trans>All nodes are upgraded successfully</Trans>;
    let content = (
        <Trans>Confirm mesh wide upgrade for all nodes on the network</Trans>
    );
    if (!props.isSuccess) {
        title = <Trans>Some nodes don't upgraded properly</Trans>;
        content = (
            <Trans>
                Are you sure you want to confirm the upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }
    return (
        <ParallelQueriesModal
            cb={() => {
                confirmMeshUpgrade();
                props.onClose();
            }}
            title={title}
            {...props}
        >
            {content}
        </ParallelQueriesModal>
    );
};

export const AbortModal = ({
    ...props
}: Omit<IUseParallelQueriesModalProps, "isSuccess">) => {
    const { abort } = useMeshUpgrade();

    const title = <Trans>Abort current mesh wide upgrade?</Trans>;
    const content = (
        <Trans>
            This will the abort current upgrade process on all nodes. Are you
            sure you want to proceed?
        </Trans>
    );
    const btnTxt = <Trans>Abort</Trans>;
    return (
        <Modal
            title={title}
            deleteBtnText={btnTxt}
            onDelete={() => {
                abort();
                props.onClose();
            }}
            {...props}
        >
            {content}
        </Modal>
    );
};
