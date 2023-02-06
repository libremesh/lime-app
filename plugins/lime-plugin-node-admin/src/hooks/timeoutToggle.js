import { useEffect, useState } from "preact/hooks";

export function useTimeoutToggle(onWhen, offAfterMs) {
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        let id = null;
        if (onWhen) {
            setActivated(true);
            id = setTimeout(() => {
                setActivated(false);
            }, offAfterMs);
        }
        return () => {
            id && clearTimeout(id);
        };
    }, [onWhen, offAfterMs]);
    return activated;
}
