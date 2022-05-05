import api from 'utils/uhttpd.service';

export const searchNetworks = (rescan) => responseWifiOnly
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

const responseWifiOnly = JSON.parse(`{
		"status": "scanning",
		"networks": [
				{
					"file": "lime-community__host__ql-refu-bbone__38:AB:C0:C1:D6:70",
					"config": {
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
						}
					}
				},
				{
					"file": "lime-community__host__ql-refu-bbone__38:AB:C0:C1:D6:71",
					"config": {
						"wifi": {
							".name": "wifi",
							"ap_ssid": "quintana.libre.org.ar"
						}
					}
				}
		],
		"scanned": [
			{
				"status": {"retval": true, "code" : "downloaded_config"},
				"quality": 50,
				"quality_max": 70,
				"ssid": "foo_ssid",
				"bssid": "38:AB:C0:C1:D6:70",
				"channel": 1,
				"signal": -51
			  },
			{
				"status": {"retval": true, "code" : "downloading_config"},
				"quality": 52,
				"quality_max": 70,
				"ssid": "foo_ssid",
				"bssid": "38:AB:C0:C1:D6:71",
				"channel": 1,
				"signal": -53
			  },
			  {
				"quality": 55,
				"quality_max": 70,
				"ssid": "foo_ssid",
				"bssid": "38:AB:C0:C1:D6:72",
				"channel": 1,
				"signal": -54
			  },
			  {
				"status": {"retval": false, "code" : "error_download_lime_community"},
				"quality": 58,
				"quality_max": 70,
				"ssid": "foo_ssid",
				"bssid": "38:AB:C0:C1:D6:73",
				"channel": 1,
				"signal": -56
			  },
			  {
				"status": {"retval": false, "code" : "error_not_configured"},
				"quality": 59,
				"quality_max": 70,
				"ssid": "foo_ssid",
				"bssid": "38:AB:C0:C1:D6:74",
				"channel": 1,
				"signal": -58
			  }, 
			  {
				"status": {"retval": false, "code" : "error_download_lime_assets"},
				"quality": 60,
				"quality_max": 70,
				"ssid": "foo_ssid",
				"bssid": "38:AB:C0:C1:D6:75",
				"channel": 1,
				"signal": -60
			  }
			
		]
	}`
	)