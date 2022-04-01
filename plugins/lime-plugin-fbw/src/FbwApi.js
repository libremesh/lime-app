import api from 'utils/uhttpd.service';

export const searchNetworks = (rescan) => 
	// responseJsonNoNets
	responseJson
	// api.call('lime-fbw', 'search_networks', { scan: rescan || false });

export const setNetwork = ({ file, hostname }) =>
	api.call('lime-fbw', 'set_network', { file, hostname });

export const createNetwork = ({ network, hostname, adminPassword }) =>
	api.call('lime-fbw', 'create_network', { network, hostname, adminPassword });

export const getFbwStatus = () =>
	api.call('lime-fbw', 'status', {})
		.catch(() => ({ lock: false }));

export const dismissFbw = () =>
	api.call('lime-fbw', 'dismiss', {});

const responseJson = JSON.parse(`{
	"status": "scanned",
	"networks": [
			{
					"file": "lime-community__host__ql-refu-bbone__38:AB:C0:C1:D6:70",
					"config": {
							"fix_librerouterv0_random_macs": {
									".name": "fix_librerouterv0_random_macs",
									".type": "run_asset",
									"when": "ATCONFIG",
									".anonymous": false,
									"asset": "community/librerouterv0-random-macs",
									".index": 9
							},
							"network": {
									".name": "network",
									".type": "lime",
									"protocols": [
											"ieee80211s",
											"lan",
											"anygw",
											"batadv:%N1",
											"bmx6:13",
											"olsr:14",
											"olsr6:15",
											"olsr2:16",
											"babeld:17",
											"bmx7:18"
									],
									"main_ipv4_address": "10.5.0.0/21",
									"main_ipv6_address": "2801:01e8:2::/64",
									".anonymous": false,
									".index": 1
							},
							"system": {
									".name": "system",
									".anonymous": false,
									"root_password_policy": "SET_SECRET",
									"domain": "red.quintana.libre.org.ar",
									".index": 0,
									"root_password_secret": "$1$63DcDgyl$gQLypgcVCl05qLhKUMRvc0",
									"hostname": "ql-%M4%M5%M6",
									"deferable_reboot_uptime_s": "10800",
									".type": "lime"
							},
							"grafana_am": {
									".name": "grafana_am",
									".type": "generic_uci_config",
									"uci_set": [
											"prometheus-node-push-influx.altermundi=prometheus-node-push-influx",
											"prometheus-node-push-influx.altermundi.server_address=grafana.altermundi.net",
											"prometheus-node-push-influx.altermundi.server_port=8428",
											"prometheus-node-push-influx.altermundi.interval=30",
											"prometheus-node-push-influx.altermundi.disabled="
									],
									".anonymous": false,
									".index": 10
							},
							"fix_authorized_keys_permissions": {
									".name": "fix_authorized_keys_permissions",
									".type": "run_asset",
									"when": "ATCONFIG",
									".anonymous": false,
									"asset": "community/fix_authorized_keys_permissions",
									".index": 8
							},
							"wifi": {
									".name": "wifi",
									".anonymous": false,
									"country": "TZ",
									"ap_ssid": "quintana.libre.org.ar",
									".index": 2,
									"channel_2ghz": "11",
									"apname_ssid": "quintana.libre.org.ar/%H",
									"modes": [
											"ap_2ghz",
											"apname_2ghz",
											"ieee80211s_5ghz"
									],
									"channel_5ghz": [
											"136",
											"60"
									],
									".type": "lime"
							},
							"cron_defer_reboot": {
									".name": "cron_defer_reboot",
									".type": "run_asset",
									"when": "ATCONFIG",
									".anonymous": false,
									"asset": "community/cron_defer_reboot",
									".index": 6
							},
							"location": {
									".name": "location",
									".type": "generic_uci_config",
									"uci_set": [
											"location.settings=location",
											"location.settings.community_latitude=-31.80461",
											"location.settings.community_longitude=-64.41609"
									],
									".anonymous": false,
									".index": 4
							},
							"dropbear": {
									".name": "dropbear",
									".type": "generic_uci_config",
									"uci_set": [
											"dropbear.@dropbear[0].RootPasswordAuth=off"
									],
									".anonymous": false,
									".index": 5
							},
							"system_opts": {
									".name": "system_opts",
									".type": "generic_uci_config",
									"uci_set": [
											"system.@system[0].timezone=ART3",
											"system.@system[0].log_ip=10.5.1.4"
									],
									".anonymous": false,
									".index": 3
							},
							"authorized_keys": {
									".name": "authorized_keys",
									".type": "copy_asset",
									"dst": "/etc/dropbear",
									".anonymous": false,
									"asset": "community/authorized_keys",
									".index": 7
							}
					}
			}
	],
	"scanned": [
	  {
		"quality": 57,
		"quality_max": 70,
		"ssid": "foo_ssid",
		"encryption": {
		  "enabled": true,
		  "auth_algs": [],
		  "description": "WPA2 PSK (CCMP)",
		  "wep": false,
		  "auth_suites": [
			[
			  "PSK"
			]
		  ],
		  "wpa": 2,
		  "pair_ciphers": [
			"CCMP"
		  ],
		  "group_ciphers": [
			"CCMP"
		  ]
		},
		"mode": "Master",
		"bssid": "38:AB:C0:C1:D6:70",
		"channel": 1,
		"signal": -53
	  },
	  {
		"quality": 43,
		"quality_max": 70,
		"ssid": "bar_ssid",
		"encryption": {
		  "enabled": false,
		  "auth_algs": [],
		  "description": "None",
		  "wep": false,
		  "auth_suites": [],
		  "wpa": 0,
		  "pair_ciphers": [],
		  "group_ciphers": []
		},
		"mode": "Master",
		"bssid": "C2:4A:00:BE:7B:B7",
		"channel": 11,
		"signal": -67
	  }
	]
}`
)

const responseJsonNoNets = JSON.parse(`{
	"status": "scanned",
	"networks": [
			{
					"file": "lime-community__host__ql-refu-bbone",
					"config": {
							"fix_librerouterv0_random_macs": {
									".name": "fix_librerouterv0_random_macs",
									".type": "run_asset",
									"when": "ATCONFIG",
									".anonymous": false,
									"asset": "community/librerouterv0-random-macs",
									".index": 9
							},
							"network": {
									".name": "network",
									".type": "lime",
									"protocols": [
											"ieee80211s",
											"lan",
											"anygw",
											"batadv:%N1",
											"bmx6:13",
											"olsr:14",
											"olsr6:15",
											"olsr2:16",
											"babeld:17",
											"bmx7:18"
									],
									"main_ipv4_address": "10.5.0.0/21",
									"main_ipv6_address": "2801:01e8:2::/64",
									".anonymous": false,
									".index": 1
							},
							"system": {
									".name": "system",
									".anonymous": false,
									"root_password_policy": "SET_SECRET",
									"domain": "red.quintana.libre.org.ar",
									".index": 0,
									"root_password_secret": "$1$63DcDgyl$gQLypgcVCl05qLhKUMRvc0",
									"hostname": "ql-%M4%M5%M6",
									"deferable_reboot_uptime_s": "10800",
									".type": "lime"
							},
							"grafana_am": {
									".name": "grafana_am",
									".type": "generic_uci_config",
									"uci_set": [
											"prometheus-node-push-influx.altermundi=prometheus-node-push-influx",
											"prometheus-node-push-influx.altermundi.server_address=grafana.altermundi.net",
											"prometheus-node-push-influx.altermundi.server_port=8428",
											"prometheus-node-push-influx.altermundi.interval=30",
											"prometheus-node-push-influx.altermundi.disabled="
									],
									".anonymous": false,
									".index": 10
							},
							"fix_authorized_keys_permissions": {
									".name": "fix_authorized_keys_permissions",
									".type": "run_asset",
									"when": "ATCONFIG",
									".anonymous": false,
									"asset": "community/fix_authorized_keys_permissions",
									".index": 8
							},
							"wifi": {
									".name": "wifi",
									".anonymous": false,
									"country": "TZ",
									"ap_ssid": "quintana.libre.org.ar",
									".index": 2,
									"channel_2ghz": "11",
									"apname_ssid": "quintana.libre.org.ar/%H",
									"modes": [
											"ap_2ghz",
											"apname_2ghz",
											"ieee80211s_5ghz"
									],
									"channel_5ghz": [
											"136",
											"60"
									],
									".type": "lime"
							},
							"cron_defer_reboot": {
									".name": "cron_defer_reboot",
									".type": "run_asset",
									"when": "ATCONFIG",
									".anonymous": false,
									"asset": "community/cron_defer_reboot",
									".index": 6
							},
							"location": {
									".name": "location",
									".type": "generic_uci_config",
									"uci_set": [
											"location.settings=location",
											"location.settings.community_latitude=-31.80461",
											"location.settings.community_longitude=-64.41609"
									],
									".anonymous": false,
									".index": 4
							},
							"dropbear": {
									".name": "dropbear",
									".type": "generic_uci_config",
									"uci_set": [
											"dropbear.@dropbear[0].RootPasswordAuth=off"
									],
									".anonymous": false,
									".index": 5
							},
							"system_opts": {
									".name": "system_opts",
									".type": "generic_uci_config",
									"uci_set": [
											"system.@system[0].timezone=ART3",
											"system.@system[0].log_ip=10.5.1.4"
									],
									".anonymous": false,
									".index": 3
							},
							"authorized_keys": {
									".name": "authorized_keys",
									".type": "copy_asset",
									"dst": "/etc/dropbear",
									".anonymous": false,
									"asset": "community/authorized_keys",
									".index": 7
							}
					}
			}
	],
	"scanned": [
	  
	]
}`
)
