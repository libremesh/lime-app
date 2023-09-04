import Links, {
    LinkReferenceStatus,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/LinkDetail";
import NodeDetails from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail/NodeDetail";
import { NodeReferenceStatus } from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import {
    INamedNodeInfo,
    LinkMapFeature,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const TitleAndText = ({
    title,
    children,
}: {
    title: any; // todo(kon): error with trans component
    children: string;
}) => {
    return (
        <div className={"flex flex-column"}>
            <div className={"text-lg"}>{title}</div>
            <div className={"text-3xl"}>{children}</div>
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
    hasError,
}: {
    selectedFeature: SelectedMapFeature;
    hasError: boolean;
}) => {
    if (!selectedFeature) return;
    switch (selectedFeature.type) {
        case "link":
            return (
                <Links
                    actual={(selectedFeature.feature as LinkMapFeature).actual}
                    reference={
                        (selectedFeature.feature as LinkMapFeature).reference
                    }
                />
            );
        case "node":
            return (
                <NodeDetails
                    nodeDetail={selectedFeature.feature as INamedNodeInfo}
                    selectedFeature={selectedFeature}
                    hasError={hasError}
                />
            );
        default:
            return <></>;
    }
};

export const FeatureReferenceStatus = ({
    hasError,
    selectedFeature,
}: {
    hasError?: boolean;
    selectedFeature: SelectedMapFeature;
}) => {
    if (!selectedFeature) return;
    const type = selectedFeature.type;

    if (type === "link") {
        return (
            <LinkReferenceStatus
                hasError={hasError}
                selectedFeature={
                    (selectedFeature.feature as LinkMapFeature).reference
                }
            />
        );
    } else if (type === "node") {
        return (
            <NodeReferenceStatus
                hasError={hasError}
                selectedFeature={selectedFeature.feature as INamedNodeInfo}
            />
        );
    }
};

export default FeatureDetail;
