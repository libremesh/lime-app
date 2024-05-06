import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import Loading from "components/loading";

import { useSession } from "./remoteSupportQueries";
import style from "./style.less";

export const ConsoleView_ = ({ sessionSrc, goBack }) => (
    <div className="d-flex flex-column flex-grow-1">
        <iframe className="flex-grow-1" src={sessionSrc} />
        <div
            className={`d-flex justify-content-center ${style.consoleButtons}`}
        >
            <button onClick={goBack}>
                <Trans>Hide Console</Trans>
            </button>
        </div>
    </div>
);

function toWeb(rwSsh) {
    const rwSshParts = rwSsh.split(" ");
    const [token, domain] = rwSshParts[rwSshParts.length - 1].split("@");
    return `https://${domain}/t/${token}`;
}

const ConsoleView = () => {
    const { data: session, isLoading } = useSession();
    const [sessionSrc, setSessionSrc] = useState(null);

    useEffect(() => {
        if (!isLoading && !session) goBack();
    }, [isLoading, session]);

    useEffect(() => {
        if (session) {
            setSessionSrc(toWeb(session.rw_ssh));
        }
    }, [session]);

    function goBack() {
        route("/remotesupport");
    }

    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }

    return <ConsoleView_ sessionSrc={sessionSrc} goBack={goBack} />;
};

export default ConsoleView;
