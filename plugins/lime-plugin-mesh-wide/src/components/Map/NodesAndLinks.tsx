import L from "leaflet";
import { Marker, Polyline, Tooltip } from "react-leaflet";

import style from "plugins/lime-plugin-mesh-wide/src/components/Map/style.less";
import {
    useMeshWideLinks,
    useMeshWideLinksReference,
    useMeshWideNodesReference,
    useSelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import {
    INodeInfo,
    LocatedWifiLinkData,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";
import {
    PontToPointLink,
    mergeLinksAndCoordinates,
} from "plugins/lime-plugin-mesh-wide/src/utils/getLinksCoordinates";

const NodeMarker = ({ name, info }: { name: string; info: INodeInfo }) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();
    const synced: boolean = Math.random() < 0.5;

    const markerClasses = `${
        selectedMapFeature?.id === name && style.selectedMarker
    } ${synced ? style.syncedMarker : style.notSyncedMarker}`;

    return (
        <Marker
            position={[info.coordinates.lat, info.coordinates.lon]}
            icon={L.divIcon({
                className: style.leafletDivCustomIcon,
                iconAnchor: [0, 24],
                popupAnchor: [0, -36],
                html: `<span class="${style.defaultMarker} ${markerClasses}" />`,
            })}
            eventHandlers={{
                click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    setSelectedMapFeature({
                        id: name,
                        feature: { ...info, name },
                        type: "node",
                    });
                },
            }}
        >
            <Tooltip>{name}</Tooltip>
        </Marker>
    );
};

const LinkLine = ({
    referenceLink,
    actualLink,
}: {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}) => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();
    const isSelected = selectedMapFeature?.id === referenceLink.id;

    const synced: boolean = Math.random() < 0.5;

    const getPathOpts = (isSelected) => {
        return {
            color: synced ? "#76bd7d" : "#eb7575",
            weight: isSelected ? 7 : 5,
            opacity: isSelected ? 1 : 0.8,
            dashArray: actualLink ? null : "7 10",
        };
    };

    const coordinates = referenceLink.coordinates.map((c) => [c.lat, c.lon]);

    return (
        <Polyline
            positions={coordinates}
            pathOptions={getPathOpts(isSelected)}
            eventHandlers={{
                click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    setSelectedMapFeature({
                        id: referenceLink.id,
                        feature: referenceLink,
                        type: "link",
                    });
                },
                mouseover: (e) => {
                    const l = e.target;
                    l.setStyle(getPathOpts(true));
                },
                mouseout: (event) => {
                    const l = event.target;
                    l.setStyle(getPathOpts(isSelected));
                },
            }}
        />
    );
};

export const NodesAndLinks = () => {
    const { data: meshWideLinksReference } = useMeshWideLinksReference({});
    const { data: meshWideLinks } = useMeshWideLinks({});
    const { data: meshWideNodesReference } = useMeshWideNodesReference({});

    let locatedLinksReference: LocatedWifiLinkData;
    if (meshWideNodesReference && meshWideLinksReference) {
        locatedLinksReference = mergeLinksAndCoordinates(
            meshWideNodesReference,
            meshWideLinksReference
        );
    }

    let locatedLinks: LocatedWifiLinkData;
    if (meshWideNodesReference && meshWideLinks) {
        locatedLinks = mergeLinksAndCoordinates(
            meshWideNodesReference,
            meshWideLinks
        );
    }

    return (
        <>
            {meshWideNodesReference &&
                Object.entries(meshWideNodesReference).map(([k, v], i) => {
                    return <NodeMarker key={i} info={v} name={k} />;
                })}
            {locatedLinksReference &&
                Object.entries(locatedLinksReference).map(
                    (referenceLink, i) => {
                        let actualLink: PontToPointLink;
                        if (locatedLinks) {
                            actualLink = Object.values(locatedLinks).find(
                                (value) => value.id === referenceLink[0]
                            );
                        }
                        return (
                            <LinkLine
                                key={i}
                                referenceLink={referenceLink[1]}
                                actualLink={actualLink}
                            />
                        );
                    }
                )}
        </>
    );
};
