import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";
import React from "react";

import { BottomSheet } from "components/bottom-sheet";
import FloatingButton from "components/buttons/floatting-button";
import { Button } from "components/elements/button";

import { NodeDetail } from "plugins/lime-plugin-mesh-wide/src/components/NodeDetail";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const BottomSheetFooter = ({ synced }: { synced?: boolean }) => {
    const containerClasses =
        "flex items-center justify-center text-center bg-white py-5";
    return synced ? (
        <div className={containerClasses}>
            <span className={"text-success text-4xl"}>✓</span>
            <Trans>Same status as in the reference state</Trans>
        </div>
    ) : (
        <>
            <div className={`${containerClasses} flex-col`}>
                <div className={"flex flex-row"}>
                    <span
                        className={
                            "rounded-full border-2 border-danger text-danger w-8 h-8 flex items-center justify-center mx-2"
                        }
                    >
                        !
                    </span>
                    <Trans>In the reference state this node is on</Trans>
                </div>
                <Button>Update this node on reference state</Button>
            </div>
        </>
    );
};

export const MapBottomSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const synced = false;

    const { selectedMapFeature } = useSelectedMapFeature();
    const name =
        selectedMapFeature?.feature?.properties?.name ??
        selectedMapFeature?.id ??
        "";

    useEffect(() => {
        if (selectedMapFeature == null) setIsOpen(false);
    }, [selectedMapFeature]);

    return (
        <>
            <BottomSheet
                closeButton={false}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                footer={<BottomSheetFooter synced={synced} />}
            >
                <div className={"px-10"}>
                    <NodeDetail synced={synced} name={name} />
                </div>
            </BottomSheet>
            <FloatingButton
                onClick={() => {
                    if (selectedMapFeature) setIsOpen(!isOpen);
                }}
            />
        </>
    );
};
