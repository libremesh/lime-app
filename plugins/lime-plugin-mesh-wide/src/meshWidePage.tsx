import { route } from "preact-router";
import React from "react";

import FloatingButton from "components/buttons/floatting-button";
import Loading from "components/loading";

import { useLoadLeaflet } from "plugins/lime-plugin-locate/src/locateQueries";
import { MeshWideMap } from "plugins/lime-plugin-mesh-wide/src/components/Map";
import { MapBottomSheet } from "plugins/lime-plugin-mesh-wide/src/components/MapBottomSheet";

const MeshWidePage = () => {
    const {
        isError: isAssetError,
        isFetchedAfterMount: assetsLoaded,
        isLoading: isLoadingAssets,
    } = useLoadLeaflet({
        refetchOnWindowFocus: false,
    });

    const loading = isLoadingAssets;

    return (
        <>
            {loading && (
                <div>
                    <Loading />
                </div>
            )}
            {!loading && (
                <>
                    <MeshWideMap />
                    <MapBottomSheet />
                    <FloatingButton onClick={() => route("/meshwide/config")} />
                </>
            )}
        </>
    );
};

export default MeshWidePage;
