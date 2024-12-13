import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/preact";

import { getNodeStatus } from "plugins/lime-plugin-rx/src/rxApi";
import { Alignment } from "plugins/lime-plugin-rx/src/sections/alignment";
import { mock_node_status } from "plugins/lime-plugin-rx/src/sections/wired.spec";

import { render } from "utils/test_utils";

jest.mock("plugins/lime-plugin-rx/src/rxApi");
const mockedFoo = jest.mocked(getNodeStatus);

describe("align page", () => {
    beforeEach(() => {
        mockedFoo.mockImplementation(async () => mock_node_status);
    });

    it("Shows two alignment button", async () => {
        render(<Alignment />);
        const button = await screen.findByText(/^Check/i);
        expect(button).toBeInTheDocument();
    });

    it("Shows signal and chains", async () => {
        render(<Alignment />);
        const signal = mock_node_status.most_active.signal;
        const signalDiv = await screen.findByText(signal);
        expect(signalDiv).toBeInTheDocument();
        const chain = mock_node_status.most_active.chains;
        for (const c of chain) {
            const chain = await screen.findByText(c);
            expect(chain).toBeInTheDocument();
        }
    });

    it("shows most active iface information", async () => {
        render(<Alignment />);
        const traffic = Math.round(
            (mock_node_status.most_active.rx_bytes +
                mock_node_status.most_active.tx_bytes) /
                1024 /
                1024
        );
        const speed = await screen.findByText(new RegExp(`^${traffic}`, "i"));
        expect(speed).toBeInTheDocument();
        const iface = await screen.findByText(
            mock_node_status.most_active.iface
        );
        expect(iface).toBeInTheDocument();
    });
});
