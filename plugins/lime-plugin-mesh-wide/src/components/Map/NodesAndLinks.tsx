import {
    useMeshWideNodes,
    useSelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

export const NodesAndLinks = () => {
    const { data: selectedMapFeature, setData: setSelectedMapFeature } =
        useSelectedMapFeature();

    // const { data: meshWideLinks } = useMeshWideLinks({});
    const { data: meshWideNodes } = useMeshWideNodes({});

    return <></>;
};
