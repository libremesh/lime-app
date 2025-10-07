import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { route } from "preact-router";
import Match from "preact-router/match";

import Loading from "components/loading";

import { useBoardData } from "utils/queries";

import { useNewVersion } from "./firmwareQueries";

export const UpgradeAvailableBanner = () => {
    const { data: newVersion } = useNewVersion();
    const hideReleaseBannerPlease = localStorage.getItem(
        "hideReleaseBannerPlease"
    );
    const versionName = newVersion?.version;

    if (!newVersion || hideReleaseBannerPlease === versionName) return;

    return (
        // @ts-ignore
        <Match>
            {({ path }) =>
                !["firmware", "releaseInfo", "meshwideupgrade"].includes(
                    path.replace("/", "")
                ) && (
                    <div
                        className="subheader-notification"
                        style={{ backgroundColor: "#923853", color: "#fff" }}
                    >
                        <Trans>{versionName} is now available</Trans>
                        <button onClick={() => route("releaseInfo")}>
                            <Trans>See More</Trans>
                        </button>
                    </div>
                )
            }
        </Match>
    );
};

export const UpgradeAvailabeInfo = () => {
    const { data: boardData } = useBoardData();
    const { data: newVersion, isLoading } = useNewVersion();
    const hideReleaseBannerPlease = localStorage.getItem(
        "hideReleaseBannerPlease"
    );

    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    function onNotShowAgain(e) {
        const value = e.target.checked ? newVersion.version : "show";
        localStorage.setItem("hideReleaseBannerPlease", value);
    }

    return (
        <div className="container container-padded">
            <p>
                <h5>
                    <Trans>A new firmware version has been released</Trans>
                </h5>
                <Trans>Currently your node has version:</Trans>
                <br />
                {boardData && boardData.release.description}
                <br />
                <Trans>You can upgrade to:</Trans>
                <br />
                {newVersion.version}
                {newVersion["release-info-url"] && (
                    <Fragment>
                        <br />
                        <Trans>
                            More details on the release can be found at:
                        </Trans>
                        <br />
                        <a href={newVersion["release-info-url"]}>
                            {" "}
                            {newVersion["release-info-url"]}{" "}
                        </a>
                    </Fragment>
                )}
            </p>
            <label>
                <input
                    type="checkbox"
                    name="not-show-again"
                    onInput={onNotShowAgain}
                    checked={hideReleaseBannerPlease === newVersion.version}
                />
                <Trans>Don't show this message again</Trans>
            </label>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => route("firmware")}>
                    <Trans>Upgrade Now</Trans>
                </button>
            </div>
        </div>
    );
};
