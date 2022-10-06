
import { Trans } from "@lingui/macro";

export const ErrorMsg = ({ children }) => (
    <p style={{ color: "#923838" }}>
        {children}
    </p>
)

export const MaxLengthMsg = ({ length }) => (
    <Trans>Max. {length} characters</Trans>
);

export const MaxLengthErrorMsg = ({ length }) =>
    <ErrorMsg><MaxLengthMsg length={length} /></ErrorMsg>

export const RequiredMsg = () =>
    <Trans>Required</Trans>

export const RequiredErrorMsg = () => (
    <ErrorMsg>
        <Trans>This field is required</Trans>
    </ErrorMsg>
);
