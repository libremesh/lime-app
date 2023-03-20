import { DEFAULT_COMMUNITY_SETTINGS } from "utils/constants";
import api from "utils/uhttpd.service";

export function getBatHost(mac, outgoingIface) {
    return api
        .call("bat-hosts", "get_bathost", {
            mac,
            outgoing_iface: outgoingIface,
        })
        .then(
            (response) =>
                new Promise((res, rej) => {
                    if (response.status === "ok") {
                        res(response.bathost);
                    } else {
                        rej(response.message);
                    }
                })
        );
}

export function getBoardData() {
    return api.call("system", "board", {});
}

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
