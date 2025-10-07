import { Trans } from "@lingui/macro";
import React from "react";

import Loading from "components/loading";

import { FloatingAlert } from "plugins/lime-plugin-mesh-wide/src/components/Map/FloatingAlert";
import { MeshWideMap } from "plugins/lime-plugin-mesh-wide/src/containers/Map";
import { SelectedFeatureBottomSheet } from "plugins/lime-plugin-mesh-wide/src/containers/SelectedFeatureBottomSheet";
import { LocateNodeProvider } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocateNode";
import {
    BabelLinksProvider,
    BatmanLinksProvider,
    MeshWideLinksProvider,
} from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { NodesProvider } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { useLoadLeaflet } from "plugins/lime-plugin-mesh-wide/src/locateNodeQueries";

const MeshWide = () => {
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
        </>
    );
};

const MeshWidePage = () => {
    return (
        <NodesProvider>
            <LocateNodeProvider>
                <BatmanLinksProvider>
                    <BabelLinksProvider>
                        <MeshWideLinksProvider>
                            <MeshWide />
                        </MeshWideLinksProvider>
                    </BabelLinksProvider>
                </BatmanLinksProvider>
            </LocateNodeProvider>
        </NodesProvider>
    );
};

export default MeshWidePage;
