import { useAppContext } from './app.context';
import { SharedPasswordLogin } from '../containers/SharedPasswordLogin';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { Loading } from '../components/loading';
import Fbw from '../../plugins/lime-plugin-fbw';
import I18n from 'i18n-js';


export const Route = ({ path, children }) => {
	const { suCounter, loading, fbwConfigured, fbwCanceled, unexpectedError } = useAppContext();

	if (unexpectedError) {
		return (
			<div class="container container-center">
				{I18n.t('Un unexpected error occurred, please contact the developer team')}
			</div>
		);
	}

	if (loading) {
		return (
			<div class="container container-center">
				<Loading />;
			</div>
		);
	}

	const tryingToConfirmUpgrade = (path === 'firmware') && (suCounter > 0);
	if (!fbwConfigured && !fbwCanceled && !tryingToConfirmUpgrade) {
		return <Fbw.page />;
	}

	return children;
};

export const CommunityProtectedRoute = ({ path, children }) => {
	const { isRoot } = useAppContext();
	if (!isRoot) {
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
