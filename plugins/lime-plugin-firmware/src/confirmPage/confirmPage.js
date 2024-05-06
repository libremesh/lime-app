import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import Loading from "components/loading";

import { useUpgradeConfirm, useUpgradeRevert } from "../firmwareQueries";

export const ConfirmChoices = ({ onConfirm, onRevert, submitting }) => (
    <div className={`container container-padded container-center`}>
        <button onClick={onConfirm}>
            <Trans>Confirm</Trans>
        </button>
        <p>
            <Trans>to keep the current configuration. Or ...</Trans>
        </p>
        <button onClick={onRevert}>
            <Trans>Revert</Trans>
        </button>
        <p>
            <Trans>to the previous configuration</Trans>
        </p>
        {submitting && (
            <div>
                <Loading />
            </div>
        )}
    </div>
);

export const Reverted = () => (
    <div className={`container container-padded container-center`}>
        <h3>
            <Trans>Reverting to previous version</Trans>
        </h3>
        <span>
            <Trans>
                Please wait while the device reboots, and reload the app
            </Trans>
        </span>
    </div>
);

export const ConfirmPage = ({ hasReverted, onReverted }) => {
    const { mutateAsync: upgradeConfirm, isLoading: isConfirming } =
        useUpgradeConfirm();
    const { mutate: upgradeRevert, isLoading: isReverting } =
        useUpgradeRevert();

    async function onConfirm() {
        await upgradeConfirm();
        route("/");
    }

    async function onRevert() {
        await upgradeRevert();
        onReverted();
    }

    if (hasReverted) {
        return <Reverted />;
    }

    return (
        <ConfirmChoices
            onConfirm={onConfirm}
            onRevert={onRevert}
            submitting={isConfirming || isReverting}
        />
    );
};
