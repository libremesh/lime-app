import NodeAdminPage from "./src/nodeAdminPage";

export default {
    title: "Containers/Node Configuration",
};

export const NodeAdmin = (args) => <NodeAdminPage {...args} />;
NodeAdmin.args = {
    queries: [
        [
            ["lime-utils", "get_wifi_data"],
            {
                node_ap: {
                    has_password: false,
                },
                community_ap: {
                    community: { enabled: true },
                    enabled: true,
                    ssid: "quintana-libre.org.ar",
                },
            },
        ],
        [
            ["lime-utils", "hotspot_wwan_get_status"],
            {
                enabled: true,
            },
        ],
    ],
};
