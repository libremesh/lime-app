import { useEffect, useState } from "preact/hooks";

import { BottomSheet } from "components/bottom-sheet";

import {
    FeatureDetail,
    FeatureReferenceStatus,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";

export const SelectedFeatureBottomSheet = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: selectedMapFeature } = useSelectedMapFeature();

    useEffect(() => {
        if (selectedMapFeature == null) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [selectedMapFeature]);

    return (
        <div>
            <BottomSheet
                closeButton={false}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                initialDrawerDistanceTop={600}
                footer={
                    <FeatureReferenceStatus
                        selectedFeature={selectedMapFeature}
                    />
                }
            >
                <div className={"px-10"}>
                    <FeatureDetail selectedFeature={selectedMapFeature} />
                </div>
            </BottomSheet>
        </div>
    );
};
