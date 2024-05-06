import { useMutation, useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";

import {
    downloadRelease,
    getDownloadStatus,
    getNewVersion,
    getUpgradeInfo,
    upgradeConfirm,
    upgradeFirmware,
    upgradeRevert,
} from "./firmwareApi";

export function useUpgradeInfo(params) {
    return useQuery(["lime-utils", "get_upgrade_info"], getUpgradeInfo, params);
}

function resetSuCounter() {
    queryCache.setQueryData(["lime-utils", "get_upgrade_info"], (oldInfo) => ({
        ...oldInfo,
        suCounter: -1,
    }));
}

export function useUpgradeConfirm() {
    return useMutation(upgradeConfirm, {
        onSuccess: resetSuCounter,
    });
}

export function useUpgradeRevert() {
    return useMutation(upgradeRevert, {
        onSuccess: resetSuCounter,
    });
}

export function useNewVersion(params) {
    return useQuery(
        ["eupgrade", "is_new_version_available"],
        getNewVersion,
        params
    );
}

export function useDownloadStatus(params) {
    return useQuery(["eupgrade", "download_status"], getDownloadStatus, params);
}

export function useDownloadRelease() {
    return useMutation(downloadRelease, {
        onSuccess: () =>
            queryCache.setQueryData(["eupgrade", "download_status"], {
                download_status: "downloading",
            }),
    });
}

export function useUpgradeFirwmare() {
    return useMutation(upgradeFirmware);
}
