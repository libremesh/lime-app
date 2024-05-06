import { Trans } from "@lingui/macro";

export const RescanButton = ({ rescan }) => {
    return (
        <button onClick={rescan} className="u-full-width">
            <Trans>Rescan</Trans>
        </button>
    );
};

export const CancelButton = ({ cancel }) => {
    return (
        <button onClick={cancel} className="u-full-width">
            <Trans>Cancel</Trans>
        </button>
    );
};

export const BackButton = ({ goBack }) => {
    return (
        <button onClick={goBack} className="u-full-width">
            <Trans>Back</Trans>
        </button>
    );
};
