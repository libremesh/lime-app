import "@testing-library/jest-dom";
import { screen } from "@testing-library/preact";

import { SelectedFeatureBottomSheet } from "plugins/lime-plugin-mesh-wide/src/containers/SelectedFeatureBottomSheet";
import {
    nodes,
    nodesReferenceState,
} from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import {
    INodeInfo,
    NodeMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { render } from "utils/test_utils";

jest.mock("plugins/lime-plugin-mesh-wide/src/meshWideQueries.tsx");
const mockedSelectedMapFeature = jest.mocked(useSelectedMapFeature);

function pxToNumber(pxString: string): number {
    const numericString = pxString.replace("px", "");
    return parseInt(numericString, 10);
}

describe("Feature bottom sheet", () => {
    // beforeEach(() => {});
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false, // or true if you want it to match
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated in favor of `addEventListener`
                removeListener: jest.fn(), // deprecated in favor of `removeEventListener`
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it("should not open BottomSheet when selectedMapFeature is null", () => {
        // Mock the return value for the hook
        mockedSelectedMapFeature.mockReturnValue({
            data: null,
            setData: () => {},
        });

        render(<SelectedFeatureBottomSheet />);

        expect(
            pxToNumber(screen.queryByTestId("bottom-sheet-body").style.height)
        ).toBeLessThan(0);
    });

    it("should open BottomSheet with invalid nodes feature", () => {
        const invalid = "invalid_node";
        mockedSelectedMapFeature.mockReturnValue({
            data: {
                type: "errorsDetails",
                feature: {
                    invalidNodes: new Set([invalid]),
                    meshWideDataErrors: [],
                    dataNotSetErrors: [],
                },
                id: "errorsDetails",
            },
            setData: () => {},
        });

        render(<SelectedFeatureBottomSheet />);
        expect(
            pxToNumber(screen.queryByTestId("bottom-sheet-body").style.height)
        ).toBeGreaterThan(0);
        expect(screen.getByText(invalid)).toBeInTheDocument();
        expect(screen.getByText("Invalid Nodes")).toBeInTheDocument();
    });

    it("should open BottomSheet with node feature", () => {
        const name = "LiMe-da4eaa";
        const actual: INodeInfo = nodes()[name];
        const reference: INodeInfo = nodesReferenceState[name];
        // Mock the return value for the hook
        mockedSelectedMapFeature.mockReturnValue({
            data: {
                type: "node",
                feature: { actual, reference, name } as NodeMapFeature,
                id: "node",
            },
            setData: () => {},
        });

        render(<SelectedFeatureBottomSheet />);

        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it.skip("should open BottomSheet with link feature", () => {
        // todo: fix this test. The feature change with new objects.
        // const name = "LiMe-da4eaa";
        // const actual = links("wifi_links_info")[name];
        // const reference = linksReferenceState[name];
        // mockedSelectedMapFeature.mockReturnValue({
        //     data: {
        //         type: "link",
        //         feature: { PontToPointLink(actual), reference } as LinkMapFeature,
        //         id: "node",
        //     },
        //     setData: () => {},
        // });
        //
        // render(<SelectedFeatureBottomSheet />);
        //
        // expect(screen.getByText(name)).toBeInTheDocument();
    });
});
