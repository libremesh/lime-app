import "@testing-library/jest-dom/extend-expect";

import { mergeLinksAndCoordinates } from "plugins/lime-plugin-mesh-wide/src/lib/links/getLinksCoordinates";
import {
    linksReferenceState,
    nodesReferenceState,
} from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

describe("tests for the algorithm that merge point and links data types", () => {
    beforeEach(() => {});

    it("assert that merged nodes have the correct coordinates", async () => {
        const locatedLinksReference = mergeLinksAndCoordinates(
            nodesReferenceState,
            linksReferenceState
        );
        // Iterate between merged link objects
        Object.entries(locatedLinksReference).map(([k, merged], i) => {
            expect(merged.coordinates.length).toBe(2); // Merged objects haw to be exactly two geo points
            for (const link of merged.links) {
                Object.entries(link).map(([name, linkData], i) => {
                    // const link = linksReferenceState[name];
                    const node = nodesReferenceState[name];
                    expect(link[name].coordinates).toBe(node.coordinates);
                });
            }
        });
    });

    // Implement this tests
    it.skip("no duplicated links", async () => {});
    it.skip("check that a link between two points can have different links with different macs", async () => {});
});
