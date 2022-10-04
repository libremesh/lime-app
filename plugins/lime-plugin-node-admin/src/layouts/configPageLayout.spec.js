import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/preact";

import { route } from "preact-router";

import { render } from "utils/test_utils";

import ConfigPageLayout from "./configPageLayout";

const findBackArrow = async () => screen.findByLabelText("back");

describe("config layout", () => {
    it("renders the title for the config", async () => {
        render(<ConfigPageLayout title={"My Config"} />);
        expect(await screen.findByText("My Config")).toBeInTheDocument();
    });

    it("routes back to node admin when clicking on back arrow", async () => {
        render(<ConfigPageLayout />);
        fireEvent.click(await findBackArrow());
        expect(route).toHaveBeenCalledWith("/nodeadmin");
    });

    it("shows a message on errors", async () => {
        render(<ConfigPageLayout isError={true} />);
        expect(await screen.findByText("Error: Not Saved")).toBeInTheDocument();
    });

    it("shows a message on success", async () => {
        render(<ConfigPageLayout isSuccess={true} />);
        expect(await screen.findByText("Saved")).toBeInTheDocument();
    });
});
