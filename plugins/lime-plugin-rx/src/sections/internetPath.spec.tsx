import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor, within } from "@testing-library/preact";

import { getPath } from "plugins/lime-plugin-metrics/src/metricsApi";
import {
    getInternetStatus,
    getNodeStatus,
} from "plugins/lime-plugin-rx/src/rxApi";
import { IGetInternetStatus } from "plugins/lime-plugin-rx/src/rxTypes";
import { InternetPath } from "plugins/lime-plugin-rx/src/sections/internetPath";
import { mock_node_status } from "plugins/lime-plugin-rx/src/sections/wired.spec";

import { render } from "utils/test_utils";

jest.mock("plugins/lime-plugin-rx/src/rxApi");
jest.mock("plugins/lime-plugin-metrics/src/metricsApi.js");
const mockedNodeStatus = jest.mocked(getNodeStatus);
const mockedInternetStatus = jest.mocked(getInternetStatus);
const mockedPath = jest.mocked(getPath);

describe("align page", () => {
    beforeEach(() => {
        mockedNodeStatus.mockImplementation(async () => mock_node_status);
        mockedInternetStatus.mockImplementation(
            async () => get_internet_status_mock
        );
        mockedPath.mockImplementation(async () => last_internet_path_mock);
    });

    it("Shows diagnose and map buttons", async () => {
        render(<InternetPath />);
        const diagnoseBtn = await screen.findByText(/Diagnose/i);
        expect(diagnoseBtn).toBeInTheDocument();
        const mapBtn = await screen.findByText(/Map/i);
        expect(mapBtn).toBeInTheDocument();
    });

    it("search every internet status label and check if the icon is correct", async () => {
        render(<InternetPath />);
        const status = get_internet_status_mock;
        for (const [key, value] of Object.entries(status)) {
            if (key === "status") return;
            const stat = within(await screen.findByTestId(`internet-${key}`));
            const label = stat.getByText(key);
            expect(label).toBeInTheDocument();
            await waitFor(() =>
                expect(
                    screen.queryByTestId(`internet-status-${key}`)
                ).not.toHaveClass("stroke-disabled")
            );
            const icon = await stat.findByTestId(`internet-status-${key}`);
            const color = value.working ? "fill-primary-dark" : "fill-danger";
            expect(icon).toHaveClass(color);
        }
    });

    it("look that every node is painted on the path", async () => {
        render(<InternetPath />);
        await waitFor(() => expect(mockedPath).toHaveBeenCalledTimes(1));

        for (const node of last_internet_path_mock) {
            const nodeText = node.hostname ? node.hostname : node.ip;
            const txt = await screen.findByText(nodeText);
            expect(txt).toBeInTheDocument();
        }
    });
});

const get_internet_status_mock: IGetInternetStatus = {
    DNS: {
        working: false,
    },
    IPv6: {
        working: true,
    },
    status: "ok",
    IPv4: {
        working: false,
    },
};

const last_internet_path_mock = [
    { ip: "10.219.105.28", hostname: "nodo1" },
    { ip: "10.1.61.3", hostname: "" },
    { ip: "10.1.61.2", hostname: "" },
    { ip: "10.75.0.1", hostname: "GW" },
];
