import { useEffect, useState } from "preact/hooks";
import React from "react";

import { BottomSheet } from "components/bottom-sheet";

import {
    FeatureDetail,
    FeatureReferenceStatus,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

export const SelectedFeatureBottomSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasError: boolean = Math.random() < 0.5;

    const { data: selectedMapFeature } = useSelectedMapFeature();

    useEffect(() => {
        selectedMapFeature == null ? setIsOpen(false) : setIsOpen(true);
    }, [selectedMapFeature]);

    return (
        <>
            <BottomSheet
                closeButton={false}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                initialDrawerDistanceTop={600}
                footer={
                    <FeatureReferenceStatus
                        hasError={hasError}
                        selectedFeature={selectedMapFeature}
                    />
                }
            >
                <div className={"px-10"}>
                    <FeatureDetail
                        hasError={hasError}
                        selectedFeature={selectedMapFeature}
                    />
                </div>
            </BottomSheet>
        </>
    );
};
