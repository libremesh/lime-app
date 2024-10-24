import { useCallback, useState } from "preact/hooks";

export interface UseDisclosureProps {
    open?: boolean;
    defaultOpen?: boolean;
    id?: string;

    onClose?(): void;

    onOpen?(): void;
}

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 * It can be used to control feedback component such as `Modal`, `AlertDialog`, `Drawer`, etc.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-disclosure
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
    const { onClose: onCloseProp, onOpen: onOpenProp, open: openProp } = props;

    const handleOpen = useCallback(onOpenProp, []);
    const handleClose = useCallback(onCloseProp, []);

    const [openState, setopen] = useState(props.defaultOpen || false);

    const open = openProp !== undefined ? openProp : openState;

    const isControlled = openProp !== undefined;

    const onClose = useCallback(() => {
        if (!isControlled) {
            setopen(false);
        }
        handleClose?.();
    }, [isControlled, handleClose]);

    const onOpen = useCallback(() => {
        if (!isControlled) {
            setopen(true);
        }
        handleOpen?.();
    }, [isControlled, handleOpen]);

    const onToggle = useCallback(() => {
        if (open) {
            onClose();
        } else {
            onOpen();
        }
    }, [open, onOpen, onClose]);

    return {
        open,
        onOpen,
        onClose,
        onToggle,
    };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
