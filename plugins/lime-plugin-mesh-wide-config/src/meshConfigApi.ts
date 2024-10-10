import { MeshWideConfigState } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const getMeshWideConfigState = async () => meshWideConfigState;

export const getMeshWideConfig = async () => meshWideConfig;

const meshWideConfigState: MeshWideConfigState = {
    node1: {
        state: "DEFAULT",
        timestamp: "2021-09-01T00:00:00Z",
        main_node: "MAIN_NODE",
        error: "",
        node_ip: "10.13.0.1",
        bleachTTL: 0,
        author: "node1",
    },
    node2: {
        state: "DEFAULT",
        timestamp: "2021-09-01T00:00:00Z",
        main_node: "NO",
        error: "Error: node2 is not reachable.",
        node_ip: "10.13.0.100",
        bleachTTL: 0,
        author: "node2",
    },
};

const meshWideConfig = `# Read the documentation in /docs directory
# and on http://libremesh.org

### System options
config lime 'system'
\toption hostname 'LiMe-%M4%M5%M6'
\toption domain 'thisnode.info'
\toption keep_on_upgrade 'libremesh dropbear minimum-essential /etc/sysupgrade.conf shared-state-ref-state'
\toption root_password_policy 'DO_NOTHING'
\toption deferable_reboot_uptime_s '97200'
\toption firstbootwizard_configured 'false'
\toption firstbootwizard_dismissed 'false'

config lime 'network'
\toption primary_interface 'eth0'
\toption main_ipv4_address '10.%N1.0.0/16'
\toption anygw_dhcp_start '2'
\toption anygw_dhcp_limit '0'
\toption main_ipv6_address 'fd%N1:%N2%N3:%N4%N5::/64'
\tlist protocols 'ieee80211s'
\tlist protocols 'lan'
\tlist protocols 'anygw'
\tlist protocols 'batadv:%N1'
\tlist protocols 'bmx6:13'
\tlist protocols 'olsr:14'
\tlist protocols 'olsr6:15'
\tlist protocols 'olsr2:16'
\tlist protocols 'babeld:17'
\tlist protocols 'bmx7:18'
\tlist resolvers '4.2.2.2'
\tlist resolvers '141.1.1.1'
\tlist resolvers '2001:470:20::2'
\toption bmx6_mtu '1500'
\toption bmx6_publish_ownip 'false'
\toption bmx6_over_batman 'false'
\toption bmx6_pref_gw 'none'
\toption bmx6_wifi_rate_max '54000000'
\toption bmx7_mtu '1500'
\toption bmx7_publish_ownip 'false'
\toption bmx7_over_batman 'false'
\toption bmx7_pref_gw 'none'
\toption bmx7_wifi_rate_max 'auto'
\toption bmx7_enable_pki 'false'
\toption batadv_orig_interval '2000'
\toption batadv_routing_algo 'BATMAN_IV'
\toption anygw_mac 'aa:aa:aa:%N1:%N2:aa'
\toption use_odhcpd 'false'

config lime 'wifi'
\tlist modes 'ap'
\tlist modes 'apname'
\tlist modes 'ieee80211s'
\toption ap_ssid 'LibreMesh.org'
\toption apname_ssid 'LibreMesh.org/%H'
\toption adhoc_ssid 'LiMe'
\toption adhoc_bssid 'ca:fe:00:c0:ff:ee'
\toption ieee80211s_mesh_fwding '0'
\toption ieee80211s_mesh_id 'LiMe'
\toption unstuck_interval '10'
\toption unstuck_timeout '300'

config lime-wifi-band '2ghz'
\toption channel '11'
\toption htmode 'HT20'
\toption distance '1000'
\toption adhoc_mcast_rate '24000'
\toption ieee80211s_mcast_rate '24000'

config lime-wifi-band '5ghz'
\tlist channel '48'
\tlist channel '157'
\toption htmode 'HT40'
\toption distance '10000'
\toption adhoc_mcast_rate '6000'
\toption ieee80211s_mcast_rate '6000'

config generic_uci_config 'uhttpd_https'
\tlist uci_set 'uhttpd.main.redirect_https=0'`;
