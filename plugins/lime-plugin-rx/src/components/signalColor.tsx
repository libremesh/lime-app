import { useEffect } from "preact/hooks";
import colorScale from "simple-color-scale";

import { useCommunitySettings } from "utils/queries";

export const SignalColor = ({
    signal,
    className,
}: {
    signal: number;
    className: string;
}) => {
    const { data: communitySettings } = useCommunitySettings();

    useEffect(() => {
        colorScale.setConfig({
            outputStart: 1,
            outputEnd: Number(communitySettings?.bad_signal) * -1,
            inputStart: Number(communitySettings?.good_signal) * -1,
            inputEnd: Number(communitySettings?.bad_signal) * -1 + 10,
        });
    }, [communitySettings]);

    return (
        <span
            className={className}
            style={{
                color: signal ? colorScale.getColor(signal * -1) : "gray",
            }}
        >
            {signal}
        </span>
    );
};
