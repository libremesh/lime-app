import { useEffect, useState } from "preact/hooks";
import React from "react";

import { BottomSheet } from "components/bottom-sheet";

import {
    BottomSheetFooter,
    FeatureDetail,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

export const MapBottomSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const synced: boolean = Math.random() < 0.5;

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
                    <BottomSheetFooter
                        synced={synced}
                        selectedFeature={selectedMapFeature}
                    />
                }
            >
                <div className={"px-10"}>
                    <FeatureDetail
                        synced={synced}
                        selectedFeature={selectedMapFeature}
                    />
                </div>
            </BottomSheet>
        </>
    );
};
