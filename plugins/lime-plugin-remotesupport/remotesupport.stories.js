import { action } from '@storybook/addon-actions';

import {RemoteSupportPage_} from './src/remoteSupportPage';

export default {
	title: 'Containers/RemoteSupport'
};

export const noSession = () => (
	<RemoteSupportPage_ session={null} consoleViewable={false} />
);


export const openingSession = () => (
	<RemoteSupportPage_ session={null} isSubmitting={true} consoleViewable={false} />
);

export const sessionWithClosedConsole = () => (
	<RemoteSupportPage_ session={{rw: 'pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io', ro: 'pL2qpxKQvPP9f9GPWjs34hjxM@ny1.tmate.io'}} consoleViewable={false} />
);

export const sessionWithOpenedConsole = () => (
	<RemoteSupportPage_ session={{rw: 'pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io', ro: 'pL2qpxKQvPP9f9GPWjs34hjxM@ny1.tmate.io'}} consoleViewable={true} />
);

export const noSessionAndRemoteSupportServerUnreachable = () => (
	<RemoteSupportPage_ session={null} serverAccesible={false} />
);

export const sessionAndRemoteSupportServerUnreachable = () => (
	<RemoteSupportPage_ session={{rw: 'pL2qpxKQvPP9f9GPWjG2WkfrM@ny1.tmate.io', ro: 'pL2qpxKQvPP9f9GPWjs34hjxM@ny1.tmate.io'}} serverAccesible={false} />
);
