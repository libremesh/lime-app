import { Trans } from "@lingui/macro";
import path from "path";

import { useEffect, useState } from "preact/hooks";
import { useForm } from "react-hook-form";

import Loading from "components/loading";

import { upgradeFirmware, uploadFile } from "../firmwareApi";
import {
    useDownloadRelease,
    useDownloadStatus,
    useNewVersion,
    useUpgradeFirwmare,
    useUpgradeInfo,
} from "../firmwareQueries";
import style from "./style.less";

export const SafeUpgradeBadge = () => {
    const { isLoading, data: upgradeInfo } = useUpgradeInfo();
    if (isLoading) return;

    const isAvailable = upgradeInfo["is_upgrade_confirm_supported"];
    return (
        <div>
            {isAvailable === true && (
                <div class={`${style.note} ${style.notePositive}`}>
                    <Trans>
                        This device supports secure rollback to previous version
                        if something goes wrong
                    </Trans>
                </div>
            )}
            {isAvailable === false && (
                <div class={`${style.note} ${style.noteWarning}`}>
                    <Trans>
                        This device does not support secure rollback to previous
                        version if something goes wrong
                    </Trans>
                </div>
            )}
        </div>
    );
};

const UpgradeFromRelease = ({ onUpgrading, onSwitch }) => {
    const [pollingInterval, setPollingInterval] = useState(null);
    const { data: newVersion } = useNewVersion();
    const versionName = newVersion && newVersion.version;
    const { data: downloadStatus } = useDownloadStatus({
        refetchInterval: pollingInterval,
        enabled: versionName,
        onSuccess: (data) => {
            if (data.download_status === "downloading") {
                setPollingInterval(1000);
            } else {
                setPollingInterval(null);
            }
            return data;
        },
    });

    const [downloadRelease, { isLoading: submittingDownload }] =
        useDownloadRelease();
    const [upgradeFirmware, { isLoading: submittingUpgrade }] =
        useUpgradeFirwmare();
    const filePath = downloadStatus && downloadStatus.fw_path;
    const status = downloadStatus && downloadStatus.download_status;

    function onDownload() {
        downloadRelease();
    }

    function onUpgrade() {
        upgradeFirmware(filePath).then(onUpgrading);
    }

    if (!versionName) return;

    return (
        <div class="container container-padded">
            <h5>
                <Trans>Upgrade to lastest firmware version</Trans>
            </h5>
            <h6>
                <Trans>{versionName} is now available</Trans>🎉
            </h6>
            {status === "not-initiated" && (
                <button onClick={onDownload}>
                    <Trans>Download</Trans>
                </button>
            )}
            {(submittingDownload || submittingUpgrade) && <Loading />}
            {status === "downloading" && (
                <div>
                    <div class="withLoadingEllipsis">
                        <Trans>Downloading</Trans>
                    </div>
                    <button disabled>
                        <Trans>Upgrade to {versionName}</Trans>
                    </button>
                </div>
            )}
            {status === "download-failed" && (
                <div>
                    <div>
                        <Trans>The download failed</Trans>
                    </div>
                    <button onClick={onDownload}>
                        <Trans>Retry</Trans>
                    </button>
                </div>
            )}
            {status === "downloaded" && (
                <button onClick={onUpgrade}>
                    <Trans>Upgrade to {versionName}</Trans>
                </button>
            )}
            {newVersion["release-info-url"] && (
                <div>
                    <Trans>More info at:</Trans>
                    <a href={newVersion["release-info-url"]}>
                        {" "}
                        {newVersion["release-info-url"]}{" "}
                    </a>
                </div>
            )}
            <div style={{ marginTop: "1em" }}>
                <a href="#" onClick={onSwitch}>
                    <Trans>Or choose a firmware image from your device</Trans>{" "}
                </a>
            </div>
        </div>
    );
};

export const UpgradeFromFile = ({ onUpgrading, onSwitch }) => {
    const { data: newVersion } = useNewVersion();
    const [invalidFirmwareError, setinvalidFirmwareError] = useState(false);
    const { register, handleSubmit, errors, watch, formState } = useForm();
    const file = watch("file");
    const { isSubmitting } = formState;

    function onUpgrade(data) {
        setinvalidFirmwareError(false);
        const file = data.file[0];
        return uploadFile(file)
            .then((filepath) => upgradeFirmware(filepath))
            .then(() => onUpgrading())
            .catch((error) => {
                switch (error) {
                    case "Invalid firmware":
                        setinvalidFirmwareError(true);
                        break;
                    default:
                        throw new Error(error);
                }
            });
    }

    function isValidExtname(value) {
        const extname = path.extname(value[0].name);
        return extname === ".sh" || extname === ".bin";
    }

    return (
        <div class="container container-padded">
            <SafeUpgradeBadge />
            <h5>
                <b>
                    <Trans>Upload firmware image from your device</Trans>
                </b>
            </h5>
            <form id="file-upload-form" onSubmit={handleSubmit(onUpgrade)}>
                <label class="button" htmlFor="file">
                    <Trans>Select file</Trans>
                </label>
                <input
                    style={{ width: 0 }} // Hide the ugly builtin input
                    name="file"
                    id="file"
                    type="file"
                    ref={register({
                        required: true,
                        validate: { validExtname: isValidExtname },
                    })}
                />
                {file && file.length > 0 && (
                    <div>
                        <div>
                            <b>
                                <Trans>Filename</Trans>
                            </b>
                            : {file[0].name}
                        </div>
                        <div>
                            <b>
                                <Trans>Size</Trans>
                            </b>
                            : {(file[0].size / 1048576).toFixed(1)} MB
                        </div>
                    </div>
                )}
                {errors.file && errors.file.type === "required" && (
                    <p style={{ color: "#923838" }}>
                        <Trans>Please select a file</Trans>
                    </p>
                )}
                {errors.file && errors.file.type === "validExtname" && (
                    <p style={{ color: "#923838" }}>
                        <Trans>Please select a .sh or .bin file</Trans>
                    </p>
                )}
                <div>
                    <button disabled={isSubmitting} type="submit">
                        <Trans>Upgrade</Trans>
                    </button>
                </div>
            </form>
            {isSubmitting && (
                <div>
                    <Loading />
                </div>
            )}
            {invalidFirmwareError && (
                <div class={`${style.note} ${style.noteError}`}>
                    <Trans>
                        The selected image is not valid for the target device
                    </Trans>
                </div>
            )}
            {newVersion && newVersion.version && (
                <div style={{ marginTop: "1em" }}>
                    <a href="#" onClick={onSwitch}>
                        <Trans>Or upgrade to latest release</Trans>{" "}
                    </a>
                </div>
            )}
        </div>
    );
};

export const UpgradePage = ({ onUpgrading }) => {
    const [fwSource, setfwSource] = useState();
    const { data: newVersion, isLoading } = useNewVersion();

    useEffect(() => {
        const defaultSrc =
            newVersion && newVersion.version ? "fromRelease" : "fromFile";
        setfwSource(defaultSrc);
    }, [newVersion]);

    const switchTo = (fwSource) => (e) => {
        e.preventDefault();
        setfwSource(fwSource);
    };

    if (isLoading) {
        return (
            <div class="container container-padded">
                <Loading />
            </div>
        );
    }
    if (fwSource === "fromRelease") {
        return (
            <UpgradeFromRelease
                onUpgrading={onUpgrading}
                onSwitch={switchTo("fromFile")}
            />
        );
    }
    return (
        <UpgradeFromFile
            onUpgrading={onUpgrading}
            onSwitch={switchTo("fromRelease")}
        />
    );
};
