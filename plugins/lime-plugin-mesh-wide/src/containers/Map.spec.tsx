import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/preact";

import { doSharedStateApiCall } from "components/shared-state/SharedStateApi";

import { MeshWideMap } from "plugins/lime-plugin-mesh-wide/src/containers/Map";
import { nodesReferenceState } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

import { render } from "utils/test_utils";

jest.mock("plugins/lime-plugin-mesh-wide/src/meshWideApi.ts");
jest.mock("leaflet");

const mockedDoSharedStateApiCall = jest.mocked(doSharedStateApiCall);

describe("Map component", () => {
    it("should show nodes alert when a node has not configured properly the coordinates", async () => {
        nodesReferenceState["primero"].coordinates = {
            long: "FIXME",
            lat: "FIXME",
        };
        // mockedDoSharedStateApiCall.mockResolvedValue(nodesReferenceState);
        mockedDoSharedStateApiCall.mockResolvedValue(nodesReferenceState);
        render(
            <MeshWideMap nodes={true} batmanLinks={false} wifiLinks={false} />
        );
        expect(
            await screen.findByTestId("has-invalid-nodes")
        ).toBeInTheDocument();
    });
});
