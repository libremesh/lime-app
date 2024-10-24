import { useEffect, useState } from "preact/hooks";

export const syncHeight = () => {
    document.documentElement.style.setProperty(
        "--window-inner-height",
        `${window.innerHeight}px`
    );
};

export type TBottomSheetEvents = {
    collapsed: string;
    dismissed: string;
    expanded: string;
    snapToTop: string;
};

export type TBottomSheetEventsKey = keyof TBottomSheetEvents;

export const bottomSheetEvents: TBottomSheetEvents = {
    collapsed: "in collapse state",
    dismissed: "was dismissed",
    expanded: "is expanded",
    snapToTop: "snapped to top",
};

// from react-reduce-motion
// Note: library had type issues, didn't have time to fix those
export const useReduceMotion = () => {
    const [matches, setMatch] = useState(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleChange = () => {
            setMatch(mq.matches);
        };
        handleChange();
        mq.addEventListener("change", handleChange);
        return () => {
            mq.removeEventListener("change", handleChange);
        };
    }, []);
    return matches;
};
