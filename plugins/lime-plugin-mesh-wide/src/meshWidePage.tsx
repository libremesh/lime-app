import { Trans } from "@lingui/macro";
import L, { LeafletMouseEvent, Map } from "leaflet";
import { useState } from "preact/hooks";
import React, { Component } from "react";
import { LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";

import { BottomSheet } from "components/bottom-sheet";
import FloatingButton from "components/buttons/floatting-button";
import { Button } from "components/elements/button";
import Loading from "components/loading";

import { useLoadLeaflet } from "plugins/lime-plugin-locate/src/locateQueries";
import style from "plugins/lime-plugin-locate/src/style.less";
import { NodeDetail } from "plugins/lime-plugin-mesh-wide/src/components/NodeDetail";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

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

const MeshWidePage = () => {
    // const {
    //     isError: isAssetError,
    //     isFetchedAfterMount: assetsLoaded,
    //     isLoading: isLoadingAssets,
    // } = useLoadLeaflet({
    //     refetchOnWindowFocus: false,
    // });
    //
    // const loading = isLoadingAssets;

    const [isOpen, setIsOpen] = useState(true);
    const synced = false;
    const loading = false;
    return (
        <>
            {loading && (
                <div>
                    <Loading />
                </div>
            )}
            {!loading && (
                <>
                    {/*<MapContainer*/}
                    {/*    center={[-30, -60]}*/}
                    {/*    zoom={3}*/}
                    {/*    scrollWheelZoom={true}*/}
                    {/*    className={"w-screen h-screen sm:h-auto sm:pt-14 z-0"}*/}
                    {/*>*/}
                    {/*    <TileLayer*/}
                    {/*        attribution={openStreetMapAttribution}*/}
                    {/*        url={openStreetMapTileString}*/}
                    {/*    />*/}
                    {/*</MapContainer>*/}
                    <BottomSheet
                        closeButton={false}
                        isOpen={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                        }}
                        footer={<BottomSheetFooter synced={synced} />}
                    >
                        <div className={"px-10"}>
                            <NodeDetail synced={synced} />
                        </div>
                    </BottomSheet>
                    <FloatingButton
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </>
            )}
        </>
    );
};

export default MeshWidePage;
