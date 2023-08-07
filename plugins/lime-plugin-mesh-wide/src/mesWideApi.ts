import {
    links,
    linksReferenceState,
    nodes,
    nodesReferenceState,
} from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

export const getMeshWideLinksReference = () => {
    return linksReferenceState;
};

export const getMeshWideLinks = () => {
    return links();
};

export const getMeshWideNodesReference = () => {
    return nodesReferenceState;
};

export const getMeshWideNodes = () => {
    return nodes();
};
