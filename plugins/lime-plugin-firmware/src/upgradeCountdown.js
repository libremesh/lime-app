import { Trans } from "@lingui/macro";

import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

export const SafeUpgradeCountdown = ({ counter }) => {
    const [_counter, setcounter] = useState(counter);

    useEffect(() => {
        const interval = setInterval(() => setcounter(_counter - 1), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [_counter, setcounter]);

    return (
        <div
            class="subheader-notification"
            style={{ backgroundColor: "#f7a336" }}
        >
            <div>
                <Trans>
                    Cofirm upgrade before {_counter} seconds or it will be
                    reverted
                </Trans>
            </div>
            <button onClick={() => route("firmware")}>
                <Trans>Go!</Trans>
            </button>
        </div>
    );
};
