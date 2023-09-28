import {
    batManReferenceState,
    links,
    linksReferenceState,
    nodes,
    nodesReferenceState,
} from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

export const getMeshWideBatmanReference = () => {
    return batManReferenceState;
};

export const getMeshWideBatman = () => {
    return links("batman");
};

export const getMeshWideLinksReference = () => {
    return linksReferenceState;
};

export const getMeshWideLinks = () => {
    return links("wifi");
};

export const getMeshWideNodesReference = () => {
    return nodesReferenceState;
};

export const getMeshWideNodes = () => {
    return nodes();
};
