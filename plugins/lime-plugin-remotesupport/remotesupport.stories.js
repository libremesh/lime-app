import { ConsoleView_ } from "./src/consoleView";
import { RemoteSupportPage_ } from "./src/remoteSupportPage";

export default {
    title: "Containers/RemoteSupport",
};

export const noSession = () => (
    <RemoteSupportPage_ session={null} consoleViewable={false} />
);

export const openingSession = () => (
    <RemoteSupportPage_
        session={null}
        isSubmitting={true}
        consoleViewable={false}
    />
);

export const sessionNoOneJoined = () => (
    <RemoteSupportPage_
        session={{
            rw_ssh: "ssh -p2222 pL2qpxKQvPP9f9GPWjG2WkfrM@remotesupport.librerouter.org",
            ro_ssh: "pL2qpxKQvPP9f9GPWjs34hjxM@remotesupport.librerouter.org",
            clients: 0,
        }}
        consoleViewable={false}
    />
);

export const sessionSomeoneJoined = () => (
    <RemoteSupportPage_
        session={{
            rw_ssh: "ssh -p222 pL2qpxKQvPP9f9GPWjG2WkfrM@remotesupport.librerouter.org",
            ro_ssh: "pL2qpxKQvPP9f9GPWjs34hjxM@remotesupport.librerouter.org",
            clients: 1,
        }}
        consoleViewable={true}
    />
);

export const errorOpenningSession = () => (
    <RemoteSupportPage_ session={null} openError={true} />
);

export const console = () => <ConsoleView_ sessionSrc={"about:blank"} />;
