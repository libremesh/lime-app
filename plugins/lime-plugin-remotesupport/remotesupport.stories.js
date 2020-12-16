import { action } from '@storybook/addon-actions';

import RemoteSupportPage from './src/remoteSupportPage';

export default {
	title: 'Containers/RemoteSupport'
};

export const noHaySesion = () => (
	<RemoteSupportPage session={null} consoleViewable={false} />
);

export const hayUnaSesionConsolaCerrada = () => (
	<RemoteSupportPage session={{rw:'asdf@ny1.tmate.io', ro:'aswe@ny1.tmate.io'}} consoleViewable={false} />
);

export const hayUnaSesionConsolaAbierta = () => (
	<RemoteSupportPage session={{rw:'asdf@ny1.tmate.io', ro:'aswe@ny1.tmate.io'}} consoleViewable={true} />
);

// When the tmate server is not reachable
export const remoteSupportHostUnreachable = () => (
	<RemoteSupportPage session={null} remoteHostAccesible={false} />
);
