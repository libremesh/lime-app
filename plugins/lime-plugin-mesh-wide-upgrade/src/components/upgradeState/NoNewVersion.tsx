import { Trans } from "@lingui/macro";

export const NoNewVersionAvailable = () => {
    return (
        <div className="text-center ">
            <div className="text-9xl text-primary-light">✓</div>
            <div className="text-4xl">
                <Trans>No new version available!</Trans>
            </div>
        </div>
    );
};
