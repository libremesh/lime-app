
import { useEffect } from "preact/hooks";
import colorScale from "simple-color-scale";

import { useCommunitySettings } from "utils/queries";

export const SignalBar = ({ signal, className }) => {
    const { data: communitySettings } = useCommunitySettings();

    useEffect(() => {
        colorScale.setConfig({
            outputStart: 1,
            outputEnd: Number(communitySettings.bad_signal) * -1,
            inputStart: Number(communitySettings.good_signal) * -1,
            inputEnd: Number(communitySettings.bad_signal) * -1 + 10,
        });
    }, [communitySettings]);

    return (
        <span
            class={className}
            style={{
                backgroundColor: signal
                    ? colorScale.getColor(signal * -1)
                    : "gray",
            }}
        />
    );
};
