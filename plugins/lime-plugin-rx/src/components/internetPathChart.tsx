import { Trans } from "@lingui/macro";
import React from "react";

import { GlobeIcon } from "components/icons/globeIcon";
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
    text: any; // type error with Trans component
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
                <GlobeIcon
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
                <>
                    {text} {isLoading && <LoadingDots />}
                </>
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
    const { isFetching, data: loss } = useLoss(ip, {
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
        : !internet && loss === 100
        ? badIconColor
        : disabledIconColor;
    const internetPath = internet
        ? goodPathColor
        : !internet && loss === 100
        ? badPathColor
        : disabledPathColor;

    const { y1, y2 } = calcLinePositionByIndex(index - 1);

    const internetText = <Trans>Internet</Trans>;

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
                text={internetText}
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
