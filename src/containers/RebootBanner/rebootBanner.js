import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import Match from "preact-router/match";

export const RebootBanner = () => (
    // @ts-ignore
    <Match>
        {({ path }) =>
            path !== "/reboot" && (
                <div
                    data-testid="changes-need-reboot"
                    className="subheader-notification"
                    style={{ backgroundColor: "#f7a336" }}
                >
                    <Trans>A reboot is needed to apply changes</Trans>
                    <button onClick={() => route("/reboot")}>
                        <Trans>Reboot</Trans>
                    </button>
                </div>
            )
        }
    </Match>
);
