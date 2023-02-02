import { Trans } from "@lingui/macro";

function passwordHasLength(password) {
    // Check there is at least 10 characters in the string
    return password.match("^(?=.{10,}$).*$");
}

function passwordHasNumber(password) {
    // Check there is at least one number in the string
    return password.match("^(?=.*[0-9]).*$");
}

function passwordHasAlphanumeric(password) {
    // Check there is at least one alphanumeric in the string
    return password.match("^(?=.*[a-zA-z]).*$");
}

export function isValidPassword(password) {
    return (
        passwordHasLength(password) &&
        passwordHasAlphanumeric(password) &&
        passwordHasNumber(password)
    );
}

const StatusBox = ({ value }) => (
    <b>
        {value ? (
            <span style={{ color: "green" }}>✔</span>
        ) : (
            <span style={{ color: "red" }}>✘</span>
        )}
    </b>
);

export const ValidationMessages = ({ password }) => (
    <p>
        <Trans>The password should have:</Trans>
        <br />
        <StatusBox value={passwordHasLength(password)} />{" "}
        <Trans>More than 10 characters</Trans>
        <br />
        <StatusBox value={passwordHasNumber(password)} />{" "}
        <Trans>At least one number</Trans>
        <br />
        <StatusBox value={passwordHasAlphanumeric(password)} />{" "}
        <Trans>At least one alphanumeric character</Trans>
        <br />
    </p>
);
