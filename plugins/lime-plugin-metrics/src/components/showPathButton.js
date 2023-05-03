import { Trans } from "@lingui/macro";

export const ShowPathButton = ({
    isLoading,
    isGateway,
    getGatewayMetrics,
    getMetricsAll,
}) => {
    return isLoading ? (
        <div />
    ) : isGateway ? (
        <div className="row">
            <br />
            <p>
                <b>
                    <Trans>This node is the gateway</Trans>
                </b>
                <br />
                <Trans>You don't go through any paths to get here.</Trans>
            </p>
        </div>
    ) : (
        <div className="row">
            <br />
            <button
                className="button block u-full-width"
                type="submit"
                onClick={getGatewayMetrics}
            >
                <Trans>Only gateway</Trans>
            </button>
            <button
                className="button block u-full-width"
                type="submit"
                onClick={getMetricsAll}
            >
                <Trans>Full path metrics</Trans>
            </button>
        </div>
    );
};
