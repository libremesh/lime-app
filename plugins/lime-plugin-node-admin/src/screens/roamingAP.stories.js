import RoamingAPPage from "./roamingAP";

export default {
    title: "Containers/Node Configuration/Roaming AP",
};

export const disabled = () => <RoamingAPPage />;
disabled.args = {
    queries: [
        [
            ["lime-utils", "get_wifi_data"],
            {
                community_ap: {
                    community: { enabled: true },
                    enabled: false,
                    ssid: "quintana-libre.org.ar",
                },
            },
        ],
        [["lime-utils", "get_community_name"], "QuintanaLibre"],
    ],
};

export const enabled = () => <RoamingAPPage />;
enabled.args = {
    queries: [
        [
            ["lime-utils", "get_wifi_data"],
            {
                community_ap: {
                    community: { enabled: true },
                    enabled: true,
                    ssid: "quintana-libre.org.ar",
                },
            },
        ],
        [["lime-utils", "get_community_name"], "QuintanaLibre"],
    ],
};

export const defaultIsDisabled = () => <RoamingAPPage />;
defaultIsDisabled.args = {
    queries: [
        [
            ["lime-utils", "get_wifi_data"],
            {
                community_ap: {
                    community: { enabled: false },
                    enabled: true,
                    ssid: "quintana-libre.org.ar",
                },
            },
        ],
        [["lime-utils", "get_community_name"], "QuintanaLibre"],
    ],
};
