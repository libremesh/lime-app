import { useEffect, useState } from "preact/hooks";

const LoadingDots = ({
    dotsLength = 3,
    delay = 500,
}: {
    delay?: number;
    dotsLength?: number;
}) => {
    const [dots, setDots] = useState<string>(".");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length === dotsLength) {
                    return ".";
                }
                return `${prevDots}.`;
            });
        }, delay);

        return () => clearInterval(intervalId);
    }, [delay, dotsLength]);

    return <>{dots}</>;
};

export default LoadingDots;
