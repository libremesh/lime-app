import { DEFAULT_COMMUNITY_SETTINGS } from "utils/constants";
import api from "utils/uhttpd.service";

export function getBatHost(mac, outgoingIface) {
    return mock_bathost.bathost;
    // return api
    //     .call("bat-hosts", "get_bathost", {
    //         mac,
    //         outgoing_iface: outgoingIface,
    //     })
    //     .then(
    //         (response) =>
    //             new Promise((res, rej) => {
    //                 if (response.status === "ok") {
    //                     res(response.bathost);
    //                 } else {
    //                     rej(response.message);
    //                 }
    //             })
    //     );
}

const mock_bathost = {
    bathost: {
        iface: "br-lan",
        hostname: "lapastoramesh-c",
    },
};

export function getBoardData() {
    return mock_board_data;
    // return api.call("system", "board", {});
}

const mock_board_data = {
    kernel: "4.14.241",
    hostname: "lapastoramesh-c",
    system: "Atheros AR9344 rev 2",
    model: "TP-Link TL-WDR3600 v1",
    board_name: "tplink,tl-wdr3600-v1",
    release: {
        distribution: "%LIME_ID%",
        version: "%LIME_RELEASE%",
        revision: "%LIME_REVISION%",
        target: "ath79/generic",
        description: "%LIME_DESCRIPTION%",
    },
};

export function getSession() {
    return api
        .call("session", "access", {})
        .then(async (result) => {
            let username = null;
            if (result["access-group"]["root"]) {
                username = "root";
            } else if (result["access-group"]["lime-app"]) {
                username = "lime-app";
            }
            return { username };
        })
        .catch(async () => ({ username: null }));
}

export function getCommunitySettings() {
    return api
        .call("lime-utils", "get_community_settings", {})
        .then((res) => ({ ...res, DEFAULT_COMMUNITY_SETTINGS }))
        .catch(() => DEFAULT_COMMUNITY_SETTINGS);
}

export function reboot() {
    return api.call("system", "reboot", {}).then(() => true);
}

export function checkInternet() {
    return api.call("check-internet", "is_connected", {});
}

export async function getChangesNeedReboot() {
    return sessionStorage.getItem("need-reboot") == "yes";
}

export async function setChangesNeedReboot(value) {
    sessionStorage.setItem("need-reboot", value);
    return value;
}
