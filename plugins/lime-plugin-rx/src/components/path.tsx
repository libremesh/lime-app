import React from "react";

type Item = {
    ip: string;
    hostname: string;
};

type Props = {
    data: Item[];
};

function LineChart({ data }: Props) {
    const circleRadius = 10;
    const innerCircleRadius = circleRadius - 6;
    const circleSpacing = 50;
    const totalHeight = (data.length + 1) * circleSpacing;

    return (
        <svg height={totalHeight} width="100%">

            <line
                x1={circleSpacing}
                y1={circleSpacing + circleRadius}
                x2={circleSpacing}
                y2={totalHeight - circleSpacing - circleRadius}
                className="stroke-primary-dark"
                strokeWidth="3"
            />
            {data.map((item: Item, index: number) => (
                <g key={index}>
                    <circle
                        cx={circleSpacing}
                        cy={index * circleSpacing + circleSpacing}
                        r={circleRadius}
                        className="fill-primary-dark"
                    />
                    <circle
                        cx={circleSpacing}
                        cy={index * circleSpacing + circleSpacing}
                        r={innerCircleRadius}
                        fill="#FFFFFF"
                    />
                    <text
                        x={circleSpacing * 2}
                        y={index * circleSpacing + circleSpacing + 6}
                    >
                        {item.hostname || item.ip}
                    </text>
                </g>
            ))}
        </svg>
    );
}

export default LineChart;
