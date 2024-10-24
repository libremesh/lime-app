import { Trans } from "@lingui/macro";

import { Modal, ModalProps } from "components/Modal/Modal";

import { dataTypeNameMapping } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import { MeshWideMapDataTypeKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const SetNodeInfoReferenceStateModal = ({
    nodeName,
    isDown,
    ...modalProps
}: { nodeName: string; isDown: boolean } & Pick<
    ModalProps,
    "onSuccess" | "isOpen" | "onClose"
>) => {
    let title = <Trans>Set reference state for {nodeName}</Trans>;
    let content = <Trans>Set the reference state for this node.</Trans>;
    if (isDown) {
        title = <Trans>Remove {nodeName} from the reference state</Trans>;
        content = (
            <Trans>
                This node seems down, remove them from the reference state?
            </Trans>
        );
    }
    return (
        <Modal
            title={title}
            successBtnText={<Trans>Continue</Trans>}
            {...modalProps}
        >
            {content}
        </Modal>
    );
};

export const SetLinkReferenceStateModal = ({
    dataType,
    nodes,
    isDown,
    ...modalProps
}: {
    dataType: MeshWideMapDataTypeKeys;
    nodes: string[];
    isDown: boolean;
} & Pick<ModalProps, "onSuccess" | "isOpen" | "onClose">) => {
    let title = (
        <Trans>
            Set reference state for this {dataTypeNameMapping(dataType)}?
        </Trans>
    );
    let content = (
        <Trans>This will set the reference state of this link:</Trans>
    );
    if (isDown) {
        title = (
            <Trans>
                Remove this {dataTypeNameMapping(dataType)} from the reference
                state
            </Trans>
        );
        content = (
            <Trans>
                This link seems down, remove them from the reference state?
            </Trans>
        );
    }
    return (
        <Modal
            title={title}
            successBtnText={<Trans>Continue</Trans>}
            {...modalProps}
        >
            <div>
                {content}
                <br />
                <div className={"flex flex-row font-bold"}>
                    {nodes.join(", ")}
                </div>
            </div>
        </Modal>
    );
};
