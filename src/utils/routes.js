import { useAppContext } from './app.context';
import { SharedPasswordLogin } from '../containers/SharedPasswordLogin';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { useSession } from './queries';
import { useFbwStatus } from '../../plugins/lime-plugin-fbw/src/queries';
import { FbwBanner } from '../../plugins/lime-plugin-fbw/src/containers/FbwBanner';

export const Route = ({ path, children }) => {
	const { data: fbwStatus } = useFbwStatus();
	const { fbwCanceled } = useAppContext();

	if (fbwStatus.lock && !fbwCanceled && path !== 'firmware' && path !== 'releaseInfo' && path !=='firstbootwizard') {
		return <FbwBanner />
	}

	return children;
};

export const CommunityProtectedRoute = ({ path, children }) => {
	const { data: session } = useSession();
	if (session.username !== 'root') {
		return <Route path={path}><SharedPasswordLogin /></Route>;
	}
	return <Route path={path}>{children}</Route>;
};

export const Redirect = ({ to }) => {
	useEffect(() => {
		route(to, true);
	}, [to]);
	return null;
};
