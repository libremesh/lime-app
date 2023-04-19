import { Plural, Trans } from "@lingui/macro";
import { route } from "preact-router";

import Loading from "components/loading";

import { useCheckInternet } from "utils/queries";

import {
    useCloseSession,
    useOpenSession,
    useSession,
} from "./remoteSupportQueries";
import style from "./style.less";

const RemoteSupportPage = () => {
    const { data: internetStatus, isLoading: loadingInternetStatus } =
        useCheckInternet();
    const {
        data: session,
        isLoading: loadingSession,
        isError,
    } = useSession({
        refetchInterval: 10000,
    });
    const {
        mutate: openSession,
        isError: openError,
        isLoading: openLoading,
    } = useOpenSession();
    const { mutate: closeSession, isLoading: closeLoading } = useCloseSession();

    function onShowConsole() {
        route("console");
    }

    if (isError) {
        return (
            <div className="container container-center">
                Please check that ubus-tmate package is installed
            </div>
        );
    }

    if (loadingInternetStatus || loadingSession) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    if (internetStatus?.connected === false) {
        return <WithoutInternet_ />;
    }

    return (
        <RemoteSupportPage_
            session={session}
            openError={openError}
            isSubmitting={openLoading || closeLoading}
            onOpenSession={openSession}
            onCloseSession={closeSession}
            onShowConsole={onShowConsole}
        />
    );
};

export const WithoutInternet_ = () => (
    <div className="d-flex flex-grow-1 flex-column container container-padded">
        <h4>
            <Trans>Ask for remote support</Trans>
        </h4>
        <p className="bg-error p-05">
            <Trans>Your node has no internet connection</Trans>{" "}
        </p>
        <p>
            <div>
                <Trans>
                    To enable remote access an internet connection is needed
                </Trans>{" "}
            </div>
            <div>
                <Trans>
                    You can share your mobile connection to the node by setting
                    up a mobile hotspot
                </Trans>
            </div>
        </p>
        <button onClick={() => route("/nodeadmin/hotspot")}>
            <Trans>Setup Hotspot</Trans>
        </button>
    </div>
);

export const RemoteSupportPage_ = ({
    session,
    openError = false,
    isSubmitting = false,
    onOpenSession,
    onCloseSession,
    onShowConsole,
}) => (
    <div className="d-flex flex-grow-1 flex-column container container-padded">
        <h4>
            <Trans>Ask for remote support</Trans>
        </h4>
        {!session && (
            <div>
                <p>
                    <Trans>
                        There's no open session for remote support. Click at
                        Create Session to begin one
                    </Trans>
                </p>
                <button onClick={onOpenSession}>
                    <Trans>Create Session</Trans>
                </button>
            </div>
        )}
        {openError && (
            <div className={style.noteError}>
                <b>
                    <Trans>Cannot connect to the remote support server</Trans>
                </b>
                <br />
                <Trans>Please verify your internet connection</Trans>
            </div>
        )}
        {session && (
            <div>
                <p>
                    <Trans>There's an active remote support session</Trans>.
                    {session.clients !== null && (
                        <span>
                            {" "}
                            <Plural
                                value={Number(session.clients)}
                                _0="No one has joined yet."
                                one="One person has joined."
                                other="# people have joined."
                            />
                        </span>
                    )}
                </p>
                <p>
                    <Trans>
                        Share the following command with whoever you want to
                        give them access to your node
                    </Trans>
                </p>
                <div className={style.token}>
                    <pre>{session.rw_ssh}</pre>
                </div>
                <div className={style.section}>
                    <h5>
                        <Trans>Show Console</Trans>
                    </h5>
                    <p>
                        <Trans>
                            Click at Show Console to follow the remote support
                            session.
                        </Trans>
                    </p>
                    <button onClick={onShowConsole}>
                        <Trans>Show Console</Trans>
                    </button>
                </div>
                <div className={style.section}>
                    <h5>
                        <Trans>Close Session</Trans>
                    </h5>
                    <p>
                        <Trans>
                            Click at Close Session to end the remote support
                            session. No one will be able to access your node
                            with this token again
                        </Trans>
                    </p>
                    <button
                        className={style.btnDanger}
                        onClick={onCloseSession}
                    >
                        <Trans>Close Session</Trans>
                    </button>
                </div>
            </div>
        )}
        {isSubmitting && <Loading />}
    </div>
);

export default RemoteSupportPage;
