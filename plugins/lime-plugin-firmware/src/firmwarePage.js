import { h } from "preact";
import { useState } from "preact/hooks";

import { Loading } from "components/loading";

import { ConfirmPage } from "./confirmPage/confirmPage";
import { useUpgradeInfo } from "./firmwareQueries";
import { UpgradePage } from "./upgradePage/upgradePage";
import { UpgradingPage } from "./upgradingPage/upgradingPage";

const FirmwarePage = ({}) => {
    const { data: upgradeInfo, isLoading } = useUpgradeInfo();
    const [state, setUpgradeState] = useState(null);
    const [hasReverted, setHasReverted] = useState(false);

    if (isLoading) {
        return (
            <div class="container container-center">
                <Loading />
            </div>
        );
    }
    if (upgradeInfo.suCounter > 0 || hasReverted) {
        return (
            <ConfirmPage
                hasReverted={hasReverted}
                onReverted={() => setHasReverted(true)}
            />
        );
    }
    if (state === "upgrading") {
        return (
            <UpgradingPage
                upgradeConfirmAvailable={
                    upgradeInfo.is_upgrade_confirm_supported
                }
            />
        );
    }
    return <UpgradePage onUpgrading={() => setUpgradeState("upgrading")} />;
};

export default FirmwarePage;
