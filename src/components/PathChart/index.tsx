import { ComponentChildren } from "preact";
import React from "react";

import { GlobeIcon } from "components/icons/globeIcon";
import LoadingDots from "components/loading/loading-dots";

type StepStatus = "SUCCESS" | "ERROR" | "DISABLED";

export type LineChartStep = {
    text: ComponentChildren;
    isLoading?: boolean;
    status: StepStatus;
};

type CircleProps = {
    index: number;
    color?: string;
    className?: string;
    isLast?: boolean;
    nextStep?: CircleProps; // Used to get the correct color of the line
} & LineChartStep;

const getColorByStatus = (step?: CircleProps) => {
    let color = "gray-400";
    let lineColor = `bg-gray-400`;
    if (step?.status === "SUCCESS") {
        if (step.isLast) {
            color = "internet";
            lineColor = `bg-internet`;
        } else {
            color = "primary-dark";
            lineColor = `bg-primary-dark`;
        }
    } else if (step?.status === "ERROR") {
        if (step.isLast) {
            color = "danger";
        } else {
            color = "danger";
            lineColor = `bg-danger`;
        }
    }
    return { color, lineColor };
};

const LineBall = ({ ...step }: CircleProps) => {
    const { color } = getColorByStatus(step);
    const { lineColor } = getColorByStatus(step.nextStep);

    const linePart = "h-14";

    return (
        <div className="flex flex-col items-center">
            <div className={`flex items-center`}>
                {step.isLast ? (
                    <GlobeIcon size={25} className={`fill-${color}`} />
                ) : (
                    <div
                        className={`flex justify-center items-center w-10 h-10 bg-white rounded-full border-8 border-${color}`}
                    />
                )}
            </div>
            <div
                className={`w-2 ${linePart} ${
                    step.isLast ? "bg-transparent" : lineColor
                }`}
            />
        </div>
    );
};

const Step = ({ index, ...step }: CircleProps) => {
    let color = "gray-400";
    if (step.isLast) {
        color = "text-internet";
    } else if (step.status === "SUCCESS") {
        color = "text-primary-dark";
    } else if (step.status === "ERROR") {
        color = "text-danger";
    }

    const loadingIndicator = step.isLoading ? <LoadingDots /> : null;

    return (
        <div className="flex flex-row items-start">
            <LineBall index={index} {...step} />
            <span className={`ml-5 ${color} text-left`}>
                {step.text} {loadingIndicator}
            </span>
        </div>
    );
};

function LineChart({ steps }: { steps: LineChartStep[] }) {
    if (!steps) return null;
    return (
        <div className="flex flex-col items-start ml-4">
            {steps.map((step, index) => {
                const nextStep = steps[index + 1] ?? null;
                return (
                    <Step
                        key={index}
                        index={index}
                        isLast={index + 1 === steps.length}
                        nextStep={
                            nextStep && {
                                ...nextStep,
                                isLast: index + 2 === steps.length,
                                index: index + 1,
                            }
                        }
                        {...step}
                    />
                );
            })}
        </div>
    );
}

export default LineChart;
