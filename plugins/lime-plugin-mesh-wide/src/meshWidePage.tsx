import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import React from "react";

import FloatingButton from "components/buttons/floatting-button";
import Loading from "components/loading";

import { useLoadLeaflet } from "plugins/lime-plugin-locate/src/locateQueries";
import { FloatingAlert } from "plugins/lime-plugin-mesh-wide/src/components/Map/FloatingAlert";
import { MeshWideMap } from "plugins/lime-plugin-mesh-wide/src/containers/Map";
import { SelectedFeatureBottomSheet } from "plugins/lime-plugin-mesh-wide/src/containers/SelectedFeatureBottomSheet";

const MeshWidePage = () => {
    const {
        isError: isAssetError,
        isFetchedAfterMount: assetsLoaded,
        isLoading: isLoadingAssets,
    } = useLoadLeaflet({
        refetchOnWindowFocus: false,
    });

    const loading = isLoadingAssets;

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (isAssetError) {
        return (
            <div>
                <Trans>Error loading leaflet </Trans>
            </div>
        );
    }

    return (
        <>
            <FloatingAlert />
            <MeshWideMap />
            <SelectedFeatureBottomSheet />
            <FloatingButton onClick={() => route("/meshwide/config")} />
        </>
    );
};

export default MeshWidePage;
