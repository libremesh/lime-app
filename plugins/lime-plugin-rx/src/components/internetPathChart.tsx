import { Trans } from "@lingui/macro";
import React from "react";

import LoadingDots from "components/loading/loading-dots";

import { useLoss } from "plugins/lime-plugin-metrics/src/metricsQueries";

type Node = {
    ip: string;
    hostname: string;
};

type Props = {
    nodes: Node[];
    internet: boolean;
};

const InternetIcon = ({
    size,
    x,
    y,
    className,
}: {
    size: number;
    x: number;
    y: number;
    className: string;
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={size}
            height={size}
            x={x}
            y={y}
            className={className}
        >
            <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
        </svg>
    );
};

const circleRadius = 10; // Size of the circle
const circleSpacing = 40; // Distance between circles

const calcLinePositionByIndex = (index) => {
    const y1 = index * circleSpacing + circleRadius + circleRadius;
    const y2 = y1 + (circleSpacing - circleRadius - circleRadius);
    return { y1, y2 };
};

interface CircleProps {
    key?: number;
    ip: string;
    index: number;
    text: string;
    internet?: boolean;
    isLoading?: boolean;
    className?: string;
}

const Circle = ({
    index,
    className,
    text,
    internet = false,
    isLoading = false,
}: CircleProps) => {
    const innerCircleRadius = circleRadius - 6;
    const textSpacingY = (index: number) =>
        index * circleSpacing + circleRadius + 5;
    const textSpacingX = circleSpacing * 1.5;
    const cy = index * circleSpacing + circleRadius;

    return (
        <g key={index}>
            {internet ? (
                <InternetIcon
                    size={circleRadius * 2}
                    x={circleSpacing - 10}
                    y={cy - 10}
                    className={className}
                />
            ) : (
                <>
                    <circle
                        cx={circleSpacing}
                        cy={cy}
                        r={circleRadius}
                        className={className}
                    />
                    <circle
                        cx={circleSpacing}
                        cy={cy}
                        r={innerCircleRadius}
                        fill="#FFFFFF"
                    />
                </>
            )}
            <text
                x={textSpacingX}
                y={textSpacingY(index)}
                className={className}
            >
                {text} {isLoading && <LoadingDots />}
            </text>
        </g>
    );
};

const NodeHop = ({ ip, index, text }: CircleProps) => {
    const { data: loss, isFetching } = useLoss(ip, {
        refetchOnWindowFocus: false,
        enabled: false,
        initialData: 0,
    });

    // For some reason the stirng interpolation did not work well here.
    // So is need to declare each variable
    const goodPathStroke = "stroke-primary-dark";
    const goodPathColor = "fill-primary-dark";
    const badPathStroke = "stroke-danger";
    const badPathColor = "fill-danger";

    const circleColor = loss === 100 ? badPathColor : goodPathColor;
    const lineColor = loss === 100 ? badPathStroke : goodPathStroke;

    const { y1, y2 } = calcLinePositionByIndex(index - 1);
    return (
        <>
            {y1 >= 0 && (
                <line
                    x1={circleSpacing}
                    y1={y1}
                    x2={circleSpacing}
                    y2={y2}
                    className={lineColor}
                    strokeWidth="3"
                />
            )}
            <Circle
                key={index}
                ip={ip}
                index={index}
                className={circleColor}
                text={text}
                isLoading={isFetching}
            />
        </>
    );
};

const InternetLastHop = ({
    ip,
    index,
    internet,
}: {
    ip: string;
    index: number;
    internet: boolean;
}) => {
    const { isFetching } = useLoss(ip, {
        refetchOnWindowFocus: false,
        enabled: false,
    });

    const goodPathColor = "stroke-internet";
    const goodIconColor = "fill-internet";
    const badPathColor = "stroke-danger";
    const badIconColor = "fill-danger";
    const disabledPathColor = "stroke-gray-400";
    const disabledIconColor = "fill-gray-400";

    const internetIcon = internet
        ? goodIconColor
        : !internet && isFetching
        ? badIconColor
        : disabledIconColor;
    const internetPath = internet
        ? goodPathColor
        : !internet && isFetching
        ? badPathColor
        : disabledPathColor;

    const { y1, y2 } = calcLinePositionByIndex(index - 1);

    return (
        <>
            <line
                x1={circleSpacing}
                y1={y1}
                x2={circleSpacing}
                y2={y2}
                className={internetPath}
                strokeWidth="3"
            />
            <Circle
                ip={ip}
                index={index}
                className={internetIcon}
                text={<Trans>Internet</Trans>}
                internet={true}
            />
        </>
    );
};

function LineChart({ nodes, internet }: Props) {
    if (nodes === undefined) return;

    const totalHeight = (nodes.length + 1) * circleSpacing - circleRadius * 2;

    return (
        <svg height={totalHeight}>
            {nodes.map((node: Node, index: number) => (
                <NodeHop
                    key={index}
                    ip={node.ip}
                    index={index}
                    text={node.hostname || node.ip}
                />
            ))}
            <InternetLastHop
                index={nodes.length}
                ip={nodes[nodes.length - 1].ip}
                internet={internet}
            />
        </svg>
    );
}

export default LineChart;
