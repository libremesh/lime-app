import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";
import { useCallback } from "preact/compat";

import { ModalActions, useModal } from "components/Modal/Modal";

const useActionModal = (
    title: ComponentChildren,
    btnText: ComponentChildren,
    actionName: ModalActions
) => {
    const { toggleModal, setModalState } = useModal();

    const actionModal = useCallback(
        (prop: string, actionCb: () => void) => {
            setModalState({
                content: (
                    <div>
                        <Trans>
                            Are you sure you want to {title} the{" "}
                            <strong>{prop}</strong> property?
                        </Trans>
                    </div>
                ),
                title,
                [`${actionName}Cb`]: actionCb,
                [`${actionName}BtnText`]: btnText,
            });
            toggleModal();
        },
        [setModalState, toggleModal]
    );
    return { actionModal, toggleModal };
};

export const useDeletePropModal = () =>
    useActionModal(
        <Trans>Delete property</Trans>,
        <Trans>Delete</Trans>,
        "delete"
    );

export const useEditPropModal = () =>
    useActionModal(
        <Trans>Edit property</Trans>,
        <Trans>Edit</Trans>,
        "success"
    );

// import { Trans } from "@lingui/macro";
// import { useCallback } from "preact/compat";
//
// import { useModal } from "containers/Modal/Modal";
//
// export const useDeletePropModal = () => {
//     const { toggleModal, setModalState } = useModal();
//
//     const deletePropModal = useCallback(
//         (prop: string, deleteCb: () => void) => {
//             setModalState({
//                 content: (
//                     <div>
//                         <Trans>
//                             Are you sure you want to delete the{" "}
//                             <strong>{prop}</strong> property?
//                         </Trans>
//                     </div>
//                 ),
//                 title: <Trans>Delete property</Trans>,
//                 onDelete: deleteCb,
//                 deleteBtnText: <Trans>Delete</Trans>,
//             });
//             toggleModal();
//         },
//         [setModalState, toggleModal]
//     );
//     return { deletePropModal, toggleModal };
// };
//
// export const useEditPropModal = () => {
//     const { toggleModal, setModalState } = useModal();
//
//     const editProperty = (prop: string, editCb: () => void) => {
//         setModalState({
//             content: (
//                 <div>
//                     <Trans>
//                         Do you want to edit the <strong>{prop}</strong>{" "}
//                         property?
//                     </Trans>
//                 </div>
//             ),
//             title: <Trans>Edit property</Trans>,
//             onSuccess: editCb,
//             successBtnText: <Trans>Edit</Trans>,
//             // onSuccess: toggleModal,
//         });
//         toggleModal();
//     };
//     return { editProperty, toggleModal };
// };
