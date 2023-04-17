import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import style from "./style.less";
import {
    TBottomSheetEventsKey,
    bottomSheetEvents,
    syncHeight,
    useReduceMotion,
} from "./utils";

//  TODO - account for resizing the window
const DRAWER_HEIGHT = window.innerHeight;
const INITIAL_DRAWER_DISTANCE_FROM_TOP = 400;
const MAX_WIDTH = 560;
const DRAWER_SNAP_MARGIN = 100;
const COLLAPSED_HEIGHT = 75;
const THUMB_HEIGHT = 35;

// resize listener
window.addEventListener("resize", syncHeight);
syncHeight();

type TBottomSheetProps = {
    /**
     * nested children
     */
    children: JSX.Element;
    /**
     * optional specific aria label for close button
     */
    closeButtonAriaLabel?: string;
    /**
     * Custom initial expanded height
     */
    initialDrawerDistanceTop?: number;
    /**
     * Is the BottomSheet visible on the scren?
     */
    isOpen: boolean;
    /**
     * Optional custom maxWidth for the BottomSheet in px
     */
    maxWidth?: string;
    /**
     * Fires when close button is fired
     */
    onClose: () => void;
    /**
     * Fires when the status changes
     */
    onStatusChange?: (status: string) => void;
    /**
     * Optional Subtitle for the BottomSheet
     */
    subtitle?: string;
    /**
     * Optional Title for the BottomSheet
     */
    title?: string;
    /**
     * Element to be shown either if the sheet is expanded at all or not
     */
    footer?: JSX.Element;
};

export const BottomSheet: React.FC<TBottomSheetProps> = ({
    children,
    closeButtonAriaLabel = "Close",
    initialDrawerDistanceTop = INITIAL_DRAWER_DISTANCE_FROM_TOP,
    isOpen,
    maxWidth = MAX_WIDTH,
    onClose,
    onStatusChange,
    subtitle,
    title,
    footer,
}) => {
    // STATE
    const scrollRef = useRef<HTMLDivElement>(null);
    const [bottom, setBottom] = React.useState(-DRAWER_HEIGHT);
    const [draggingPosition, setDraggingPosition] = React.useState<
        number | null
    >(null);
    const [debugLog, setDebugLog] = React.useState<string>("");

    // ANIMATION
    const prefersReducedMotion = useReduceMotion();
    const styles = useSpring({
        bottom,
        immediate: prefersReducedMotion,
        config: { friction: 20 },
    });

    // HANDLERS
    const handlePointerDown = (
        e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        // @ts-ignore
        const event = (e?.touches != null ? e.touches[0] : e) as MouseEvent;
        // handle safari body scroll bug
        document.documentElement.classList.add("is-locked");
        const newDraggingPosition =
            (e.currentTarget.parentElement?.getBoundingClientRect().bottom ??
                0) - event.clientY;
        setDraggingPosition(newDraggingPosition);
    };

    const handlePointerMove = React.useCallback(
        (e: TouchEvent | MouseEvent) => {
            // @ts-ignore
            const event = e?.touches != null ? e?.touches[0] : e;
            if (draggingPosition != null) {
                const newBottom =
                    window.innerHeight - event.clientY - draggingPosition;
                if (newBottom !== bottom) {
                    setBottom(newBottom);
                }
            }
        },
        [bottom, draggingPosition]
    );

    const handleScrollRepositioning = () => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    };

    const handleStatusChange = React.useCallback(
        (status: TBottomSheetEventsKey) => {
            const newStatus = bottomSheetEvents[status];
            const newDebugLog =
                debugLog !== "" ? `${debugLog}, ${newStatus}` : newStatus;
            setDebugLog(newDebugLog);
            onStatusChange && onStatusChange(newStatus);
        },
        [debugLog, onStatusChange]
    );

    // LISTENERS

    // toggling the bottom sheet
    useEffect(() => {
        if (isOpen) {
            handleStatusChange("expanded");
            handleScrollRepositioning();
            setBottom(-initialDrawerDistanceTop);
        } else {
            handleStatusChange("dismissed");
            setBottom(-DRAWER_HEIGHT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // dragging
    useEffect(() => {
        const handlePointerUp = () => {
            document.documentElement.classList.remove("is-locked");

            if (draggingPosition == null) {
                return;
            }

            // snap logic
            if (bottom > -DRAWER_SNAP_MARGIN) {
                handleStatusChange("snapToTop");
                setBottom(0);
            } else if (bottom < -DRAWER_HEIGHT + COLLAPSED_HEIGHT) {
                handleStatusChange("dismissed");
                onClose();
                setBottom(-DRAWER_HEIGHT);
            } else if (
                bottom <
                COLLAPSED_HEIGHT - DRAWER_HEIGHT + DRAWER_SNAP_MARGIN
            ) {
                handleStatusChange("collapsed");
                setBottom(-DRAWER_HEIGHT + COLLAPSED_HEIGHT);
            }
            setDraggingPosition(null);
        };

        document.addEventListener("touchend", handlePointerUp);
        document.addEventListener("touchmove", handlePointerMove);
        document.addEventListener("mouseup", handlePointerUp);
        document.addEventListener("mousemove", handlePointerMove);
        return () => {
            document.removeEventListener("touchend", handlePointerUp);
            document.removeEventListener("touchmove", handlePointerMove);
            document.removeEventListener("mouseup", handlePointerUp);
            document.removeEventListener("mousemove", handlePointerMove);
        };
    }, [
        bottom,
        debugLog,
        draggingPosition,
        handlePointerMove,
        handleStatusChange,
        onClose,
    ]);

    const bodyHeight =
        DRAWER_HEIGHT +
        bottom -
        (title || subtitle ? COLLAPSED_HEIGHT : THUMB_HEIGHT);

    return (
        <>
            <animated.div
                style={{
                    maxWidth: `${maxWidth}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    position: "fixed",
                    width: "100%",
                    height: DRAWER_HEIGHT,
                    transition: "height 200ms",
                    ...styles,
                }}
            >
                <div
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="BottomSheet-title"
                    className={style.BottomSheetStyled}
                >
                    <div
                        onMouseDown={handlePointerDown}
                        onTouchStart={handlePointerDown}
                    >
                        <div
                            onDragStart={(e: any) => {
                                e.preventDefault();
                                // get rid of the ghost drag image in the view
                                e.dataTransfer.setDragImage(new Image(), 0, 0);
                            }}
                            draggable={true}
                            className={style.ThumbBarWrapper}
                            style={
                                draggingPosition != null
                                    ? {
                                          cursor: "grabbing",
                                      }
                                    : {
                                          cursor: "grab",
                                      }
                            }
                        >
                            <div className={style.ThumbBar} />
                        </div>
                        <div className={style.Header}>
                            <div className={style.HeaderTitle}>
                                {title && (
                                    <h1 id="BottomSheet-title">{title}</h1>
                                )}
                                {subtitle && <h2>{subtitle}</h2>}
                            </div>
                            <button
                                className={style.CloseButton}
                                role="button"
                                onClick={() => {
                                    onClose();
                                    handleStatusChange("dismissed");
                                }}
                                aria-label={closeButtonAriaLabel}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div
                        className={style.SheetBody}
                        ref={scrollRef}
                        tabIndex={0}
                        style={{ height: bodyHeight }}
                    >
                        {children}
                    </div>
                </div>
            </animated.div>
            {bodyHeight > 0 && (
                <div
                    className={style.FooterWrapper}
                    style={{ maxWidth: `${maxWidth}px` }}
                >
                    {footer}
                </div>
            )}
        </>
    );
};
