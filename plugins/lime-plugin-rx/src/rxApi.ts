import api from "utils/uhttpd.service";

interface DeviceStatus {
    version: string;
    address: string;
}

export interface SwitchStatus {
    device: string;
    num: number;
    role: string;
    link: string;
}

interface MostActive {
    rx_short_gi: boolean;
    station_mac: string;
    tx_bytes: number;
    rx_vht: boolean;
    rx_mhz: number;
    rx_40mhz: boolean;
    tx_packets: number;
    tx_mhz: number;
    rx_packets: number;
    rx_ht: boolean;
    tx_mcs: number;
    noise: number;
    rx_mcs: number;
    chains: number[];
    rx_bytes: number;
    tx_ht: boolean;
    iface: string;
    tx_rate: number;
    inactive: number;
    tx_short_gi: boolean;
    tx_40mhz: boolean;
    expected_throughput: number;
    tx_vht: boolean;
    rx_rate: number;
    signal: number;
}

export interface StatusResponse {
    ips: DeviceStatus[];
    hostname: string;
    switch_status: SwitchStatus[];
    status: string;
    uptime: string;
    most_active: MostActive;
}

export interface IGetInternetStatus {
    DNS: { working: boolean };
    IPv6: { working: boolean };
    IPv4: { working: boolean };
    status: string;
}

export const getNodeStatus = (): Promise<StatusResponse> =>
    api.call("lime-utils", "get_node_status", {});

export const getInternetStatus = (): Promise<IGetInternetStatus> =>
    api.call("lime-metrics", "get_internet_status", {});
