import { Trans, t } from "@lingui/macro";
import { useState } from "preact/hooks";

import Loading from "components/loading";

import api from "utils/uhttpd.service";

import {
    ValidationMessages,
    isValidPassword,
} from "../../../src/containers/SharedPasswordForm";
import style from "./style.less";

export const NetAdmin = ({ submitting, success, submitSharedPassword }) => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function changePassword(e) {
        setPassword(e.target.value || "");
    }

    function changePasswordConfirmation(e) {
        setPasswordConfirmation(e.target.value || "");
    }

    function isValidForm() {
        return isValidPassword(password) && password === passwordConfirmation;
    }

    function _submitSharedPassword() {
        submitSharedPassword(password).then(() => {
            setPassword("");
            setPasswordConfirmation("");
        });
    }

    return (
        <div className="container container-padded">
            <h4>
                <Trans>Change Shared Password</Trans>
            </h4>
            <label>
                <Trans>
                    Choose a shared password for network administration
                </Trans>
            </label>
            <input
                type="password"
                placeholder={t`Password`}
                className="u-full-width"
                value={password}
                onInput={changePassword}
            />
            <ValidationMessages password={password} />
            <label>
                <Trans>Re-enter the shared password</Trans>
            </label>
            <input
                type="password"
                placeholder={t`Re-enter Password`}
                className="u-full-width"
                value={passwordConfirmation}
                onInput={changePasswordConfirmation}
            />
            {passwordConfirmation && password !== passwordConfirmation && (
                <p>
                    <Trans>The passwords do not match!</Trans>
                </p>
            )}
            <div>
                <button
                    className="button block"
                    onClick={_submitSharedPassword}
                    disabled={!isValidForm()}
                >
                    <Trans>Change</Trans>
                </button>
            </div>
            {submitting && (
                <div className={style.loadingBox}>
                    <Loading />
                    <Trans>Setting up new password</Trans>
                </div>
            )}
            {success && (
                <div className={style.successMessage}>
                    <Trans>Shared Password changed successfully</Trans>
                </div>
            )}
        </div>
    );
};

const NetAdminHOC = () => {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    function submitSharedPassword(password) {
        setSubmitting(true);
        return api
            .call("lime-utils-admin", "set_root_password", { password })
            .then(
                (result) =>
                    new Promise((res, rej) => {
                        result.status === "ok" ? res() : rej();
                    })
            )
            .then(() => setSuccess(true))
            .finally(() => setSubmitting(false));
    }

    return (
        <NetAdmin
            submitting={submitting}
            success={success}
            submitSharedPassword={submitSharedPassword}
        />
    );
};

export default NetAdminHOC;
