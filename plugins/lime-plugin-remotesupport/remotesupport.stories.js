import {RemoteSupportPage_} from './src/remoteSupportPage';
import {ConsoleView_} from './src/consoleView';

export default {
	title: 'Containers/RemoteSupport'
};

export const noSession = () => (
	<RemoteSupportPage_ session={null} consoleViewable={false} />
);


export const openingSession = () => (
	<RemoteSupportPage_ session={null} isSubmitting={true} consoleViewable={false} />
);

export const sessionNoOneJoined = () => (
	<RemoteSupportPage_ session={{rw_ssh: 'pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io', ro_ssh: 'pL2qpxKQvPP9f9GPWjs34hjxM@ny1.tmate.io', clients: 1}} consoleViewable={false} />
);

export const sessionSomeoneJoined = () => (
	<RemoteSupportPage_ session={{rw_ssh: 'pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io', ro_ssh: 'pL2qpxKQvPP9f9GPWjs34hjxM@ny1.tmate.io', clients: 2}} consoleViewable={true} />
);

export const errorOpenningSession = () => (
	<RemoteSupportPage_ session={null} openError={true} />
);

export const console = () => (
	<ConsoleView_ sessionSrc={"about:blank"} />
)