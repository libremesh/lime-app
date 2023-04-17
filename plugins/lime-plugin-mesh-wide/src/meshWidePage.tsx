import { Trans } from "@lingui/macro";
import L, { LeafletMouseEvent, Map } from "leaflet";
import { useState } from "preact/hooks";
import React, { Component } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";

import { BottomSheet } from "components/bottom-sheet";
import FloatingButton from "components/buttons/floatting-button";
import Loading from "components/loading";

import { useLoadLeaflet } from "plugins/lime-plugin-locate/src/locateQueries";
import style from "plugins/lime-plugin-locate/src/style.less";
import { NodeDetail } from "plugins/lime-plugin-mesh-wide/src/components/NodeDetail";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

const BottomSheetFooter = ({ synced }: { synced?: boolean }) => {
    return (
        <div className={"text-center bg-white py-5"}>
            <span className={"text-success"}>✓</span>
            <Trans>Same status as in the reference state</Trans>
        </div>
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
                        initialDrawerDistanceTop={650}
                        footer={<BottomSheetFooter />}
                    >
                        <div className={"px-10"}>
                            <NodeDetail />
                        </div>
                    </BottomSheet>
                    <FloatingButton
                        onClick={() => {
                            console.log("AAAA");
                            setIsOpen(!isOpen);
                        }}
                    />
                </>
            )}
        </>
    );
};

export default MeshWidePage;
