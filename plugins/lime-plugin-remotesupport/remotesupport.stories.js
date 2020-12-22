import { action } from '@storybook/addon-actions';

import {RemoteSupportPage_} from './src/remoteSupportPage';

export default {
	title: 'Containers/RemoteSupport'
};

export const noHaySesion = () => (
	<RemoteSupportPage_ session={null} consoleViewable={false} />
);

export const sesionAbriendose = () => (
	<RemoteSupportPage_ session={null} isOpening={true} consoleViewable={false} />
);

export const hayUnaSesionConsolaCerrada = () => (
	<RemoteSupportPage_ session={{rw:'asdf@ny1.tmate.io', ro:'aswe@ny1.tmate.io'}} consoleViewable={false} />
);

export const hayUnaSesionConsolaAbierta = () => (
	<RemoteSupportPage_ session={{rw:'asdf@ny1.tmate.io', ro:'aswe@ny1.tmate.io'}} consoleViewable={true} />
);

// When the tmate server is not reachable
export const remoteSupportHostUnreachable = () => (
	<RemoteSupportPage_ session={null} remoteHostAccesible={false} />
);
