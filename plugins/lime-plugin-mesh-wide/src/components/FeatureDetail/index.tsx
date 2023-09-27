import { VNode } from "preact";

import { InvalidNodesDetail } from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/InvalidNodesDetail";
import LinkFeatureDetail, {
    LinkReferenceStatus,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/LinkDetail";
import NodeDetails, {
    NodeReferenceStatus,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/NodeDetail";
import {
    LinkMapFeature,
    NodeMapFeature,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const TitleAndText = ({
    title,
    children,
    error,
}: {
    title: VNode | string;
    children: VNode | string;
    error?: VNode | string;
}) => {
    return (
        <div className={"flex flex-column"}>
            <div className={"text-lg"}>{title}</div>
            <div className={"text-3xl"}>{children}</div>
            {error && <div className={"text-lg text-danger"}>{error}</div>}
        </div>
    );
};

export const Row = ({ children }: { children: any }) => {
    return (
        <div className={"flex flex-row justify-between align-middle mb-4"}>
            {children}
        </div>
    );
};

export const FeatureDetail = ({
    selectedFeature,
}: {
    selectedFeature: SelectedMapFeature;
}) => {
    if (!selectedFeature) return;
    switch (selectedFeature.type) {
        case "link":
            return <LinkFeatureDetail {...selectedFeature.feature} />;
        case "node":
            return <NodeDetails {...selectedFeature.feature} />;
        case "invalidNodes":
            return <InvalidNodesDetail nodes={selectedFeature.feature} />;
        default:
            return <></>;
    }
};

export const FeatureReferenceStatus = ({
    selectedFeature,
}: {
    selectedFeature: SelectedMapFeature;
}) => {
    if (!selectedFeature) return;
    const type = selectedFeature.type;

    if (type === "link") {
        return (
            <LinkReferenceStatus
                {...(selectedFeature.feature as LinkMapFeature)}
            />
        );
    } else if (type === "node") {
        return (
            <NodeReferenceStatus
                {...(selectedFeature.feature as NodeMapFeature)}
            />
        );
    }
};

export default FeatureDetail;
