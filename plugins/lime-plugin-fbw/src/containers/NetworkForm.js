import { Trans, t } from "@lingui/macro";
import { h } from "preact";
import { useState } from "preact/hooks";

import { isValidHostname, slugify } from "utils/isValidHostname";

import {
    ValidationMessages,
    isValidPassword,
} from "../../../../src/containers/SharedPasswordForm";
import { useCreateNetwork } from "../FbwQueries";
import "../style.less";

export const NetworkForm = ({
    toggleForm,
    setExpectedHost,
    setExpectedNetwork,
}) => {
    const [state, setState] = useState({
        communityName: "",
        hostName: "",
        password: "",
        passwordConfirmation: "",
    });

    const [createNetwork, { isLoading: isSubmitting }] = useCreateNetwork({
        onSuccess: () => {
            setExpectedHost(state.hostName);
            setExpectedNetwork(state.communityName);
            toggleForm("setting")();
        },
        onError: () => {
            toggleForm("create")();
        },
    });

    function _changeName(e) {
        const end = e.type === "change";
        e.target.value = slugify(e.target.value, end, true);
        setState({ ...state, communityName: e.target.value || "" });
        return e;
    }

    function _changeHostName(e) {
        const end = e.type === "change";
        e.target.value = slugify(e.target.value.toLocaleLowerCase(), end);
        setState({ ...state, hostName: e.target.value || "" });
        return e;
    }

    function _changePassword(e) {
        setState({ ...state, password: e.target.value || "" });
        return e;
    }

    function _changePasswordConfirmation(e) {
        setState({ ...state, passwordConfirmation: e.target.value || "" });
        return e;
    }

    function _createNetwork() {
        createNetwork({
            network: state.communityName,
            hostname: state.hostName,
            adminPassword: state.password,
        });
    }

    function _isValidForm() {
        return (
            isValidPassword(state.password) &&
            state.password === state.passwordConfirmation &&
            isValidHostname(state.communityName, true) &&
            isValidHostname(state.hostName, true)
        );
    }

    return (
        <div class="container container-padded">
            <h4>
                <span>
                    <Trans>Configure your new community network</Trans>
                </span>
            </h4>
            <label for="community_name">
                <Trans>Choose a name for your network</Trans>
            </label>
            <input
                id="community_name"
                type="text"
                placeholder={t`Community name`}
                class="u-full-width"
                onInput={_changeName}
            />
            <label for="shared_password">
                <Trans>
                    Choose a shared password for network administration
                </Trans>
            </label>
            <input
                id="shared_password"
                type="password"
                placeholder={t`Password`}
                class="u-full-width"
                value={state.password}
                onInput={_changePassword}
            />
            <ValidationMessages password={state.password} />
            <label for="shared_password_confirm">
                <Trans>Re-enter the shared password</Trans>
            </label>
            <input
                id="shared_password_confirm"
                type="password"
                placeholder={t`Re-enter Password`}
                class="u-full-width"
                value={state.passwordConfirmation}
                onInput={_changePasswordConfirmation}
            />
            {state.passwordConfirmation &&
                state.password !== state.passwordConfirmation && (
                    <p>
                        <Trans>The passwords do not match!</Trans>
                    </p>
                )}
            <label for="hostname">
                <Trans>Choose a name for this node</Trans>
            </label>
            <input
                id="hostname"
                type="text"
                placeholder={t`Host name`}
                class="u-full-width"
                value={state.hostName}
                onInput={_changeHostName}
            />
            <div class="row">
                <div class="six columns">
                    <button
                        class="u-full-width"
                        disabled={!_isValidForm() || isSubmitting}
                        onClick={_createNetwork}
                    >
                        <Trans>Create network</Trans>
                    </button>
                </div>
                <div class="six columns">
                    <button class="u-full-width" onClick={toggleForm(null)}>
                        <Trans>Cancel</Trans>
                    </button>
                </div>
            </div>
        </div>
    );
};
