import { useAppContext } from './app.context';
import { SharedPasswordLogin } from '../containers/SharedPasswordLogin';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { Connecting, ConnectionFailed } from '../containers/Disconnected';
import { CompatibilityError, UnexpectedError } from '../containers/Error';
import Fbw from '../../plugins/lime-plugin-fbw';


export const Route = ({ path, children }) => {
	const { connectionFail, connected, fbwConfigured, unexpectedError,
		fbwCanceled, compatibilityError, apiUrl } = useAppContext();

	if (unexpectedError) {
		return <UnexpectedError />;
	}
	
	if (compatibilityError) {
		// The visited node is not be compatible with this LimeApp version
		return <CompatibilityError apiUrl={apiUrl} />;
	}

	if (connectionFail) {
		// The node is unreachable
		return <ConnectionFailed />;
	}

	if (!connected) {
		// Connecting to the node API
		return <Connecting />;
	}

	if (!fbwConfigured && !fbwCanceled) {
		if (path === 'firstbootwizard') {
			return children;
		}
		return <Fbw.page />;
	}

	return children;
};

export const CommunityProtectedRoute = ({ children }) => {
	const { isRoot } = useAppContext();
	if (!isRoot) {
		return <Route><SharedPasswordLogin /></Route>;
	}
	return children;
};

export const Redirect = ({ to }) => {
	useEffect(() => {
		route(to, true);
	}, [to]);
	return null;
};
