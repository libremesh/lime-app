import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/preact";

import { MeshWideMap } from "plugins/lime-plugin-mesh-wide/src/containers/Map";
import {
    getMeshWideNodes,
    getMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideApi";
import { nodesReferenceState } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

import { render } from "utils/test_utils";

jest.mock("plugins/lime-plugin-mesh-wide/src/mesWideApi.ts");
jest.mock("leaflet");
const mockedMeshWideNodes = jest.mocked(getMeshWideNodes);
const mockedMeshWideNodesReference = jest.mocked(getMeshWideNodesReference);

describe("Map component", () => {
    it("should show nodes alert when a node has not configured properly the coordinates", async () => {
        nodesReferenceState["primero"].data.coordinates = {
            lon: "FIXME",
            lat: "FIXME",
        };
        mockedMeshWideNodesReference.mockReturnValue(nodesReferenceState);
        mockedMeshWideNodesReference.mockReturnValue(nodesReferenceState);

        render(
            <MeshWideMap nodes={true} batmanLinks={false} wifiLinks={false} />
        );
        expect(
            await screen.findByTestId("has-invalid-nodes")
        ).toBeInTheDocument();
    });
});
