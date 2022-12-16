import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";

import { useLogin } from "utils/queries";

import Loading from "../../components/loading";

const loadingBoxStyle = {
    position: "fixed",
    marginTop: "30vh",
    zIndex: "5555",
    background: "rgb(255, 255, 255)",
    width: "200px",
    top: "0px",
    left: "calc(50% - 100px)",
    borderRadius: "11px",
    padding: "15px",
    boxShadow: "1px 1px 6px rgba(0,0,0,0.5)",
    textAlign: "center",
};

const SharedPasswordLogin = ({ submitting, error, submitLogin }) => {
    const [password, setPassword] = useState("");
    const [showHelp, setShowHelp] = useState("");

    function toogleHelp(e) {
        e.preventDefault();
        setShowHelp((prevValue) => !prevValue);
    }

    function changePassword(e) {
        setPassword(e.target.value || "");
    }

    function _submitLogin(e) {
        e.preventDefault();
        submitLogin(password);
    }

    return (
        <form onSubmit={_submitLogin} className="container container-padded">
            <p>
                <Trans>
                    You need to know the shared password to enter this page
                </Trans>
            </p>
            <label htmlFor="password">
                <Trans>Shared Password</Trans>
            </label>
            <input
                name="password"
                type="password"
                value={password}
                onInput={changePassword}
            />
            {error && (
                <p>
                    <Trans>Wrong password, try again</Trans>
                </p>
            )}
            <div>
                <button type="submit">
                    <Trans>Login</Trans>
                </button>
            </div>
            <a href="#" onClick={toogleHelp}>
                <Trans>I don't know the shared password</Trans>
            </a>
            {showHelp && (
                <p>
                    <Trans>
                        The shared password has been chosen by the community
                        when the network was created. You can ask other
                        community members for it.
                    </Trans>
                </p>
            )}
            {submitting && (
                <div style={loadingBoxStyle}>
                    <Loading />
                    <Trans>Logging in</Trans>
                </div>
            )}
        </form>
    );
};

const TryToLoginAutomatically = () => {
    const { isError, mutate: login } = useLogin();

    useEffect(() => {
        login({ username: "root", password: "" });
    }, [login]);

    if (isError) {
        return <SharedPasswordLoginHOC />;
    }
    return (
        <div class="container container-center">
            <Loading />
        </div>
    );
};

const SharedPasswordLoginHOC = () => {
    const { mutate: login, isLoading, isError } = useLogin();

    function submitLogin(password) {
        login({ username: "root", password });
    }

    return (
        <SharedPasswordLogin
            submitting={isLoading}
            error={isError}
            submitLogin={submitLogin}
        />
    );
};

export default TryToLoginAutomatically;
