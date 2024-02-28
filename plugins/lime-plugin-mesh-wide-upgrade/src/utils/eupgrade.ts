export function isEupgradeStatus(
    status: EupgradeStatus | undefined | null
): status is EupgradeStatus {
    return EupgradeStatusStates.includes(status);
}

export const EupgradeStatusStates = [
    "not-initiated",
    "downloading",
    "downloaded",
    "download-failed",
] as const;

export type EupgradeStatus = (typeof EupgradeStatusStates)[number];
